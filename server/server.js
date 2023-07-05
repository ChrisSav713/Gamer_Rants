require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.REACT_APP_SERVER_PORT

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST']
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

require('./config/mongoose.config')

const gameRoutes = require('./routes/game.routes.js')
gameRoutes(app)

app.listen(port, () => console.log(`Server running on port ${port}`))
