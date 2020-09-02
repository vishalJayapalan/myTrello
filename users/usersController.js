const { User, validate } = require('./usersModel')
const bcrypt = require('bcrypt')

/*
Route localhost:8000/user
*/

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password')
    res.status(200).json(user)
  } catch (err) {
    return res
      .status(500)
      .json({ msg: 'There was an error. Please try again later' })
  }
}

/*
  /user/all
*/

const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password')
    res.status(200).json(users)
  } catch (err) {
    return res
      .status(500)
      .json({ msg: 'There was an error. Please try again later' })
  }
}

/*
Route localhost:8000/user/login
*/

const login = async (req, res) => {
  const { email, password } = req.body
  try {
    if (!email || !password) {
      return res.status(400).json({ msg: 'Please Enter all fields' })
    }
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ msg: 'emailId or password is incorrect' })
    }
    const correctPassword = await bcrypt.compare(password, user.password)
    if (correctPassword) {
      const token = user.generateAuthToken()
      return (
        res
          .status(200)
          .cookie('x-auth-token', token, { maxAge: 3600000 })
          // .header('x-auth-token', token)
          .json({
            token: token
          })
      )
    } else {
      return res.status(404).json({ msg: 'emailId or password is incorrect' })
    }
    // Write an else case for bcrypt compare
  } catch (err) {
    return res
      .status(500)
      .json({ msg: 'There was an error. Please try again later' })
  }
}

/*
Route localhost:8000/user
*/

const registerUser = async (req, res) => {
  try {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    let user = await User.findOne({ email: req.body.email })
    if (user) return res.status(400).json({ msg: 'User already registered' })
    user = await User.findOne({ userName: req.body.userName })
    if (user) return res.status(400).json({ msg: 'Name already taken' })
    const { email, userName, password } = req.body

    user = new User({
      userName,
      password,
      email
    })
    user.password = await bcrypt.hash(user.password, 10)
    await user.save()

    const token = user.generateAuthToken()
    res
      .status(201)
      .cookie('x-auth-token', token, { maxAge: 3600000 })
      // .header('x-auth-token', token)
      .json({
        token: token
      })
  } catch (err) {
    return res
      .status(500)
      .json({ msg: 'There was an error. Please try again later' })
  }
}

module.exports = { login, getUser, getUsers, registerUser }
