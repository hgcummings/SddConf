# SDD Schedule App
Example app demonstrating how to structure and test a node.js app, from a talk at SDD Conf 2015

## Prerequisites
Node.js

## Running the tests
* Checkout the code
* ```npm install```
* ```grunt```

# Libraries/tools used:
* [Express](http://expressjs.com/) HTTP server
* [Request](https://github.com/request/request) HTTP client
* [Cheerio](http://cheeriojs.github.io/cheerio/) jQuery-like HTML traversal/manipulation outside of the browser
* [Grunt](http://gruntjs.com/) task runner
* [Mocha](http://mochajs.org/) test framework
* [sinon](http://sinonjs.org/) test doubles framework
* [chai](http://chaijs.com/) assertion library
* [Istanbul](https://github.com/gotwarlost/istanbul) code coverage tool

# Services used
* [Heroku](https://dashboard.heroku.com/) hosting and git-based deployment
* [Travis CI](https://travis-ci.org) build server
* [nexmo](https://www.nexmo.com/) SMS API

# Further example code
* [Promises and generators examples](https://gist.github.com/hgcummings/ffccddd0eeb0b671d919)
* [Hypermeter](https://github.com/hgcummings/hypermeter) command line tool as an NPM package, with thorough test coverage and extensive use of promises
* [RunRun Rabbit](https://github.com/hgcummings/runrun-rabbit) multiplayer network game with shared client/server side code and LiveReload workflow
