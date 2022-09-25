const bcryptjs = require("bcryptjs")
const userService = require("../services/users.services")
exports.register =  (req,res,next)=>{
    userService.register(req.body, (error,result)=>{
      if(error){
   return res.send(error);
      }
      return res.status(200).send({
        message:"Success",
        data:result
      })
    })

}

exports.login = (req,res,next)=>{
    const {username,password} = req.body;

    userService.login({username,password},(error,result)=>{
        if(error){
            return res.send(error);
        }
        return res.status(200).send({
            message:"Success",
            data:result
        });
    });
}
