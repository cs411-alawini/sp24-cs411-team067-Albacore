import random
import mysql.connector
from datetime import datetime, timedelta

connection = mysql.connector.connect(
    host="35.239.240.215",
    user="albacore",
    password="Fishshallpass",
    database="SampleDB"
)

cursor = connection.cursor()

cursor.execute("SELECT * from Credentials")
creds = cursor.fetchall()
#netid, password, permission

cursor.execute("SELECT * FROM Inventory")
items = cursor.fetchall()
#itemid, itemname, _, _, _, duration

for item in items:
    for month in (1,2,3):
        start_time = datetime(2024, month, 1, 0, 0, 0, 0)
        delta_day = random.randint(0,20)
        delta_hour = random.randint(8,20)
        delta_minutes = random.randint(0,59)
        start_time += timedelta(days=delta_day, hours=delta_hour, minutes=delta_minutes)

        item_duration = item[-1]
        end_delta_hour = random.randint(0, item_duration-1)
        end_delta_second = random.randint(0, 59)
        if delta_hour == 0:
            end_delta_minute = random.randint(30, 59)
        else:
            end_delta_minute = random.randint(0, 59)
        end_time = start_time + timedelta(hours=end_delta_hour, minutes=end_delta_minute, seconds=end_delta_second)

        deadline = start_time + timedelta(hours=item_duration)

        netID = random.choice(creds)[0]
        itemID = item[0]
        start_time = start_time.strftime('%Y-%m-%d %H:%M:%S')
        end_time = end_time.strftime('%Y-%m-%d %H:%M:%S')
        deadline = deadline.strftime('%Y-%m-%d %H:%M:%S')

        cursor.execute("INSERT INTO Reservations (StartTime, ReturnTime, Deadline, NetID, ItemID) VALUES (%s, %s, %s, %s, %s)", 
                       (start_time,
                        end_time,
                        deadline,
                        netID,
                        itemID))
    break
connection.commit()
cursor.close()
connection.close()
