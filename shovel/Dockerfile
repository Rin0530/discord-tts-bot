FROM node:latest
WORKDIR /app

COPY . .
ENV GOOGLE_APPLICATION_CREDENTIALS ./client_secret.json

RUN touch list.txt
RUN npm i

CMD npm start