const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CardSchema = new Schema({
  cardName: { type: String, required: true },
  cardDescription: { type: String, default: '' }
})

mongoose.model('Card', CardSchema)
module.exports = CardSchema
