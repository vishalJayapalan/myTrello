const mongoose = require('mongoose')
const Schema = mongoose.Schema
const jwt = require('jsonwebtoken')
const Joi = require('joi')
require('dotenv').config()
// const BoardSchema = require('./boards')

const UserSchema = new Schema({
  userName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

UserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: 3600
  })
  return token
}

const User = mongoose.model('User', UserSchema)

function validateUser (user) {
  const schema = {
    userName: Joi.string()
      .min(3)
      .max(50)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(3)
      .max(255)
      .required()
  }
  return Joi.validate(user, schema)
}

exports.User = User
exports.validate = validateUser
