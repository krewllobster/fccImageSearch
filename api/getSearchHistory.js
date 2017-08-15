const mongoClient = require('mongodb').MongoClient

const mongoURL = 'mongodb://api:api@ds111559.mlab.com:11559/urlshortener'

const db = mongoClient.connect(mongoURL)

const getSearchHistory = (searchTerm) => {
  return db.then(db => {
    return db.collection('searches')
      .find({}, {_id: 0})
      .sort({time: -1})
      .limit(10)
      .toArray()
  }).then(array => {
    console.log('searches returned')
    return array
  }).catch(err => {
    console.log(err)
  })
}

module.exports = getSearchHistory
