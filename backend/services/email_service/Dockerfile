FROM python:3

WORKDIR /app

# prevents Python from writing pyc files to disc
ENV PYTHONDONTWRITEBYTECODE 1
# prevents Python from buffering stdout and stderr
ENV PYTHONUNBUFFERED 1

# copy requirements.txt to the container and install dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy the rest of project files to the working directory
COPY . .

CMD ["python", "consumer.py"]
