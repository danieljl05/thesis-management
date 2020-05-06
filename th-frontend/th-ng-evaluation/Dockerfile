# Stage 0, based on Node.js, to build and compile Angular
# FROM node:alpine as node
# WORKDIR /app
# COPY ./ /app/
# RUN npm install
# RUN npm run build

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:alpine
COPY . /usr/share/nginx/html
# COPY --from=node /app/dist/ /usr/share/nginx/html
# COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf