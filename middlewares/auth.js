const jwt = require('jsonwebtoken')

function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization'];
    const token     = authHeader && authHeader.split(' ')[1]

    if(token == null)return res.sendStatus(401)
    jwt.verify(token,"LIVINGSTONPRO",(err,user)=>{
      if(err) return res.sendStatus(403);
      req.user = user;
      next()
    })
    
}

function generateAccessToken(username){
    return jwt.sign({data:username}, "LIVINGSTONPRO",{
        expiresIn:'1h'
    })
}

module.exports = {
authenticateToken,
generateAccessToken
}