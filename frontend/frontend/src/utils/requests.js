const API_KEY = 'e4d2477534d5a54cb6f0847a0ee853eb'
const BASE_URL = 'https://api.themoviedb.org/3'

const requests = {
    fetchTrending: "/movie/trending/",
    fetchLatestMovies: '/movie/latest/',
    fetchTopRated: "/movie/top_rated/",
    fetchUpcoming: "/movie/upcoming/",
    fetchRecommend: "/movie/recommend/",
    fetchGenreList: "/movie/genres/",
    fetchMoviesByGenre: "/movie/genre/",
    fetchMovieDetails: "/movie/",
    fetchActorDetails: "/actor/",
    fetchDirectorDetails: "/director/",
}

export default requests
    