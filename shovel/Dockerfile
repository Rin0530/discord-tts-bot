FROM node:latest
WORKDIR /app

COPY . .
ENV GOOGLE_APPLICATION_CREDENTIALS ./optical-legend-292212-a4b8b442a8ba.json

RUN touch list.txt
RUN npm i

CMD npm start