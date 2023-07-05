const express = require('express')
const app = express()
const port = 8080
const bodyParser = require('body-parser')

initializeApp({
  credential: applicationDefault()
})

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

// Endpoint for retrieving recently added games
app.get('/search', (req, res) => {
  query
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      console.log(err)
    })
})

app.listen(port, () => {
  console.log(`Application listening on Port ${port}`)
})
