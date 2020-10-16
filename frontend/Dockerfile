FROM node:alpine as build-stage

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY ./ /app/

RUN npm run build

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:latest

COPY --from=build-stage /app/build/ /var/www/

# Copy the default nginx.conf provided
COPY --from=build-stage app/nginx.conf /etc/nginx/nginx.conf