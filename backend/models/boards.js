const mongoose = require('mongoose')
const Schema = mongoose.Schema

const boardSchema = new Schema({ boardName: { type: String, required: true } })

module.exports = mongoose.model('Board', boardSchema)
