# mes-mi-export-service

A serverless microservice responsible for passing the details of practical driving test results to internal DVSA systems for MI, such as the RSIS MI database.

# Prep
Checkout the private MES GitLab repo _oracle-instant-client_ into a top-level directory of the same name.

## Note
If trying to run service using `arm64` architecture and getting an issue with the node-oracledb client `npm install`, you need to have a version of node built with the `-x86_64` arch.

DES are using the [n](https://github.com/tj/n) package to manage our Node versions.

Add this to `.zshrc`
```
export N_PREFIX=$HOME/.n
export PATH=$N_PREFIX/bin:$PATH
```

To install a specific version of node on the old arch, we can use this command

`n --arch x64 <version>` e.g. `n --arch x64 16.10.0`

This then means this version of node is specifically build for the old arch until oracle offers `arm64` binaries.

## Dependencies

DVSA dependencies have been moved from npm to github so in order to install/update any private @DVSA packages
you are required to have an entry in your global `~/.npmrc` file as follows:

```shell
//npm.pkg.github.com/:_authToken=<your auth token here>
```
