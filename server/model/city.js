const { string } = require('jszip/lib/support')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/city', { useNewUrlParser: true, useUnifiedTopology: true }) //链接数据库

const Schema = mongoose.Schema

const citySchema = new Schema({ //建立字符规则
    name: String,
    index: String
})

const City = mongoose.model('City', citySchema, 'city')

module.exports = City
    // const city = new City({
    //     name: '郑州',
    //     index: 'Z'

// })

// city.save().then(mon => {
//     console.log(mon)
// })