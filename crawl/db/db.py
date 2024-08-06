import mysql.connector
import json

class Director:
    def __init__(self, name, place_of_birth, biography, birthday, deathday):
        self.name = name
        self.place_of_birth = place_of_birth
        self.biography = biography
        self.birthday = birthday
        self.deathday = deathday


def add_director_table(mydb, mycursor):
    with open('../final/directors.json', "r") as f:
        datas = json.load(f)
    for data in datas:
        director = Director(data["NAME_"], data["PLACE_OF_BIRTH"], data["BIOGRAPHY"], data["BIRTHDAY"], data["DEATHDAY"])
        query = "INSERT INTO Director_director (name, place_of_birth, biography, birthday, deathday) VALUES (%s, %s, %s, %s, %s)"
        values = (director.name, director.place_of_birth, director.biography, director.birthday, director.deathday)
        mycursor.execute(query, values)
        mydb.commit()
    

class Movie:
    def __init__(self, title, release_date, duration, summary, synopsis, director_id, budget, original_country, revenue):
        self.title = title
        self.release_date = release_date
        self.duration = duration
        self.summary = summary
        self.synopsis = synopsis
        self.director_id = director_id
        self.budget = budget
        self.original_country = original_country
        self.revenue = revenue


def add_movie_table(mydb, mycursor):
    with open('../final/movies_with_directorid.json', "r") as f:
        datas = json.load(f)
    count = 1
    for data in datas:
        query = "INSERT INTO Movie_movie (id, title, release_date, duration, ave_rate, summary, director_id, budget, original_country, revenue) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
        values = (data["id"], data["title"], data["release_date"], data["runtime"], 0.0, data["overview"], data["director_id"], data["budget"], data["production_countries"], data["revenue"])
        mycursor.execute(query, values)
        mydb.commit()

        for genre in data["genres"]:
            query = "INSERT INTO Movie_movie_genre (id, genre_id, movie_id) VALUES (%s, %s, %s)"
            values = (count, genre, data["id"])
            mycursor.execute(query, values)
            mydb.commit()
            count += 1

        # backdrop_path = data["backdrop_path"]
        # poster_path = data["poster_path"]
        # query = "INSERT INTO Movie_movieimage (movie_id, image, type) VALUES (%s, %s, %s)"
        # values = (count, backdrop_path, "backdrop")
        # mycursor.execute(query, values)
        # mydb.commit()
        # values = (count, poster_path, "poster")
        # mycursor.execute(query, values)
        # mydb.commit()
            

def add_movie_image(mydb, mycursor):
    with open('../final/movie_images.json', "r") as f:
        datas = json.load(f)
    for data in datas:
        query = "INSERT INTO Movie_movieimage (movie_id, image, type) VALUES (%s, %s, %s)"
        values = (data["id"], data["path"], data["type"])
        mycursor.execute(query, values)
        mydb.commit()


def add_movie_video(mydb, mycursor):
    with open('../final/movie_videos.json', "r") as f:
        datas = json.load(f)
    for data in datas:
        query = "INSERT INTO Movie_movievideo (movie_id, title, link, type) VALUES (%s, %s, %s, %s)"
        values = (data["movie_id"], data["name"], data["key"], data["type"])
        mycursor.execute(query, values)
        mydb.commit()


class Actor:
    def __init__(self, name, place_of_birth, biography, birthday, deathday):
        self.name = name
        self.place_of_birth = place_of_birth
        self.biography = biography
        self.birthday = birthday
        self.deathday = deathday

def add_actor_table(mydb, mycursor):
    with open('../final/actor_images_2.json', "r") as f:
        datas = json.load(f)
    for data in datas:
        actor = Actor(data["actor_name"], data["PLACE_OF_BIRTH"], data["BIOGRAPHY"], data["BIRTHDAY"], data["DEATHDAY"])
        query = "INSERT INTO Actor_actor (name, place_of_birth, biography, birthday, deathday) VALUES (%s, %s, %s, %s, %s)"
        values = (actor.name, actor.place_of_birth, actor.biography, actor.birthday, actor.deathday)
        mycursor.execute(query, values)
        mydb.commit()


def add_movie_actor_table(mydb, mycursor):
    with open('../final/movies_with_actorid.json', "r") as f:
        datas = json.load(f)
    for data in datas:
        query = "INSERT INTO Movie_movie_actor (movie_id, actor_id, character_name) VALUES (%s, %s, %s)"
        values = (data["movie_id"], data["db_actor_id"], data["character"])
        mycursor.execute(query, values)
        mydb.commit()


def add_actor_image(mydb, mycursor):
    with open('../final/actor_images.json', "r") as f:
        datas = json.load(f)
    for data in datas:
        query = "INSERT INTO Actor_actorimage (actor_id, image) VALUES (%s, %s)"
        values = (data["id"], data["PROFILE_PATH"])
        mycursor.execute(query, values)
        mydb.commit()


def add_movie_genre_table(mydb, mycursor):
    with open('../new/movie_details_2.json', "r") as f:
        datas = json.load(f)

    id = 1
    for data in datas:
        query = "INSERT INTO Movie_movie_genre (genre_id, movie_id) VALUES (%s, %s)"
        for genre in data["genres"]:
            values = (genre, id)
            mycursor.execute(query, values)
            mydb.commit()
        id += 1 

def add_director_image(mydb, mycursor):
    with open('../final/director_images.json', "r") as f:
        datas = json.load(f)
    for data in datas:
        query = "INSERT INTO Director_directorimage (director_id, image) VALUES (%s, %s)"
        values = (data["director"], data["image"])
        mycursor.execute(query, values)
        mydb.commit()

def add_genre_table(mydb, mycursor):
    genre = {
        'Action': 1,
        'Adventure': 2,
        'Animation': 3,
        'Biography': 4,
        'Comedy': 5,
        'Crime': 6,
        'Documentary': 7,
        'Drama': 8,
        'Family': 9,
        'Fantasy': 10,
        'Film-Noir': 11,
        'Game-Show': 12,
        'History': 13,
        'Horror': 14,
        'Music': 15,
        'Musical': 16,
        'Mystery': 17,
        'News': 18,
        'Reality-TV': 19,
        'Romance': 20,
        'Science Fiction': 21,
        'Short': 22,
        'Sport': 23,
        'Talk-Show': 24,
        'Thriller': 25,
        'War': 26,
        'Western': 27
    }
    for data in genre.keys():
        print(data)
        query = "INSERT INTO Movie_genre (name) VALUES (%s)"
        values = (data,)
        mycursor.execute(query, values)
        mydb.commit()

def main():
    mydb = mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="test"
    )
    mycursor = mydb.cursor()
    add_director_image(mydb, mycursor)
    mycursor.close()

if __name__ == "__main__":
    main()
