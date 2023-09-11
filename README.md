# mes-mi-export-service

A serverless microservice responsible for passing the details of practical driving test results to internal DVSA systems for MI, such as the RSIS MI database.

## Dependencies

DVSA dependencies have been moved from npm to github so in order to install/update any private @DVSA packages
you are required to have an entry in your global `~/.npmrc` file as follows:

```shell
//npm.pkg.github.com/:_authToken=<your auth token here>
```
