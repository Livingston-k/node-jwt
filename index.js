const express = require('express')
const app     = express()
const mongoose = require('mongoose')
const dbConfig = require('./config/db.config')


app.use(express.urlencoded({ extended: false }))

const auth = require('./middlewares/auth')

var { unless } = require("express-unless");


mongoose.Promise = global.Promise
mongoose.connect(dbConfig.db,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
console.log("Database connected successfully")
},
(error)=>{
console.log("Database connection failed")
})
 
auth.authenticateToken.unless = unless

app.use(auth.authenticateToken.unless({
path:[
    {url:'/users/login',method:['POST']},
    {url:'/users/register',method:['POST']}
]
})
)
app.use(express.json())
app.use("/users/",require('./routes/users.routes'))

app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})
