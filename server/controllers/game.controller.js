require('dotenv').config()
const Game = require('../models/game.model')
const bcrypt = require('bcrypt')

module.exports.getOne = (req, res) => {
  Game.findOne({ _id: req.params.id })
    .then((item) => res.json(item))
    .catch((err) => res.json(err))
}

module.exports.getAll = (req, res) => {
  Game.find({})
    .collation({ locale: 'en' })
    .sort({ type: 1 })
    .exec(function (err, items) {
      if (err) {
        return res.json(err)
      } else {
        return res.json(items)
      }
    })
}

module.exports.updateOne = (req, res) => {
  Game.findByIdAndUpdate({ _id: req.params.id }, req.body, {
    runValidators: true
  })
    .then((item) => res.json(item))
    .catch((err) => res.json(err))
}

module.exports.deleteOne = (req, res) => {
  Game.findByIdAndDelete({ _id: req.params.id })
    .then((item) => res.json(item))
    .catch((err) => res.json(err))
}

async function checkExists(fieldIn, valueIn) {
  const exists = await Game.exists({ [fieldIn]: valueIn })
  console.log([fieldIn + valueIn])
  if (exists !== null) {
    console.log(JSON.stringify(exists))
    return true
  } else {
    console.log(JSON.stringify(exists))
    return false
  }
}

module.exports.createOne = async (req, res) => {
  console.log(req.body)
  Game.create(req.body)
    .then((item) => res.json(item))
    .catch((err) => res.json(err))
}

module.exports.fetch = async (req, res) => {
  const { clientId, token, endpoint, body } = req.body.searchOptions
  let requestOptions = {
    method: 'POST',
    url: 'https://api.igdb.com/v4/' + endpoint,
    headers: {
      ['Client-ID']: clientId,
      ['Authorization']: `Bearer ${token}`
    },
    body: body
  }
  console.log('Request Options')
  console.log(requestOptions)

  const result = await fetch(
    `https://api.igdb.com/v4${endpoint}`,
    requestOptions
  )
    // Converting to JSON
    .then((response) => response.json())

    // Displaying results to console
    .then((data) => {
      return data
    })
    .catch((err) => console.warn(err))

  console.log('fetch finished, returning data to client')
  console.log(result)
  res.status(200).send(result)
}

module.exports.comefindme = async (req, res) => {
  console.log('server side api request')
  console.log(req.body.searchOptions)
  const { token, endpoint, fields, search, where, limit, offset, sort } =
    req.body.searchOptions
  let requestOptions = {
    method: 'POST',
    url: 'https://api.igdb.com/v4/games',
    headers: {
      ['Client-ID']: `x4rniov57q0741nf6ptq41ohvlvrfs`,
      ['Authorization']: `Bearer ${token}`
    },
    body: [
      `fields ${fields};`,
      `search ${search};`,
      `where ${where};`,
      `limit ${limit};`,
      `offset ${offset};`,
      `sort ${sort};`
    ]
  }
  console.log('Request Options')
  console.log(requestOptions)

  const result = await fetch(
    `https://api.igdb.com/v4${endpoint}`,
    requestOptions
  )
    // Converting to JSON
    .then((response) => response.json())

    // Displaying results to console
    .then((data) => {
      return data
    })
    .catch((err) => console.warn(err))

  console.log('fetch finished, returning data to client')
  console.log(result)
  res.status(200).send(result)
}

module.exports.recent = async (req, res) => {
  const { clientId, token, endpoint, body } = req.body.searchOptions
  let requestOptions = {
    method: 'POST',
    url: 'https://api.igdb.com/v4/' + endpoint,
    headers: {
      ['Client-ID']: clientId,
      ['Authorization']: `Bearer ${token}`
    },
    body: body
  }
  console.log('Request Options')
  console.log(requestOptions)

  const result = await fetch(
    `https://api.igdb.com/v4${endpoint}`,
    requestOptions
  )
    // Converting to JSON
    .then((response) => response.json())

    // Displaying results to console
    .then((data) => {
      return data
    })
    .catch((err) => console.warn(err))

  console.log('fetch finished, returning data to client')
  console.log(result)
  res.status(200).send(result)
}

module.exports.builder = async (req, res) => {
  const { clientId, token, endpoint, requestBody } = req.body.searchOptions
  let requestOptions = {
    method: 'POST',
    url: 'https://api.igdb.com/v4/' + endpoint,
    headers: {
      ['Client-ID']: clientId,
      ['Authorization']: `Bearer ${token}`
    },
    body: requestBody
  }
  console.log('Request Options')
  console.log(requestOptions)

  const result = await fetch(
    `https://api.igdb.com/v4${endpoint}`,
    requestOptions
  )
    // Converting to JSON
    .then((response) => response.json())

    // Displaying results to console
    .then((data) => {
      return data
    })
    .catch((err) => console.warn(err))

  console.log('fetch finished, returning data to client')
  console.log(result)
  res.status(200).send(result)
}
