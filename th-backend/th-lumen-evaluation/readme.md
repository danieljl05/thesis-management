# Th-lumen-configuration

This is the configuration api that runs in th_lm_configuration container, this container manages the app configuration.

It runs at [localhost:8081](http:/localhost:8081/api/)


Set the container up
```
$ docker exec -it th_lm_configuration composer install
```
Set the database up
```
$ docker exec -it th_lm_configuration php artisan migrate --seed
```
It requires JWT implementation.

## Endpoints

### GET

Get one annuity by id
```
/api/annuity/{id}
```
Get all annuities
```
/api/annuity/
```
### POST
Annuity creation - update
```
/api/annuity/
```
| Field | Type |
| ----- | ---- |
| name  | string  | 
| active  | boolean  |
