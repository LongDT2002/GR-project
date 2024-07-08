from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.neighbors import NearestNeighbors
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
        self.data['combined'] = (self.data['title'] + " " + self.data['summary'] + " " + str(self.data["genres"])).apply(self.preprocess_text)
        tfidf = TfidfVectorizer()
        self.tfidf_matrix = tfidf.fit_transform(self.data['combined'])
        self.nbrs = NearestNeighbors(n_neighbors=10, algorithm='brute', metric='cosine').fit(self.tfidf_matrix)


def train_recommender():
    import pickle
    from .models import Movie
    from .serializer import MovieWithGenreSerializer

    data = Movie.objects.all()
    movie_list = MovieWithGenreSerializer(data, many=True).data
    df_object = [{
        "title": item["title"],
        "summary": item["summary"],
        "genres": item["genres"]
    } for item in movie_list]
    r_cols = ['title', 'summary', 'genres']
    df = pd.DataFrame(df_object, columns=r_cols)
    df.reset_index(drop=True, inplace=True)
    rcm = ContentBasedRecommender(df)
    rcm.fit()

    with open("Apps/Movie/models/tfidf_vectorizer.pkl", 'wb') as file:
        pickle.dump(rcm.tfidf_matrix, file)
    with open("Apps/Movie/models/nearest_neighbors.pkl", 'wb') as file:
        pickle.dump(rcm.nbrs, file)

