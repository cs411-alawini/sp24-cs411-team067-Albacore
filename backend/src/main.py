import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import mysql.connector

app = FastAPI()
origins = ["*"]
app.add_middleware(
    ## What is cors? See: https://fastapi.tiangolo.com/tutorial/cors/
    CORSMiddleware,
    ## NOTE: allow origins is dangerous
    allow_origins=origins,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

dbhost = os.environ['DB_HOST']
dbuser = os.environ['DB_USER']
dbpswd = os.environ['DB_PSWD']
dbname = os.environ['DB_NAME']

mydb = mysql.connector.connect(
    host=dbhost,
    user=dbuser,
    password=dbpswd,
    database=dbname
)

# inspired by docs: https://techwasti.com/fastapi-mysql-simple-rest-api-example

@app.get("/")
async def root():
    cursor = mydb.cursor()
    cursor.execute("SELECT * from Student")
    result = cursor.fetchall()
    return {"student": result}