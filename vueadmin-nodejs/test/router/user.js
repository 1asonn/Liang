const express = require('express');
const User = require('../database/models/user')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
router.get('/test',(req,res) => {
    res.send({msg:'test'})
})


// 注册功能
router.post('/register', async (req,res) => {
    const {username,password} = req.body
    const model = await User.findOne({where:{username}})
    if(model){
        return res.send({msg:'用户名已存在'})
    }
    //用户密码加密
    const user = await User.create({username,password:bcrypt.hashSync(password,5)})
    res.send({msg:"注册成功!"})
})

//登录功能
router.post('/login',async (req,res) => {
    const {username,password} = req.body
    
    //根据用户名在数据库中检索
    const model = await User.findOne({where:{username}})
    //用户不存在
    if(!model){
        return res.send({msg:"用户不存在,请注册!"})
    }
    
    //比较用户输入的密码与数据库中的密码
    const passwordValid = bcrypt.compareSync(password,model.dataValues.password)
    //密码校验不通过
    if(!passwordValid){
        return res.send({msg:"密码错误!"})
    }

    //生成token返回给浏览器
    //生成token
    const token = jwt.sign({username},"yyjkn")
    const code = 777
    res.send({code,token})
})

// 权限校验功能
router.post('/auth',async (req,res) => {
    const token = req.headers.authorization.split(' ').pop()
    if(!token){
        return res.send({msg:'token为空!'})
    }
    const {username} = jwt.verify(token,"yyjkn")
    // 查询该用户是否存在
    const model = await User.findOne({where:{username}})
    if(!model){
        return res.send({msg:'用户不存在'})
    }
    res.send({msg:'通过权限校验'})
})


module.exports = router