const express = require('express')
const router = require('./router/user.js')
const cors = require('cors')
require('./database/init.js')
require('./database/models/user.js')


const app =express()

app.use(cors())
app.use(express.urlencoded({ extended:false }))
app.use('/user',router)

app.listen(4000,() => {
    console.log('serve is running on port: 4000')
})