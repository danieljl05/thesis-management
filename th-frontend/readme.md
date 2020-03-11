# Frontend section

![nginx](/docs/img/nginx.jpg)

the frontend section is the set of frontend containers, is accesible using one nginx container as a reverse proxy:

![proxy](/docs/img/proxy.png)

It runs at 80 port and redirects according to the following table:

| Path | Container |
| ----- | ---- |
| /  | th_ng_login  |
| /auth  | th_ng_login  |
| /configuration  | th_ng_configuration  |