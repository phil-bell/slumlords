FROM python:3-alpine
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
WORKDIR /
COPY requirements.txt /
RUN pip install -r requirements.txt
COPY . /
RUN python manage.py migrate
EXPOSE 8000 8000
ENTRYPOINT ["python", "manage.py", "runserver"]
