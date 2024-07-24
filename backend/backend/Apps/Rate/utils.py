import pandas as pd
from datetime import datetime
import time

from .models import Rate
from .serializer import RateSerializer
from .recommendation import CF

def recommend():
    data = Rate.objects.all()
    all_rate = RateSerializer(data, many=True).data
    
    if len(all_rate) > 0:
        modified_data =[{k: item[k] for k in ['account', 'movie', 'rate', 'timestamp']} for item in all_rate]
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

        res = CF(rate_train, k = 10, uuCF = 1)
        res.fit()
        return res
    return None
