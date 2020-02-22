# Thesis managment - microservices

This a microservices example project using 

  - Laravel/Lumen 
  - Angular
  - Mysql
  - Redis

## File structure
```
├─configuration
│   └─dev
│       └─backend
│           └─resources
├─th-backend
│   └─th-lumen-configuration
└─th-frontend
    └─th-ng-configuration
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
```

Set the database up
```
$ docker exec -it th_lm_configuration php artisan migrate --seed
```

## Access
* Backend
  * *th-lumen-configuration: [localhost:8081](http:/localhost:8081/)*
* Frontend
  * *th-ng-configuration: [localhost:8001](http:/localhost:8001/)*

<!-- ## About -->

## Goal
![architecture](/docs/architecture.jpg)

### License
----

MIT
