const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CardSchema = require('../cards/cardsModel')

const ListSchema = new Schema({
  listName: { type: String, required: true },
  // BoardId: { type: mongoose.Schema.Types.ObjectId }
  cards: [CardSchema]
})

mongoose.model('List', ListSchema)
module.exports = ListSchema
