import os
from fastapi import FastAPI
from .routers import credentials, inventory, facilities
from fastapi.middleware.cors import CORSMiddleware
import jwt

app = FastAPI()

app.include_router(credentials.router)
app.include_router(inventory.router)
app.include_router(facilities.router)

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




# inspired by docs: https://techwasti.com/fastapi-mysql-simple-rest-api-example

@app.get("/")
async def root():
    # cursor = mydb.cursor()
    # cursor.execute("SELECT * from Student")
    # result = cursor.fetchall()
    # return {"student": result}
    return "root"