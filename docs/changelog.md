# Change Log

All notable changes to this project will be documented in this file.

## 2020/03/05 - v0.0.1

### Docker - 80%

- **Backend containers**: th_lm_configuration, th_lm_login, redis, mysql, phpmyadmin.
- **Frontend containers**: th_ng_configuration, th_ng_login, th_ngninx_gateway.

### Database - 95%

#### Added

- First relational model implemented

### Backend - 25%

#### Added

- Login endpoints
- JWT authentication

### Frontend - 25%

#### Added

- Token handler
- Login implementation
- Login and configuration projects structure (template and angular material integration)
- Reverse proxy as frontend gateway
- th-ng-commons library with all shared guards and models between projects

### Development time

From 13/02 to 05/03

| Component | Hours |
| ----- | ---- |
| Docker  | 16  |
| Database  | 4  |
| Backend  | 8  |
| Frontend  | 24  |
| Others  | 6  |
| Total  | 60  |

## 2020/05/10 - v0.0.2

### Docker - 100%

#### Added

- **Backend containers**: th_lm_bank, th_lm_evaluation.
- **Frontend containers**: th_ng_bank, th_ng_evaluation.

#### Changed
- Docker-compose file.

### Database - 100%

#### Added

- th_lm_configuration data seeders.

#### Changed

- Tables, tables columns and structure.

### Backend - 50%

#### Added

- Database entity models and relationships configuration (ORM).
- Parent controller to manage commons services (CRUD).
- Configuration endpoints: users, projects, evaluation config (REST controllers).
- Redis integration (for evaluation config).
- Initial structure for bank and evaluation api's.

#### Changed

- Register user endpoint.
- Migrations and models for the database changes.

### Frontend - 50%

#### Added

- Finished configuration and login project.
- Base href angular projects setted.
- Users CRUD.
- Projects CRUD.
- Annuities CRUD (Ev config).

#### Changed

- Remove unused components and menus.
- Commons library frontend models.

### Development time

From 06/03 to 10/05

| Component | Hours |
| ----- | ---- |
| Docker  | 2  |
| Database  | 2  |
| Backend  | 24  |
| Frontend  | 16  |
| Others  | 6  |
| Total  | 50  |
