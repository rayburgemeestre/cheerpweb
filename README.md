## Demo

https://cheerp.cppse.nl/

## Project

The project constists of three parts:

- The front-end (`./src` -> when compiled `./dist`) UI based on VueJS.
- The back-end API (`./docker_api`) uses a very simple Python Flask server, the back-end is deployed inside a docker container with the Cheerp compiler.
- The docker image for the front-end (`./docker_web`) that only hosts the statically build files.

And all of the above is deployed on Kubernetes, for this see the `./kube` directory.

There is no storage support, so saving or sharing code is not yet possible. Be careful with this!

## Build

For nodejs projects it can be difficult to setup a dev environment.
It's probably important you use a new nodejs version, at least one compatible the one used: `node-v10.12.0-linux-x64`.

    cd node-v10.12.0-linux-x64/bin
    export PATH=$PATH:$PWD

Please verify that it's working with:

    trigen@zenbook:~/projects/cheerpweb[master]> node -v
    v10.12.0
    trigen@zenbook:~/projects/cheerpweb[master]> npm -v
    6.4.1

Then use the `Makefile` when developing:

- `make dev` - build and start a hot swapping debug server (very convenient while developing)
- `make api_dev` - start the API server in a docker image running on port 5000.

One note on the above: also uncomment the line that uses `//localhost:5000/compile` instead of `https://cheerp.cppse.nl/api/compile` in `src/App.vue`.

Other useful directives:

- `make build` - build the release version (in `./dist`) of the UI (takes a while)
- `make docker_api` - build the container that hosts the Cheerp compiler + Python Flask API server.
- `make docker_web` - build the container that hosts the UI's static files.
- `make prepare` - wget the node version for this project, extract and install it to `/usr/local`.
- `make release` - there are a bunch of other Makefile directives, but better just use this one to do everything required for a release.

## Build status

[![Build Status](https://travis-ci.org/rayburgemeestre/cheerpweb.svg?branch=master)](https://travis-ci.org/rayburgemeestre/cheerpweb) [![MPL 2.0 License](https://img.shields.io/badge/license-MPL2.0-blue.svg)](http://veldstra.org/2016/12/09/you-should-choose-mpl2-for-your-opensource-project.html)

## Resources used for this project

Followed this readme for webpack:
https://webpack.js.org/guides/getting-started/

Followed this for bulma:
https://bulma.io/documentation/customize/with-webpack/

For vuejs:
https://itnext.io/vuejs-and-webpack-4-from-scratch-part-1-94c9c28a534a

For devserver:
https://itnext.io/vue-js-and-webpack-4-from-scratch-part-2-5038cc9deffb

Pass "reference" to child components
https://stackoverflow.com/questions/40915436/vuejs-update-parent-data-from-child-component
