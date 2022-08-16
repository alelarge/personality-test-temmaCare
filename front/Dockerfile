FROM node:14.20.0

WORKDIR /front
COPY . .
RUN npm install
RUN npm run build
RUN npm install -g serve
CMD [ "serve", "-s", "build" ]
