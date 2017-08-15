const mongoClient = require('mongodb').MongoClient
const url = require('url')

const mongoURL = 'mongodb://api:api@ds111559.mlab.com:11559/urlshortener'

const db = mongoClient.connect(mongoURL)

const addSearch = (searchTerm) => {
  const now = new Date()
  db.then(db => {
    return db.collection('searches').insert({
      searchTerm: searchTerm,
      timeStamp: now.toISOString()
    })
  }).then(res => {
    console.log(res)
    return res
  }).catch(err => {
    console.log(err)
  })
}

module.exports = addSearch
