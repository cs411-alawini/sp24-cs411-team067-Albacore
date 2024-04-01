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

cursor.execute("SELECT * FROM Inventory")
items = cursor.fetchall()

for item in items:
    start_time = datetime(2024, 1,1,0,0,0,0)
    

