import os
from fastapi import FastAPI
from .routers import credentials, inventory, facilities, computers, reservations, computer_map
from fastapi.middleware.cors import CORSMiddleware
import jwt

app = FastAPI()

app.include_router(credentials.router)
app.include_router(computers.router)
app.include_router(inventory.router)
app.include_router(reservations.router)
app.include_router(facilities.router)
app.include_router(computer_map.router)



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
    return "root"