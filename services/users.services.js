const User = require('../models/user.model')
const bcrypt = require('bcryptjs')
const auth = require('../middlewares/auth')

async function login({username,password},callback){
    const user = await User.findOne({username});

    if(user != null){
      if(bcrypt.compareSync(password,user.password)){
        const token = auth.generateAccessToken(username);
        return callback(null,{...user.toJSON(),token});
      }else{
        return callback({
            message:"Invalid Username/Password"
        })
    }
    }else{
         return callback({
            message:"Invalid Username/Password"
        })
    }
}

async function register(params,callback){
     const {password} = params;
   const salt =  await bcrypt.genSalt(10);

    params.password = await bcrypt.hashSync(password,salt);
    if(params.username == undefined){
  return callback({message:"Username is required"});
    }
    const user = new User(params);
    user.save()
    .then((response)=>{
       return callback(null,response)
    })
     .catch((error)=>{
  return callback(error)
    })
}

module.exports = {
    login,
    register
}