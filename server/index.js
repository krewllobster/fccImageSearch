require('dotenv/config')
const express = require('express')
const helmet = require('helmet')
const imageSearch = require('image-search-google')
const app = express()
const api = require('../api/index.js')

app.use(helmet())

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html')
})

app.get(['/api/search/:search-:offset', '/api/search/:search'], (req, res, next) => {

  const offset = req.params.offset || 1
  const searchTerm = req.params.search

  api.addSearch(searchTerm)

  api.getSearchResults(searchTerm, offset).then(results => {
    res.json(results)
  }).catch(err => {
    res.json(err)
  })
})


app.get('/api/history', (req, res) => {
  api.getSearchHistory().then(result => {
    res.json(result)
  }).catch(err => {
    console.log(err)
  })
})

app.listen(process.env.PORT || 27010, () => {
  console.log('node.js listening')
})
