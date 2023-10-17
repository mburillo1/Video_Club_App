FROM node

WORKDIR /app

RUN apt-get update && apt-get install -y mysql-client

COPY . .

RUN npm install

EXPOSE 80

CMD bash -c "until nc -z -v -w30 mysql 3306; do echo 'Waiting for MySQL to be available...'; sleep 1; done && PORT=80 npm start"