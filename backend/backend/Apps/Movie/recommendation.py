from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.neighbors import NearestNeighbors
from scipy.sparse import hstack
import re
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
import pandas as pd

nltk.download('stopwords')
nltk.download('wordnet')

class ContentBasedRecommender:
    def __init__(self, data: pd.DataFrame):
        self.data = data
        self.tfidf_matrix = None
        self.nbrs = None

    def preprocess_text(self, text):
        text = str(text)
        text = re.sub(r'\W', ' ', text)  # Remove special characters
        text = re.sub(r'\s+', ' ', text)  # Remove extra spaces
        text = text.lower()  # Convert to lowercase
        tokens = text.split()
        tokens = [word for word in tokens if word not in stopwords.words('english')]  # Remove stopwords
        lemmatizer = WordNetLemmatizer()
        tokens = [lemmatizer.lemmatize(word) for word in tokens]  # Lemmatize
        return ' '.join(tokens)
    
    def fit(self):
        # Khởi tạo TfidfVectorizer cho diễn viên
        self.data['actors'] = self.data['actors'].apply(self.preprocess_text)
        tfidf_vectorizer_cast = TfidfVectorizer()
        tfidf_matrix_cast = tfidf_vectorizer_cast.fit_transform(self.data['actors'])

        # Khởi tạo TfidfVectorizer cho đạo diễn
        self.data['director'] = self.data['director'].apply(self.preprocess_text)
        tfidf_vectorizer_director = TfidfVectorizer()
        tfidf_matrix_director = tfidf_vectorizer_director.fit_transform(self.data['director'])

        # Khởi tạo TfidfVectorizer cho thể loại
        self.data['genres'] = self.data['genres'].apply(self.preprocess_text)
        tfidf_vectorizer_genres = TfidfVectorizer()
        tfidf_matrix_genres = tfidf_vectorizer_genres.fit_transform(self.data['genres'])

        # Khởi tạo TfidfVectorizer cho nội dung
        self.data['content'] = (self.data['title'] + " " + self.data['summary']).apply(self.preprocess_text)
        tfidf_vectorizer_content = TfidfVectorizer()
        tfidf_matrix_content = tfidf_vectorizer_content.fit_transform(self.data['content'])

        weight_cast = 0.4
        weight_director = 0.3
        weight_genres = 0.2
        weight_content = 0.1

        # Nhân các ma trận TF-IDF với trọng số tương ứng
        tfidf_matrix_cast = tfidf_matrix_cast * weight_cast
        tfidf_matrix_director = tfidf_matrix_director * weight_director
        tfidf_matrix_genres = tfidf_matrix_genres * weight_genres
        tfidf_matrix_content = tfidf_matrix_content * weight_content

        # Kết hợp các ma trận lại với nhau
        self.tfidf_matrix = hstack([tfidf_matrix_cast, tfidf_matrix_director, tfidf_matrix_genres, tfidf_matrix_content])


        self.nbrs = NearestNeighbors(n_neighbors=10, algorithm='brute', metric='cosine').fit(self.tfidf_matrix)


def train_recommender():
    import pickle
    from .models import Movie
    from .serializer import MovieDataForContentBased

    data = Movie.objects.all()
    movie_list = MovieDataForContentBased(data, many=True).data
    df_object = [{
        "title": item["title"],
        "summary": item["summary"],
        "genres": item["genres"],
        "actors": item["actors"],
        "director": item["director"]
    } for item in movie_list]
    r_cols = ['title', 'summary', 'genres', 'actors', 'director']
    df = pd.DataFrame(df_object, columns=r_cols)
    df.reset_index(drop=True, inplace=True)
    rcm = ContentBasedRecommender(df)
    rcm.fit()

    with open("Apps/Movie/ML/tfidf_vectorizer_v2.pkl", 'wb') as file:
        pickle.dump(rcm.tfidf_matrix, file)
    with open("Apps/Movie/ML/nearest_neighbors_v2.pkl", 'wb') as file:
        pickle.dump(rcm.nbrs, file)

