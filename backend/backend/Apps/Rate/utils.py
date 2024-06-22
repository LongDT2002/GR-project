import pandas as pd
from datetime import datetime
import time

from .models import Rate
from .recommendation import CF
from .serializer import RateSerializer

def recommend():
    data = Rate.objects.all()
    serializer = RateSerializer(data, many=True)
    r_cols = ['user_id', 'movie_id', 'rating']
    
    if len(serializer.data) > 0:
        modified_data =[{k: item[k] for k in ['account', 'movie', 'rate', 'timestamp']} for item in serializer.data]
        for item in modified_data:
            dt_object = datetime.strptime(item["timestamp"], "%Y-%m-%dT%H:%M:%S.%fZ")
            item["timestamp"] = int(time.mktime(dt_object.timetuple()))
        
        df_object = [{
            "user_id": item["account"],
            "movie_id": item["movie"],
            "rating": item["rate"],
            "unix_timestamp": item["timestamp"]
        } for item in modified_data]

        r_cols = ['user_id', 'movie_id', 'rating', 'unix_timestamp']
        ratings_base = pd.DataFrame(df_object, columns=r_cols)
        rate_train = ratings_base.to_numpy()
        rate_train[:, :2] -= 1

        rs = CF(rate_train, k = 40, uuCF = 0)
        rs.fit()
        return rs
    return None
