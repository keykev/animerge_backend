const { Router } = require('express')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

//Load env
require('dotenv').config({path: "./config/config.env"})

//Server config
const app = express()

//json middleware
app.use(express.json())

//Database config
mongoose.connect(process.env.MONGOURI,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true},(err) => {
    if(err) {
        console.log(err)
        throw err
    }
    else {
        console.log('Successfully connected to our database')
    }
})

//Cors middleware
app.use(cors())

//Router middleware
app.use('/anime',require('./routes/anime'))
app.use('/episode',require('./routes/episode'))

//Port
const PORT = process.env.PORT || 5000


//Connect to port
app.listen(PORT,() => console.log(`Successfully connected to port: ${PORT}...`))