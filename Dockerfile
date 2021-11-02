FROM node:latest
WORKDIR /app

COPY ./optical-legend-292212-a4b8b442a8ba.json .
ENV GOOGLE_APPLICATION_CREDENTIALS ./optical-legend-292212-a4b8b442a8ba.json


#RUN npm i 

CMD bash
