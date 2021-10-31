FROM node:latest
WORKDIR /app

ENV GOOGLE_APPLICATION_CREDENTIALS /app/optical-legend-292212-a4b8b442a8ba.json

ENTRYPOINT [ "npm","start" ]