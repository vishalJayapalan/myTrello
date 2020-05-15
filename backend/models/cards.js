const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cardSchema = new Schema({ cardName: { type: String, required: true } })

module.exports = mongoose.model('Card', cardSchema)
