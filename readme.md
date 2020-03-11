# Thesis management - microservices

This is the prototype of a web application for thesis management, the student selects a thesis from projects bank, and the evaluator, using the qualification rubric associated with the project, can determine the final grade of the project.

![modules](/docs/img/modules.png)

## Stack

This a microservices example project using 

  - Laravel/Lumen 
  - Angular
  - Mysql
  - Redis
  
![architecture](/docs/img/stack.png)

## File structure
```
├─configuration
│   └─dev
│       ├─backend
│       │    ├─resources
│       │    └─Dockerfile
│       ├─frontend
│       │    └─Dockerfile
│       └─docker-compose.yml
├─th-backend
│   └─th-lumen-login
│   └─th-lumen-configuration
└─th-frontend
    ├─th-ng-login
    │   └─Dockerfile
    └─th-ng-configuration
        └─Dockerfile
```
## Development

Start containers using docker compose

```
$ cd thesis-managment/configuration/dev
$ docker-compose up -d
```
Install backend dependencies

```
$ docker exec -it th_lm_configuration composer install
$ docker exec -it th_lm_login composer install
```

Set the database up
```
$ docker exec -it th_lm_configuration php artisan migrate --seed
```
Deploy front changes if the containers are already up

Generates angular project build - inside project (it requires npm)
```
$ npm run build
```
copy dist to nginx
```
$ docker exec -it th_ng_configuration cp -r /app/dist/ /usr/share/nginx/html
$ docker exec -it th_ng_login cp -r /app/dist/ /usr/share/nginx/html
```

## Containers names
### Backend
* th_lm_configuration - [localhost:8081](http:/localhost:8081/api)
* th_lm_login - [localhost:8082](http:/localhost:8082/api)
### Frontend
* th_ng_configuration - [localhost:8001](http:/localhost:8001/)
* th_ng_login - [localhost:8002](http:/localhost:8002/)
### Data
* th_mysql - port 3306
* th_redis - port 6379
### Gateway
* th_ngnix_gateway - port 80

<!-- ## About -->

## Goal
![architecture](/docs/img/architecture.png)

### License
----

MIT
