const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CardSchema = require('../cards/cardsModel')

const ListSchema = new Schema({
  listName: { type: String, required: true },
  cards: [CardSchema]
})

mongoose.model('List', ListSchema)
module.exports = ListSchema
