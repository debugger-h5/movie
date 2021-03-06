const express = require('express')
const app = new express()
var bodyParser = require('body-parser')
const City = require('./model/city')
const Movie = require('./model/movie')
const multer = require('multer')
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/uploads', express.static('uploads'))
    // parse application/json
app.use(bodyParser.json())


var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + file.originalname)
    }
})

var upload = multer({ storage: storage })


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
            })
        }
    })
})

// 获取所有的城市信息
app.get('/city', async(req, res) => {
        City.find().then(mon => {
            if (mon) {
                res.json({
                    code: 20000,
                    msg: '获取成功',
                    list: mon
                })
            }
        })
    })
    // 获取分页的城市信息
app.get('/citypage', async(req, res) => {
    const page = req.query.page || 1 //当前页码
    const pagesize = req.query.pagesize || 5 //一页显示行数
    const start = ((Number(page) - 1) * Number(pagesize)) //从那一页查数据
    const skips = Number(pagesize)
    const total = await City.find() //所有的数据
        // console.log(total.length) 所有数据的长度
    const result = await City.find().skip(start).limit(skips) //当前页数查询的数据
    res.json({
            code: 20000,
            msg: '获取成功',
            list: result,
            total: total.length
        })
        // City.find().then(mon => {
        //     if (mon) {
        //         res.json({
        //             code: 20000,
        //             msg: '获取成功',
        //             list: mon
        //         })
        //     }
        // })
})


// 获取单个城市信息
app.get('/citys/:id', (req, res) => {
        const id = req.params.id
        City.findById(id).then(mon => {
            if (mon) {
                res.json({
                    code: 20000,
                    msg: '查询成功',
                    list: mon
                })
            }
        })
    })
    // 修改数据
app.put('/put/:id', (req, res) => {
        const id = req.params.id
        console.log(id)
        City.findByIdAndUpdate(id, req.body).then(mon => {
            if (mon) {
                res.json({
                    code: 20000,
                    msg: '修改成功'
                })
            }
        })
    })
    //删除城市信息
app.delete('/del/:id', (req, res) => {
    // console.log(req.params.id)
    City.findByIdAndDelete(req.params.id).then(mon => {
        if (mon) {
            res.json({
                code: 20000,
                msg: '删除成功'
            })
        }
    })
})

// // 图片上传接口
app.post('/upload', upload.single('avatar'), function(req, res, next) {  
    res.json({
        code: 20000,
        msg: '图片已上传',
        path: req.file.path     
    })

})

// 添加电影信息
app.post('/movie/create', (req, res) => {
    // console.log(req.body.region)
    // City.findById(req.body.region).then(data => {
    //     console.log(data)
    // })
    const movie = new Movie({
        title: req.body.title,
        imageUrl: req.body.imageUrl,
        stars: req.body.stars,
        ratings: req.body.ratings,
        description: req.body.description,
        p: req.body.region
    })

    movie.save().then(mon => {
        // console.log(mon)
        if (mon) {
            res.json({
                code: 20000,
                msg: '上传成功'
            })
        }
    })
})

// 显示所有电影信息
app.get('/movie', (req, res) => {
    Movie.find({}).populate('p').then(mon => {
        // console.log(mon)
        res.json({
            code: 20000,
            list: mon,
            msg: '电影信息加载完成'
        })
    })
})

// 删除电影信息
app.delete('/movie/del/:id', (req, res) => {
    console.log(req.params.id)
    Movie.findByIdAndDelete(req.params.id).then(mon => {
        if (mon) {
            res.json({
                code: 20000,
                msg: '删除完成'
            })
        }
    })
})








app.listen(8888, '127.0.0.1')