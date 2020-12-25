# Building
FROM node:current-alpine3.12 as node
# installing all dependencies
WORKDIR /opt/web
COPY package.json ./
RUN npm install
# copying and building
CMD "mkdir src"
COPY ./src ./src
CMD "mkdir public"
COPY ./public ./public
RUN npm run build
# copying the result to the Nginx server
FROM nginx:stable-alpine as nginx
COPY nginx/default.conf /etc/nginx/conf.d
COPY --from=node /opt/web/build /var/www
# tell Nginx to stay in the foreground
#CMD ["nginx", "-g", "daemon off;"]

EXPOSE 80
