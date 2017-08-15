const mongoClient = require('mongodb').MongoClient

const db = mongoClient.connect(process.env.MONGO_URL)

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
