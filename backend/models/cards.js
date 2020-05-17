const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CardSchema = new Schema({ cardName: { type: String, required: true } })

mongoose.model('Card', CardSchema)
module.exports = CardSchema
