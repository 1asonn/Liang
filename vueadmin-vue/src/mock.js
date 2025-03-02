const Mock = require('mockjs')

const Random = Mock.Random

let Result = {
    code : 200,
    msg : '操作成功',
    data : null
}

Mock.mock('/captcha','get',()=>{

    Result.data = {
        token : Random.string(32),
        captchaImg : Random.dataImage('70x40','p7n5w')
    }

    return Result
})

Mock.mock('/login','post',()=>{

    Result.code = 200
    Result.msg = '成功登录'
    return Result
})

Mock.mock('/sys/userInfo','get',()=>{

    Result.data = {
        id : "777",
        username : '777',
        avatar : "https://i.ibb.co/PQDZ2s1/jnu.jpg"
    }

    return Result
})

Mock.mock('/logout','post',()=>{

    return Result
})

Mock.mock('/sys/menu/nav', 'get', () => {
    let nav = [
        {
            name: 'PatientManager',
            title: '患者信息管理',
            icon: 'el-icon-s-custom',
            path: '/patient',
            component: 'patient/Patient',
            children: [
				{
					name: 'SysUser',
					title: '用户管理',
					icon: 'el-icon-s-custom',
					path: '/sys/users',
					component: 'sys/User',
					children: []
				},
			]
        },
        {
            name: 'HospitalizationManager',
            title: '住院管理',
            icon: 'el-icon-s-home',
            path: '/hospitalization',
            component: 'hospitalization/Hospitalization',
            children: []
        },
        {
            name: 'MedicineManager',
            title: '药品管理',
            icon: 'el-icon-s-goods',
            path: '/medicine',
            component: 'medicine/Medicine',
            children: []
        },
        {
            name: 'EquipmentManager',
            title: '医疗设备管理',
            icon: 'el-icon-s-tools',
            path: '/equipment',
            component: 'equipment/Equipment',
            children: []
        },
        {
            name: 'HRManager',
            title: '人力资源管理',
            icon: 'el-icon-s-custom',
            path: '/hr',
            component: 'hr/HR',
            children: []
        },
        {
            name: 'FinanceManager',
            title: '财务管理',
            icon: 'el-icon-s-finance',
            path: '/finance',
            component: 'finance/Finance',
            children: []
        },
        {
            name: 'DataManager',
            title: '数据统计与分析',
            icon: 'el-icon-s-data',
            path: '/data',
            component: 'data/Data',
            children: []
        },
        {
            name: 'AiManager',
            title: '智慧管理',
            icon: 'el-icon-s-data',
            path: '/ai',
            component: 'ai/Ai',
            children: []
        }
    ];

    let authoritys = ['sys:user:save']; // 示例权限，可根据实际需求调整

    let Result = {
        code: 200,
        msg: 'success',
        data: {
            nav: nav,
            authoritys: authoritys
        }
    };

    return Result;
});

Mock.mock('/sys/menu/list', 'get', () => {
	let menus = [
		{
			"id": 1,
			"created": "2021-01-15T18:58:18",
			"updated": "2021-01-15T18:58:20",
			"statu": 1,
			"parentId": 0,
			"name": "系统管理",
			"path": "",
			"perms": "sys:manage",
			"component": "",
			"type": 0,
			"icon": "el-icon-s-operation",
			"ordernum": 1,
			"children": [
				{
					"id": 2,
					"created": "2021-01-15T19:03:45",
					"updated": "2021-01-15T19:03:48",
					"statu": 1,
					"parentId": 1,
					"name": "用户管理",
					"path": "/sys/users",
					"perms": "sys:user:list",
					"component": "sys/User",
					"type": 1,
					"icon": "el-icon-s-custom",
					"ordernum": 1,
					"children": [
						{
							"id": 9,
							"created": "2021-01-17T21:48:32",
							"updated": null,
							"statu": 1,
							"parentId": 2,
							"name": "添加用户",
							"path": null,
							"perms": "sys:user:save",
							"component": null,
							"type": 2,
							"icon": null,
							"ordernum": 1,
							"children": []
						},
						{
							"id": 10,
							"created": "2021-01-17T21:49:03",
							"updated": "2021-01-17T21:53:04",
							"statu": 1,
							"parentId": 2,
							"name": "修改用户",
							"path": null,
							"perms": "sys:user:update",
							"component": null,
							"type": 2,
							"icon": null,
							"ordernum": 2,
							"children": []
						},
						{
							"id": 11,
							"created": "2021-01-17T21:49:21",
							"updated": null,
							"statu": 1,
							"parentId": 2,
							"name": "删除用户",
							"path": null,
							"perms": "sys:user:delete",
							"component": null,
							"type": 2,
							"icon": null,
							"ordernum": 3,
							"children": []
						},
						{
							"id": 12,
							"created": "2021-01-17T21:49:58",
							"updated": null,
							"statu": 1,
							"parentId": 2,
							"name": "分配角色",
							"path": null,
							"perms": "sys:user:role",
							"component": null,
							"type": 2,
							"icon": null,
							"ordernum": 4,
							"children": []
						},
						{
							"id": 13,
							"created": "2021-01-17T21:50:36",
							"updated": null,
							"statu": 1,
							"parentId": 2,
							"name": "重置密码",
							"path": null,
							"perms": "sys:user:repass",
							"component": null,
							"type": 2,
							"icon": null,
							"ordernum": 5,
							"children": []
						}
					]
				},
				{
					"id": 3,
					"created": "2021-01-15T19:03:45",
					"updated": "2021-01-15T19:03:48",
					"statu": 1,
					"parentId": 1,
					"name": "角色管理",
					"path": "/sys/roles",
					"perms": "sys:role:list",
					"component": "sys/Role",
					"type": 1,
					"icon": "el-icon-rank",
					"ordernum": 2,
					"children": []
				},

			]
		},
		{
			"id": 5,
			"created": "2021-01-15T19:06:11",
			"updated": null,
			"statu": 1,
			"parentId": 0,
			"name": "系统工具",
			"path": "",
			"perms": "sys:tools",
			"component": null,
			"type": 0,
			"icon": "el-icon-s-tools",
			"ordernum": 2,
			"children": [
				{
					"id": 6,
					"created": "2021-01-15T19:07:18",
					"updated": "2021-01-18T16:32:13",
					"statu": 1,
					"parentId": 5,
					"name": "数字字典",
					"path": "/sys/dicts",
					"perms": "sys:dict:list",
					"component": "sys/Dict",
					"type": 1,
					"icon": "el-icon-s-order",
					"ordernum": 1,
					"children": []
				}
			]
		}
	]

	Result.data = menus

	return Result
})

Mock.mock(RegExp('/sys/menu/info/*'), 'get', () => {

	Result.data = {
		"id": 3,
		"statu": 1,
		"parentId": 1,
		"name": "角色管理",
		"path": "/sys/roles",
		"perms": "sys:role:list",
		"component": "sys/Role",
		"type": 1,
		"icon": "el-icon-rank",
		"orderNum": 2,
		"children": []
	}

	return Result
})

Mock.mock(RegExp('/sys/menu/info/*'), 'get', () => {

	Result.data = {
		"id": 3,
		"statu": 1,
		"parentId": 1,
		"name": "角色管理",
		"path": "/sys/roles",
		"perms": "sys:role:list",
		"component": "sys/Role",
		"type": 1,
		"icon": "el-icon-rank",
		"orderNum": 2,
		"children": []
	}

	return Result
})

Mock.mock(RegExp('/sys/menu/delete/*'),'post',() => {
	Result.data = {
		msg:'成功删除'
	}
	return Result
})


Mock.mock(RegExp('/sys/role/list*'), 'get', () => {

	Result.data = {
		"records": [
			{
				"id": 3,
				"created": "2021-01-04T10:09:14",
				"updated": "2021-01-30T08:19:52",
				"status": 1,
				"name": "普通用户",
				"code": "normal",
				"remark": "只有基本查看功能",
				"menuIds": []
			},
			{
				"id": 6,
				"created": "2021-01-16T13:29:03",
				"updated": "2021-01-17T15:50:45",
				"status": 1,
				"name": "超级管理员",
				"code": "admin",
				"remark": "系统默认最高权限，不可以编辑和任意修改",
				"menuIds": []
			}
		],
		"total": 2,
		"size": 10,
		"current": 1,
		"orders": [],
		"optimizeCountSql": true,
		"hitCount": false,
		"countId": null,
		"maxLimit": null,
		"searchCount": true,
		"pages": 1
	}

	return Result

})

Mock.mock(RegExp('/sys/role/info/*'), 'get', () => {

	Result.data = {
		"id": 6,
		"created": "2021-01-16T13:29:03",
		"updated": "2021-01-17T15:50:45",
		"status": 1,
		"name": "超级管理员",
		"code": "admin",
		"remark": "系统默认最高权限，不可以编辑和任意修改",
		"menuIds": [3]
	}

	return Result
})

Mock.mock(RegExp('/sys/role/*'), 'post', () => {

	return Result
})

Mock.mock(RegExp('/sys/user/list*'), 'get', () => {
    let Result = {
        code: 200,
        msg: 'success',
        data: {
            "records": [
                {
                    "medicalId": 1,
                    "created": "2021-01-12T22:13:53",
                    "updated": "2021-01-16T16:57:32",
                    "statu": 1,
                    "name": "张三",
                    "gender": "男",
                    "birthday": "1985-05-15",
                    "age": 35,
                    "idCard": "123456789012345678",
                    "phone": "13800138000"
                },
                {
                    "medicalId": 2,
                    "created": "2021-01-30T08:20:22",
                    "updated": "2021-01-30T08:55:57",
                    "statu": 1,
                    "name": "李四",
                    "gender": "女",
                    "birthday": "1978-07-23",
                    "age": 42,
                    "idCard": "098765432109876543",
                    "phone": "13900139000"
                },
                {
                    "medicalId": 3,
                    "created": "2021-02-05T15:45:00",
                    "updated": "2021-02-06T10:15:00",
                    "statu": 1,
                    "name": "王五",
                    "gender": "男",
                    "birthday": "1992-11-08",
                    "age": 28,
                    "idCard": "112233445566778899",
                    "phone": "13700137000"
                }
            ],
            "total": 3,
            "size": 10,
            "current": 1,
            "orders": [],
            "optimizeCountSql": true,
            "hitCount": false,
            "countId": null,
            "maxLimit": null,
            "searchCount": true,
            "pages": 1
        }
    };

    return Result;
});

Mock.mock(RegExp('/sys/user/*'), 'post', () => {
	return Result
})

Mock.mock(RegExp('/sys/user/info/*'), 'get', () => {

	Result.data = {
		"id": 2,
		"created": "2021-01-30T08:20:22",
		"updated": "2021-01-30T08:55:57",
		"statu": 1,
		"username": "test",
		"password": "$2a$10$0ilP4ZD1kLugYwLCs4pmb.ZT9cFqzOZTNaMiHxrBnVIQUGUwEvBIO",
		"avatar": "https://image-1300566513.cos.ap-guangzhou.myqcloud.com/upload/images/5a9f48118166308daba8b6da7e466aab.jpg",
		"email": "test@qq.com",
		"city": null,
		"lastLogin": null,
		"roles": []
	}
	return Result
})