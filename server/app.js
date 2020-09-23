const express = require('express')
const app = new express()
var bodyParser = require('body-parser')
const City = require('./model/city')
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())




app.post('/user/login', function(req, res) {
    // req.session.token='加密算法生成随机token'
    // const data={"code":20000,"data":{"roles":["editor"],"token":req.session.token,"introduction":"I am a super administrator","avatar":"https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif","name":"Super Admin"}}
    const data = {
        "code": 20000,
        "data": {
            "token": "asasasasas",
            "orangiseid": 'wwwwwwww',
            "introduction": "I am a super administrator",
            "avatar": "https://dgss0.bdstatic.com/5bVWsj_p_tVS5dKfpU_Y_D3/res/r/image/2020-09-22/7afe3efb3e8fb391539e4e821e9ece28.jpg",
            "name": "Super Admin"
        }
    }
    res.json(data)
})
app.get('/user/info', function(req, res) {
    const data = { "code": 20000, "data": { "roles": ["editor"], "introduction": "I am a super administrator", "avatar": "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2456975006,3192848039&fm=26&gp=0.jpg", "name": "Super Admin" } }
    res.json(data)
})
app.post('/user/logout', function(req, res) {
    res.json({ "code": 20000, "message": "success" })
})


// 添加城市信息
app.post('/city/create', (req, res) => {
    // console.log(req.body)
    const city = new City(req.body)
    city.save().then(mon => {
        if (mon) {
            res.json({
                code: 20000,
                msg: '城市信息添加成功',
                list: mon
            })
        }
    })
})







app.listen(8888, '127.0.0.1')