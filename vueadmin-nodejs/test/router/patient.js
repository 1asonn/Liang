const patient = require('../database/models/Patients')
const express = require('express');
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


router.get('/test',(req,res) => {
    res.send({msg:'test'})
})
//新增患者信息
router.post('/addPatients', async (req,res) => {
    const {name, gender, phone,birthday,idCard, created,medicalId} = req.body
    const patientModel = await patient.create({name, gender, phone,birthday,idCard, created,medicalId})
    if(patientModel){
    res.send({msg: '患者信息添加成功', data: patientModel})}
})


//获取患者信息列表
//token校验

router.get('/getPatients', async (req,res) => {
    const patients = await patient.findAll()
    res.send({code:200, msg: '获取患者信息列表成功', data: patients})
})

module.exports = router