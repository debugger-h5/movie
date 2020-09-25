const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/city', { useNewUrlParser: true, useUnifiedTopology: true }) //链接数据库

const Schema = mongoose.Schema

const movieSchema = new Schema({ //建立字符规则
    title: String,
    imageUrl: String,
    stars: String,
    ratings: String,
    description: String,
    p: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'City'
    }
})

const Movie = mongoose.model('Movie', movieSchema, 'movie')

module.exports = Movie