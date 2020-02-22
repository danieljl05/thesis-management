FROM node:11.15-alpine
WORKDIR /app
RUN npm install -g @angular/cli@8.3.25
COPY . .
RUN npm install
EXPOSE 4200
CMD npm run start