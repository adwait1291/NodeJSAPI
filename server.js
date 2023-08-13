const express = require('express')
const mongoose = require('mongoose')
const app = express()


//routes
app.get('/', (req, res) => {res.send("Hello Duniya")})

app.get('/blog', (req, res) => {res.send("Hello Duniya, My name is Adwait")})



mongoose.connect('mongodb+srv://adwait1291:ABCD123456@nodejs-api.r1hxfzi.mongodb.net/NodeJS-API?retryWrites=true&w=majority')
.then(()=>{
    app.listen(3000, ()=>{console.log("Node API is running at port 3000")})
    console.log("Connected to MongoDB")
    }).catch(error=>{console.log(error)})
