import pickle

def recommend(index):
    with open("Apps/Movie/models/tfidf_vectorizer.pkl", 'rb') as file:
        tfidf_matrix = pickle.load(file)
    with open("Apps/Movie/models/nearest_neighbors.pkl", 'rb') as file:
        nbrs = pickle.load(file)

    # data = Movie.objects.all()
    # movie_list = MovieWithGenreSerializer(data, many=True).data
    # df_object = [{
    #     "title": item["title"],
    #     "summary": item["summary"],
    #     "genres": item["genres"]
    # } for item in movie_list]
    # r_cols = ['title', 'summary', 'genres']
    # df = pd.DataFrame(df_object, columns=r_cols)
    distances, indices = nbrs.kneighbors(tfidf_matrix[index-1], n_neighbors=10)
    result = indices[0][1:].tolist()
    return result

