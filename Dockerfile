FROM node:latest
WORKDIR /app

COPY . .

ENV GOOGLE_APPLICATION_CREDENTIALS /app/optical-legend-292212-a4b8b442a8ba.json

RUN npm install -g npm@8.0.0 \
 && npm install

CMD bash
