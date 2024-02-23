import os

dbhost = os.environ['DB_HOST']
dbuser = os.environ['DB_USER']
dbpswd = os.environ['DB_PSWD']
dbname = os.environ['DB_NAME']

print("dbhost: " , dbhost)
print("dbuser: " , dbuser)
print("dbpswd: " , dbpswd)
print("dbname: " , dbname)