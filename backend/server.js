const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const boardRoutes = require('./routers/boards')
const listRoutes = require('./routers/lists')
const cardRoutes = require('./routers/cards')

const app = express()

const port = process.env.PORT || 8000
const uri = process.env.ATLAS_URI

app.use(cors())
app.use(express.json())

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.use('/', boardRoutes)
app.use('/board', listRoutes)
// app.use('/card', cardRoutes)

const connection = mongoose.connection

connection.once('open', () =>
  console.log('mongoDb connection established succesfully!!!!')
)

app.listen(port, () => console.log(`connected to port ${port}!`))
