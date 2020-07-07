const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ListSchema = require('./lists')

const BoardSchema = new Schema({
  boardName: { type: String, required: true },
  lists: [ListSchema],
  description: { type: String },
  adminUser: {
    type: mongoose.Schema.Types.ObjectId,
    // ref: 'User',
    required: true
  }
  // team: [mongoose.Schema.Types.ObjectId]
})

module.exports = mongoose.model('Board', BoardSchema)
// module.exports = BoardSchema
