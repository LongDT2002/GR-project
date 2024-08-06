BASE_URL = 'https://api.themoviedb.org/3'
API_KEY = 'e4d2477534d5a54cb6f0847a0ee853eb'

fetch_request = {
    'fetchActionMovies': f'{BASE_URL}/discover/movie?api_key={API_KEY}&language=en-US&with_genres=28',
    'fetchComedyMovies': f'{BASE_URL}/discover/movie?api_key={API_KEY}&language=en-US&with_genres=35',
    'fetchMovieDetails': f'{BASE_URL}/movie/',
    'fetchPersonDetails': f'{BASE_URL}/person/',
}

genre_id = {
    "Action": 1,
    "Adventure": 2,
    "Animation": 3,
    "Biography": 4,
    "Comedy": 5,
    "Crime": 6,
    "Documentary": 7,
    "Drama": 8,
    "Family": 9,
    "Fantasy": 10,
    "Film-Noir": 11,
    "Game-Show": 12,
    "History": 13,
    "Horror": 14,
    "Music": 15,
    "Musical": 16,
    "Mystery": 17,
    "News": 18,
    "Reality-TV": 19,
    "Romance": 20,
    "Sci-Fi": 21,
    "Short": 22,
    "Sport": 23,
    "Talk-Show": 24,
    "Thriller": 25,
    "War": 26,
    "Western": 27,
}
