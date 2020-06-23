const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CardSchema = new Schema({
  cardName: { type: String, required: true },
  cardDescription: { type: String }
  //   listId: { type: mongoose.Schema.Types.ObjectId }
})

mongoose.model('Card', CardSchema)
module.exports = CardSchema
