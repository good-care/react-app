# Building
ARG REACT_PHP_API_HOST=localhost
ARG REACT_PHP_API_PORT=8000

FROM node:current-alpine3.12 as node
ARG REACT_PHP_API_HOST
ARG REACT_PHP_API_PORT
# installing all dependencies
WORKDIR /opt/web
COPY package.json ./
RUN npm install
# copying and building
RUN mkdir src
COPY ./src ./src
RUN mkdir public
COPY ./public ./public
COPY babel.config.json .
COPY webpack.config.js .

COPY .env .
RUN sed -i "s/PHP_API_HOST=.*/PHP_API_HOST=${REACT_PHP_API_HOST}/" .env
RUN sed -i "s/PHP_API_PORT=.*/PHP_API_PORT=${REACT_PHP_API_PORT}/" .env

RUN npm run build

# copying the result to the Nginx server
FROM nginx:stable-alpine as nginx

COPY nginx/default.conf /etc/nginx/conf.d
COPY --from=node /opt/web/build /var/www

# tell Nginx to stay in the foreground
#RUN echo "daemon off;" >> /etc/nginx/nginx.conf
ENTRYPOINT ["nginx", "-g", "daemon off;"]

EXPOSE 80
