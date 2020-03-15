import axios from 'axios'

// Set Free OMDB Api URL with key generated 
// for juansebastianvc@gmail.com with axios
axios.defaults.baseURL = 'http://www.omdbapi.com/?apikey=9ea9caf2&page=1&type=movie&r=json'

export default {
    // Method for fetch first view and searched movies
    fetchmovies (search) {
        return axios.get('&s=' + search)
          .then(res => {
            return res.data
          })
      },
      // Method for fetch movie info by imdb-id
      fetchmovie (id) {
        return axios.get('&i=' + id)
          .then(res => {
            return res.data
          })
      }
}
