# Base Image
FROM python:3.9-bullseye

WORKDIR /app
# Install deps and cache

COPY requirements.txt ./

RUN pip install -r requirements.txt
COPY . .

COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

EXPOSE 8000

ENTRYPOINT ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]