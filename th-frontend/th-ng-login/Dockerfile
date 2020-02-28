# FROM node:11.15-alpine
# WORKDIR /app
# RUN npm install -g @angular/cli@8.3.25
# COPY . .
# RUN npm install
# EXPOSE 4200
# CMD npm run start

# FROM node:alpine AS builder

# WORKDIR /app

# COPY . .

# RUN npm install && \
#     npm run build

# FROM nginx:alpine

# COPY --from=builder /app/dist/* /usr/share/nginx/html/



# Stage 0, based on Node.js, to build and compile Angular
FROM node:latest as node
WORKDIR /app
COPY ./ /app/
RUN npm install
# ARG configuration=production
RUN npm run build

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:alpine
COPY --from=node /app/dist/ /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf