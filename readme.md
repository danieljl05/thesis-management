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

```bash
├─configuration
│   └─dev
│       ├─backend
│       │    ├─resources
│       │    └─Dockerfile
│       ├─frontend
│       │    └─Dockerfile
│       └─docker-compose.yml
├─th-backend
│   ├─th-lumen-bank
│   ├─th-lumen-configuration
│   ├─th-lumen-evaluation
│   └─th-lumen-login
└─th-frontend
    ├─th-ng-bank
    │   └─Dockerfile
    ├─th-ng-bank
    │   └─Dockerfile
    ├─th-ng-configuration
    │   └─Dockerfile
    ├─th-ng-evaluation
    │   └─Dockerfile
    └─th-ng-login
        └─Dockerfile
```

## Design patterns

### Lumen
- Facade
- Iterator

### Angular
- Factory
- Decorator
- Singleton

## Development

Start containers using docker compose

```bash
cd thesis-managment/configuration/dev
docker-compose build
docker-compose up -d
```

Install backend dependencies

```bash
docker exec -it th_lm_configuration composer install
docker exec -it th_lm_login composer install
docker exec -it th_lm_bank composer install
docker exec -it th_lm_evaluation composer install
```

Set the database up

```bash
docker exec -it th_lm_configuration php artisan migrate --seed
```

If you have executed the previous commands you can go to [localhost](http:/localhost:80) and you should login using admin@gmail.com as username and 123 as the password.

### Deploy front changes if the containers are already up

Generates angular project build - inside project (it requires npm)

```bash
npm run build
```

copy dist to nginx

```bash
docker exec -it th_ng_configuration bash
cp -r /app/dist/* /usr/share/nginx/html
```

```bash
docker exec -it th_ng_login bash
cp -r /app/dist/* /usr/share/nginx/html
```

Or just set the containers down and build images again

```bash
cd thesis-managment/configuration/dev
docker-compose down
docker-compose build
docker-compose up -d
```

## Container names

### Backend

- th_lm_configuration - [localhost:8081](http:/localhost:8081/api)
- th_lm_login - [localhost:8082](http:/localhost:8082/api)
- th_lm_bank - [localhost:8083](http:/localhost:8083/api)
- th_lm_evaluation - [localhost:8084](http:/localhost:8084/api)

### Frontend

- th_ng_configuration - [localhost:8001](http:/localhost:8001/)
- th_ng_login - [localhost:8002](http:/localhost:8002/)
- th_ng_bank - [localhost:8003](http:/localhost:8003/)
- th_ng_evaluation - [localhost:8004](http:/localhost:8004/)

### Data

- th_mysql - port 3306
- th_redis - port 6379

### Gateway

- th_ngnix_gateway - port 80

## Goal

![architecture](/docs/img/architecture.png)

### License

----
MIT
