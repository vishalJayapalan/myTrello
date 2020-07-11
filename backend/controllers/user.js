const { User, validate } = require('../models/users')
const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')

/*
Route localhost:8000/user
*/

const getUser = async (req, res) => {
  const user = await User.findById(req.user._id).select('-password')
  res.json(user)
}

/*
  /user/all
*/

const getUsers = async (req, res) => {
  const users = await User.find().select('-password')
  res.json(users)
}

/*
Route localhost:8000/user/login
*/

const login = async (req, res) => {
  const { email, password } = req.body
  try {
    if (!email || !password) return res.json({ msg: 'Please Enter all fields' })
    const user = await User.findOne({ email })
    if (!user) return res.status(404).json({ msg: 'user does not exist' })

    if (await bcrypt.compare(password, user.password)) {
      const token = user.generateAuthToken()
      return res.header('x-auth-token', token).send({
        token: token
      })
    }
    // Write an else case for bcrypt compare
  } catch (err) {
    return res.status(400).json({ msg: 'Invalid Credencials' })
  }
}

/*
Route localhost:8000/user
*/

const addUser = async (req, res) => {
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  let user = await User.findOne({ email: req.body.email })
  if (user) return res.status(400).send('User already registered.')

  const { email, userName, password } = req.body

  user = new User({
    userName,
    password,
    email
  })
  user.password = await bcrypt.hash(user.password, 10)
  await user.save()

  const token = user.generateAuthToken()
  res.header('x-auth-token', token).send({
    _id: user._id,
    userName: user.userName,
    password: user.password,
    email: user.email,
    token: token
  })
}

module.exports = { login, getUser, getUsers, addUser }
