FROM node:lts-alpine as build-stage
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --silent
COPY . /usr/src/app
RUN npm run build --prod

FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /usr/src/app/www /usr/share/nginx/html
