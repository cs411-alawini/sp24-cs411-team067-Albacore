# Following: https://testdriven.io/blog/fastapi-jwt-auth/

import time
from typing import Dict
from datetime import datetime, timedelta
import jwt
from decouple import config
from fastapi import HTTPException
JWT_SECRET = config("SECRET")
JWT_ALGORITHM = config("ALGO")

def token_response(token: str):
    return {
        "access_token": token
    }

def signJWT(user_id: str, isAdmin: bool=False):
    current_time = datetime.now()
    expirary_date = current_time + timedelta(days=7)
    expirary_date_str = expirary_date.strftime("%Y-%m-%d %H:%M:%S")
    payload = {
        "user_id": user_id,
        "expires": expirary_date_str,
        "role": "admin" if isAdmin else "student"
    }
    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)
    return token_response(token)

def decodeJWT(token: str) -> dict:
    try:
        current_time = datetime.now()
        decoded_token = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        current_time_str = current_time.strftime("%Y-%m-%d %H:%M:%S")
        return decoded_token if decoded_token["expires"] >= current_time_str else None
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token is expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
    except:
        raise HTTPException(status_code=401, detail="Error occurred decoding JWT")