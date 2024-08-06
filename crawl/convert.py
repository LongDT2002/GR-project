import json
import pprint as pp
# from iteration_utilities import duplicates

# def remove_duplicates():
#     with open("movie_details.json", "r") as f:
#         data = json.load(f)
#         f.close()
#     new_data = []
#     for movie in data:
#         movie.pop("id")
#         movie = json.dumps(movie)
#         new_data.append(movie)

#     new_data = set(new_data)
#     new_data = [json.loads(movie) for movie in new_data]
#     with open("movie_details_list.json", "w") as f:
#         json.dump(new_data, f, indent=4)


# def remove_duplicate_movies():
#     with open("movies.json", "r") as f:
#         data = json.load(f)
#         f.close()

#     new_data = []
#     for movie in data:
#         new_movie = {
#             list(movie.keys())[0]: movie["title"]
#         }
#         new_data.append(json.dumps(new_movie))
#     new_data = set(new_data)
#     new_data = [json.loads(movie) for movie in new_data]
#     with open("movie_list.json", "w") as f:
#         json.dump(new_data, f, indent=4)
#     print(len(new_data))


# def sort_data():
#     with open("movie_details_list.json", "r") as f:
#         data = json.load(f)
#         sorted_data = sorted(data, key=lambda x: list(x.values())[1])
#         f.close()
#     with open("movie_details_list.json", "w") as f:
#         json.dump(sorted_data, f, indent=4)


# def convert_to_json():
#     with open("movie_synopsis.json", "r") as f:
#         data = json.load(f) 
#         f.close()
#     new_data = {}
#     for d in data:
#         title = list(d.keys())[0]
#         synopsis = d[title]
#         new_data[title] = synopsis
    
#     with open("movie_synopsis.json", "w") as f:
#         json.dump(new_data, f, indent=4)


# def add_synopsis():
#     with open("movie_details_list.json", "r") as f:
#         data = json.load(f)
#         f.close()
#     new_data = []
#     with open("movie_synopsis.json", "r") as f:
#         synopsis = json.load(f)
#         f.close()
#     for movie in data:
#         title = movie["title"]
#         try:
#             movie["synopsis"] = synopsis[title]
#         except:
#             movie["synopsis"] = ""
#         new_data.append(movie)
#     print(len(new_data))                  
#     with open("movie_details.json", "w") as f:
#         json.dump(new_data, f, indent=4)


# def convert_to_director_id():
#     with open("movie_details.json", "r") as f:
#         data = json.load(f)
#         f.close()
#     with open("director.json", "r") as f:
#         directors = json.load(f)
#         f.close()
#     director_dict = {}
#     for director in directors:
#         item = list(director.values())
#         director_dict[item[1]] = item[0]

#     dup_list = ['Nick Gillespie', 'Tony Mitchell', 'Kim Hong-sun']
#     key_list = list(director_dict.keys())
#     val_list = list(director_dict.values())

#     err = []
#     for movie in data:
#         direc_name = movie["director"]
#         if direc_name in dup_list:
#             continue
#         else:
#             try:
#                 position = val_list.index(direc_name)
#                 movie["director_id"] = key_list[position]
#             except:
#                 data.remove(movie)
#                 err.append(movie)
#     with open("error.json", "w") as f:
#         json.dump(err, f, indent=4)
#     with open("movie_details.json", "w") as f:
#         json.dump(data, f, indent=4)



def main():
    with open("final/movie_actor.json", "r") as f:
        movies = json.load(f)
        f.close()

    with open("final/actors.json", "r") as f:
        actors = json.load(f)
        f.close()

    actors_dict = {}
    for actor in actors:
        actor_name = actor["actor_name"]
        actor_id = actor["id"]
        actors_dict[actor_name] = actor_id

    new_data = []
    for movie in movies:
        movie_id = movie["movie_id"]
        movie_actor = movie["actor_name"]
        try:
            movie["db_actor_id"] = actors_dict[movie_actor]
        except:
            print(movie_id)
            movie["db_actor_id"] = None
        new_data.append(movie)

    with open("final/movies_with_actorid.json", "w") as f:
        json.dump(new_data, f, indent=4)


if __name__ == "__main__":
    main()
