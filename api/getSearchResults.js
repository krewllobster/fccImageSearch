const fetch = require('node-fetch')
const Bluebird = require('bluebird')
fetch.Promise = Bluebird

const getSearchResults = (searchTerm, offset) => {
  const baseURL = 'https://www.googleapis.com/customsearch/v1?searchType=image'
  const apiKey = process.env.API_KEY
  const cseId = process.env.CSE_ID

  return fetch(
    `${baseURL}&key=${apiKey}&cx=${cseId}&num=10&start=${offset}&q=${searchTerm}`)
    .then(res => res.json())
    .then(json => {

      if (json.error) {
        throw json.error
      }

      return json.items.map(i => {
        return {
          url: i.link,
          snippet: i.snippet,
          thumbnail: i.image.thumbnailLink,
          context: i.image.contextLink,
        }
      })
    })
    .catch(err => {
      console.log('error with search query')
      return err
    })
}

module.exports = getSearchResults
