# Backend section

the backend section is the set of backend containers, is accesible using the corresponding url. These routes are protected using JWT

![nginx](/docs/img/nginx.jpg)

Each container listen an unique port and are defined according to the following tables:

## Database
![database](/docs/img/database.png)

## Api containers

| Container | Url |
| ----- | ---- |
| th_lm_configuration  | [localhost:8081](http:/localhost:8081/api/)  |
| th_lm_login  | [localhost:8082](http:/localhost:8082/api/)  |

## Data containers

| Container | Url |
| ----- | ---- |
| th_mysql  | [localhost:3306](http:/localhost:3306)  |
| th_redis  | [localhost:6379](http:/localhost:6379)  |
