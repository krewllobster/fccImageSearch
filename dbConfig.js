const mongoClient = require('mongodb').MongoClient

mongoClient.connect('mongodb://api:api@ds111559.mlab.com:11559/urlshortener', (err, db) => {
  if (err) throw err

  db.collection('searches').remove({})

  db.close()
})
