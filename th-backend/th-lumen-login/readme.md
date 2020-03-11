# Th-lumen-login

This is the login api that runs in th_lm_login container, this container manages the authentication.

It runs at [localhost:8082](http:/localhost:8082/api)


Set the container up
```
$ docker exec -it th_lm_login composer install
```

It requires the database instance.

## Endpoints

### GET

Get the current user inside json (using token info)
```
/api/profile
```
Get one user by id
```
/api/users/{id}
```
Get all users
```
/api/users/
```
### POST
Sigin user 
```
/api/sigin/
```
| Field | Type |
| ----- | ---- |
| name  | string  | 
| email  | string  |
| password  | string  |

User login
```
/api/login/
```
| Field | Type |
| ----- | ---- |
| email  | string  |
| password  | string  |