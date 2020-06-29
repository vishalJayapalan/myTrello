const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ListSchema = require('./lists')

const BoardSchema = new Schema({
  boardName: { type: String, required: true },
  lists: [ListSchema],
  adminUser: {
    type: mongoose.Schema.Types.ObjectId,
    // ref: 'User',
    required: true
  }
})

module.exports = mongoose.model('Board', BoardSchema)
// module.exports = BoardSchema
