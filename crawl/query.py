import random

num_records = 25000
account_ids = range(1, 10)
movie_ids = range(1, 3034)
rates = range(1, 6)

data_set = set()
count = 0
while count < num_records:
    account_id = random.choice(account_ids)
    movie_id = random.choice(movie_ids)
    rate = random.choice(rates)
    # Đảm bảo mỗi account_id chỉ có một lần rate với mỗi movie_id
    if (account_id, movie_id, rate) not in data_set:
        data_set.add((account_id, movie_id, rate))
        count += 1
    print(count)

id = 1
insert_statements = []
for data in data_set:
    insert_statements.append(f"INSERT INTO rate_rate (id, rate, account_id, movie_id, timestamp) VALUES ({id}, {data[2]}, {data[0]}, {data[1]}, CURRENT_TIMESTAMP(6));")
    id += 1
with open('21.sql', 'w') as f:
    f.write('\n'.join(insert_statements))
