const { sequelize,Sequelize } = require("../init.js")


const Patient = sequelize.define('patient',{
    name:{
       type:Sequelize.STRING,
       validate:{
           notEmpty:true
       }
    },
    medicalId:{
       type:Sequelize.STRING,
       validate:{
           notEmpty:true
       }
    },
    gender:{
        type:Sequelize.STRING,
        validate:{
            notEmpty:true
        }
    },
    birthday:{
        type:Sequelize.STRING,
        validate:{
            notEmpty:true
        }
    },
    idCard:{
        type:Sequelize.STRING,
        validate:{
            notEmpty:true
        }
    },
    phone:{
        type:Sequelize.STRING,
        validate:{
            notEmpty:true
        }
    },
    created:{
        type:Sequelize.STRING,
        validate:{
            notEmpty:true
        }
    }
})

Patient.sync().then(() =>{
    console.log('patient表模型已同步!')
})

module.exports = Patient