# Base Image
FROM python:3.9-slim-bullseye

WORKDIR /app
# Install deps and cache

COPY requirements.txt ./

RUN pip install -r requirements.txt
COPY . .

EXPOSE 8000

ENTRYPOINT ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]