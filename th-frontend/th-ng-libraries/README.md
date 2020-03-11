# Th-ng-libraries

Angular project that will be the workspace for the npm packages development.

## Requirements
* Node JS and Npm installed
* Angular cli installed
* Set the [npm credentials](https://docs.npmjs.com/logging-in-to-an-npm-enterprise-registry-from-the-command-line) up 

## Publish a new version

For version publishing you have to increase the package version manually inside the package.json project file.
![increase version](/docs/img/increaseversion.png)

Then, inside this folder and using angular-cli you have to build the package:
```
$ ng build th-ng-commons
```
After the project build cd to the dist folder and inside it run npm publish
```
$ cd dist/th-ng-commons
$ npm publish
```
When publishing is finished you are able to use the lastest version in the different angular projects.

If you are under develop and testing you can (after library build) copy the content of dist/th-ng-commons to node_modules project.

If you are in windows you can call in power shell:
```
.\copy-dist-to-all.bat
```
