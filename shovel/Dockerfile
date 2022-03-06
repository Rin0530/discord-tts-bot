FROM node:latest
WORKDIR /app

COPY ./package.json .

RUN npm i

ENTRYPOINT [ "bash","./start.sh" ]