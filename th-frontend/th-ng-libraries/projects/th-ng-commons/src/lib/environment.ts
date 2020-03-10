// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  name: 'dev',
  host: {
    backend: {
      th_lm_configuration: 'http://localhost:8081/api/',
      th_lm_login: 'http://localhost:8082/api/',
      th_lm_evaluation: 'http://localhost:8083/api/',
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
  // import 'zone.js/dist/zone-error';  // Included with Angular CLI.
