from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import pprint as pp
import json

from request import (
    fetch_request,
    genre_id
)

# def get_movie_list(driver):
#     movies = []
#     with open('movie_list.json', 'a') as f:
#         for i in range(1, 501):
#             driver.get(f'{fetch_request["fetchActionMovies"]}&page={i}')
#             data = json.loads(driver.find_element(By.TAG_NAME, 'body').text).get('results')
#             for d in data:
#                 movies.append({
#                     d.get('id'): d.get('title')
#                 })
#             print(f'Page {i} done')
#         json.dump(movies, f, indent=4)
#
#
# def get_movie_details(driver):
#     file = open('movie_list.json', 'r')
#     data = json.load(file)
#     movie_list = []
#     movie_id = 0

#     with open('movie_details.json', 'w') as f:
#         for movie in data:
#             tmdb_id = list(movie.keys())[0]
#             title = movie[tmdb_id]
#             driver.get(f'{fetch_request["fetchMovieDetails"]}{tmdb_id}?api_key=e4d2477534d5a54cb6f0847a0ee853eb')
#             details = json.loads(driver.find_element(By.TAG_NAME, 'body').text)
#             movie_list.append({
#                 "id": movie_id,
#                 "tmdb_id": tmdb_id,
#                 "title": details.get('title'),
#                 "release_date": details.get('release_date'),
#                 "duration": details.get('runtime'),
#                 "ave_rate": 0.0,
#                 "poster_path": details.get('poster_path'),
#                 "backdrop_path": details.get('backdrop_path'),
#                 "origin_country": details.get('origin_country'),
#                 "summary": details.get('overview'),
#                 "revenue": details.get('revenue'),
#                 "budget": details.get('budget'),
#                 "genres": [genre.get('name') for genre in details.get('genres')],
#             })
#             print(movie_id, f'{title} done')
#             movie_id += 1
#             json.dump(movie_list, f, indent=4)


# def get_movie_synopsis(driver):
#     file = open('movie_imdb_id.json', 'r')
#     data = json.load(file)
#     with open('movie_synopsis.json', 'a') as f:
#         count = 0
#         for movie in data:
#             status: str
#             imdb_id = list(movie.values())[0]
#             driver.get(f'https://www.imdb.com/title/{imdb_id}/plotsummary/?ref_=tt_stry_pl#synopsis')
#             driver.execute_script("window.scrollTo(0, 5000);")
#             try:
#                 html = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.XPATH, '/html/body/div[2]/main/div/section/div/section/div/div[1]/section[2]/div[2]/ul/li')))
#                 details = html.text
#                 status = "success"
#             except:
#                 details = ""
#                 status = "null"

#             synopsis = {
#                 list(movie.keys())[0]: details
#             }
#             print(f'{count} {list(movie.keys())[0]} {status}')
#             count += 1
#             json.dump(synopsis, f, indent=4)
#             f.write(',\n')


# def get_movie_imdb_id(driver):
#     file = open('movie_list.json', 'r')
#     data = json.load(file)
#     imdb_ids = []
#     with open('movie_imdb_id.json', 'w') as f:
#         for movie in data:
#             tmdb_id = list(movie.keys())[0]
#             driver.get(f'{fetch_request["fetchMovieDetails"]}{tmdb_id}/external_ids?api_key=e4d2477534d5a54cb6f0847a0ee853eb')
#             details = json.loads(driver.find_element(By.TAG_NAME, 'body').text)
#             imdb_ids.append({
#                 movie[tmdb_id]: details['imdb_id']
#             })
#             print(f'{movie["id"]} {movie[tmdb_id]} done')
#         json.dump(imdb_ids, f, indent=4)


# def get_movie_videos(driver):
#     file = open('./final/movies.json', 'r')
#     data = json.load(file)
#     file.close()

#     videos = []
#     with open('./final/movie_videos.json', 'w') as f:
#         for movie in data:
#             tmdb_id = movie["FILMID"]
#             driver.get(f'{fetch_request["fetchMovieDetails"]}{tmdb_id}/videos?api_key=e4d2477534d5a54cb6f0847a0ee853eb')
#             try:
#                 details = json.loads(driver.find_element(By.TAG_NAME, 'body').text).get('results')

#                 for video in details:
#                     videos.append({
#                         "movie_id": movie["id"],
#                         "name": video.get('name'),
#                         "key": video.get('key'),
#                         "type": video.get('type')
#                     })
#                 print(f'{movie["id"]}. movie {movie["title"]} done')
#             except:
#                 print(f'{movie["id"]}. movie {movie["title"]} has no video')
#         json.dump(videos, f, indent=4)


# def add_director(driver):
#     file = open('movie_details.json', 'r')
#     data = json.load(file)
#     file.close()
#     count = 0
#     rmv_data = []
#     for movie in data:
#         tmdb_id = movie['imdb_id']
#         driver.get(f'{fetch_request["fetchMovieDetails"]}{tmdb_id}/credits?api_key=e4d2477534d5a54cb6f0847a0ee853eb')
#         crew = json.loads(driver.find_element(By.TAG_NAME, 'body').text).get('crew')
#         if not crew:
#             rmv_data.append(movie)
#             data.remove(movie)
#             continue
#         for c in crew:
#             if c.get('job') == 'Director':
#                 movie['director'] = c.get('name')
#                 break
#         if 'director' not in movie:
#             rmv_data.append(movie)
#             data.remove(movie)
#             continue
#         count += 1
#         print(f'{count}. {movie["imdb_id"]} {movie["title"]} with \"{movie["director"]}\" done')
#     print(len(rmv_data))
#     with open('movie_detail_with_director.json', 'w') as f:
#         json.dump(data, f, indent=4)
#         f.close()
#     with open('movie_detail_without_director.json', 'w') as f:
#         json.dump(rmv_data, f, indent=4)
#         f.close()

# import pprint as pp
# def get_movie_images(driver):
#     images = []
#     with open('./final/movies.json', 'r') as f:
#         datas = json.load(f)
#         f.close()
#     for movie in datas:
#         movie_id = movie["FILMID"]
#         driver.get(f'{fetch_request["fetchMovieDetails"]}{movie_id}/images?api_key=e4d2477534d5a54cb6f0847a0ee853eb')
#         data = json.loads(driver.find_element(By.TAG_NAME, 'body').text)

#         try:
#             backdrops = data['backdrops']
#             for image in backdrops:
#                 images.append({
#                     "id": movie["id"],
#                     "movie_id": movie_id,
#                     "path": image['file_path'],
#                     "type": "backdrop"
#                 })
#         except:
#             print(f'{movie_id} has no backdrop')
#         try:
#             posters = data['posters']
#             for image in posters:
#                 images.append({
#                     "id": movie["id"],
#                     "movie_id": movie_id,
#                     "path": image['file_path'],
#                     "type": "poster"
#                 })
#         except:
#             print(f'{movie_id} has no poster')

#         try:
#             logos = data['logos']
#             for image in logos:
#                 images.append({
#                     "id": movie["id"],
#                     "movie_id": movie_id,
#                     "path": image['file_path'],
#                     "type": "logo"
#                 })
#         except:
#             print(f'{movie_id} has no logo')
#         print(f'{movie["id"]}. {movie["title"]} done')
        
#     with open('./final/movie_images.json', 'w') as f:
#         json.dump(images, f, indent=4)

# def get_director(driver):
#     file = open('movie_details.json', 'r')
#     data = json.load(file)
#     file.close()

#     count = 0
#     new_data = set()
#     data_error = []
#     for movie in data:
#         tmdb_id = movie['imdb_id']
#         driver.get(f'{fetch_request["fetchMovieDetails"]}{tmdb_id}/credits?api_key=e4d2477534d5a54cb6f0847a0ee853eb')
#         crew = json.loads(driver.find_element(By.TAG_NAME, 'body').text).get('crew')
#         for c in crew:
#             if c["job"] == 'Director':
#                 id = c["id"]
#                 director = c["name"]
#                 if director != movie['director']:
#                     data_error.append({
#                         'movie_id': tmdb_id,
#                         'director': movie['director'],
#                         'director_found': director,
#                         'director_id': id
#                     })
#                     break
#                 new_data.add(json.dumps({
#                     id: director
#                 }))
#                 break
#         count += 1
#         print(f'{count}. {movie["imdb_id"]} with \"{movie["director"]}\" done')
#     with open('director.json', 'w') as f:
#         new_data = list(new_data)
#         json.dump(new_data, f, indent=4)


# def get_director_details(driver):
#     file = open('director.json', 'r')
#     data = json.load(file)
#     file.close()

#     count = 0
#     with open('director_details.json', 'w') as f:
#         for d in data:
#             director = json.loads(d)
#             for key in director.keys():
#                 driver.get(f'{fetch_request["fetchPersonDetails"]}{key}?api_key=e4d2477534d5a54cb6f0847a0ee853eb')
#                 details = json.loads(driver.find_element(By.TAG_NAME, 'body').text)

#                 info = {
#                     "imdb_id": key,
#                     "id": count,
#                     "name": director[key],
#                     "birthday": details.get('birthday'),
#                     "deathday": details.get('deathday'),
#                     "place_of_birth": details.get('place_of_birth'),
#                     "biography": details.get('biography'),
#                     "poster": details.get('profile_path'),
#                 }
#                 json.dump(info, f, indent=4)
#                 print(f'{count}. {key} {director[key]} done')
#                 count += 1


# def get_movie_crew_list(driver):
#     file = open('./final/movies.json', 'r')
#     data = json.load(file)
#     file.close()

#     movie_list = []
#     with open('./final/movie_actor_list.json', 'w') as f:
#         for movie in data:
#             actor_list = []
#             tmdb_id = movie['FILMID']
#             try:
#                 driver.get(f'{fetch_request["fetchMovieDetails"]}{tmdb_id}/credits?api_key=e4d2477534d5a54cb6f0847a0ee853eb')
#                 cast = json.loads(driver.find_element(By.TAG_NAME, 'body').text).get('cast')
#                 for actor in cast:
#                     actor_info = {
#                         "movie_id": movie['id'],
#                         "actor_id": actor.get('id'),
#                         "actor_name": actor.get('name'),
#                         "character": actor.get('character'),
#                     }
#                     actor_list.append(actor_info)
#                 movie_list.append({
#                     movie['id']: actor_list
#                 })
#             except:
#                 pass
#             print(f'{movie["id"]}. {movie.get("title")} done')
#         json.dump(movie_list, f, indent=4)
    

# def get_actor_list(driver):
#     file = open('./data/movie_crew_list.json', 'r')
#     data = json.load(file)
#     file.close()
#     movie_list = list(data.keys())
#     actor_set = set()
#     for movie in movie_list:
#         actor_list = data[movie]
#         for actor in actor_list:
#             actor_set.add(json.dumps({
#                 "actor_id": actor['actor_id'],
#                 "actor_name": actor['actor_name']
#             }))
#     with open('./data/actor_list.json', 'w') as f:
#         json.dump(list(actor_set), f, indent=4)

# def get_actor_details(driver):
#     file = open('./data/actor_list.json', 'r')
#     data = json.load(file)
#     file.close()

#     actor_List = []
#     count = 1
#     for d in data:
#         d = json.loads(d)
#         actor_id = d["actor_id"]
#         request = f'{fetch_request["fetchPersonDetails"]}{actor_id}?api_key=e4d2477534d5a54cb6f0847a0ee853eb'
#         driver.get(request)
#         details = json.loads(driver.find_element(By.TAG_NAME, 'body').text)
#         actor_List.append({
#             "id": count,
#             "name": details["name"],
#             "birthday": details.get('birthday'),
#             "deathday": details.get('deathday'),
#             "place_of_birth": details.get('place_of_birth'),
#             "biography": details.get('biography'),
#         })
#         print(f'{count}. {details["name"]} done')
#         count += 1
#     with open('./data/actor_details.json', 'w') as f:
#         json.dump(actor_List, f, indent=4)

def get_actor_image(driver):
    file = open('./final/actors.json', 'r')
    data = json.load(file)
    file.close()

    images = []
    for d in data:
        actor_id = d["actor_id"]
        url = f'{fetch_request["fetchPersonDetails"]}{actor_id}/images?api_key=e4d2477534d5a54cb6f0847a0ee853eb'
        driver.get(url)
        details = json.loads(driver.find_element(By.TAG_NAME, 'body').text).get('profiles')
        try:
            images.append({
                "actor_id": d["id"],
                "image": details[0].get('file_path')
            })
        except:
            print(f'{d["id"]} {d["actor_name"]} error')
        print(f'{d["id"]} {d["actor_name"]} done')
    with open('./final/actor_images.json', 'w') as f:
        json.dump(images, f, indent=4)


# def get_director_image(driver):
#     file = open('./final/directors.json', 'r')
#     data = json.load(file)
#     file.close()
#     images = []
#     for d in data:
#         director_id = d.get("PERSONID")
#         url = f'{fetch_request["fetchPersonDetails"]}{director_id}/images?api_key=e4d2477534d5a54cb6f0847a0ee853eb'
#         driver.get(url)

#         try:
#             details = json.loads(driver.find_element(By.TAG_NAME, 'body').text).get('profiles')
#             for detail in details:
#                 images.append({
#                     "director": d["id"],
#                     "image": detail.get('file_path')
#                 })
#             print(f'{d["id"]} {d["NAME_"]} done')
#         except:
#             print(f'{d["id"]} {d["NAME_"]} error')
#     with open('./final/director_images.json', 'w') as f:
#         json.dump(images, f, indent=4)


def main():
    driver = webdriver.Chrome()
    get_actor_image(driver)
    

if __name__ == '__main__':
    main()
