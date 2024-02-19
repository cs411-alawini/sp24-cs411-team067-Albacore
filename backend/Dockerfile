# Base Image
FROM python3.9.13-slim-buster

WORKDIR /app
# Install deps and cache

COPY requirements.txt ./
RUN pip install -r requirements.txt

COPY . .

COPY env.backend .env

EXPOSE 8000




