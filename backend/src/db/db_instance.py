import os
import mysql.connector

dbhost = os.environ['DB_HOST']
dbuser = os.environ['DB_USER']
dbpswd = os.environ['DB_PSWD']
dbname = os.environ['DB_NAME']

# dbconfig = {
#     "database" : "somedb",
#     "user": "someuser"
# }

# see: https://dev.mysql.com/doc/connector-python/en/connector-python-connection-pooling.html

mydb = mysql.connector.connect(
    host=dbhost,
    user=dbuser,
    password=dbpswd,
    database=dbname,
    pool_name="MySQLPool")

# otherwise returns a list
cursor = mydb.cursor(dictionary=True)

def get_cursor():
    return cursor

def get_db_conn():
    return mydb