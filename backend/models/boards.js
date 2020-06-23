const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ListSchema = require('./lists')

const BoardSchema = new Schema({
  boardName: { type: String, required: true },
  lists: [ListSchema]
})

module.exports = mongoose.model('Board', BoardSchema)
// module.exports = BoardSchema
