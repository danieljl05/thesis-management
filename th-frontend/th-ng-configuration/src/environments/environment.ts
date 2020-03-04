// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  name: 'dev',
  host: {
    backend: {
      th_lm_configuration: 'http://localhost:8081/api/',
      th_lm_login: 'http://localhost:8082/api/',
      th_lm_evaluation: 'http://localhost:8083/api',
      th_lm_projects_bank: 'http://localhost:8084/api'
    },
    frontend: {
      th_ng_configuration: 'http://localhost/configuration/',
      th_ng_login: 'http://localhost/auth/',
      th_ng_evaluation: 'http://localhost/evaluation/',
      th_ng_projects_bank: 'http://localhost/bank/'
    }
  }
};
