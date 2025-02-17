const {sequelize,Sequelize} = require('../init.js')

const User = sequelize.define('user',{
     username:{
        type:Sequelize.STRING,
        validate:{
            notEmpty:true
        }
     },
     password:{
        type:Sequelize.STRING,
        validate:{
            notEmpty:true
        } 
     }
})


User.sync().then(() => {
    console.log("表模型已同步!")
})

module.exports = User