[![Build Status](https://travis-ci.com/lumie31/EPIC-Mail.svg?branch=develop)](https://travis-ci.com/lumie31/EPIC-Mail)
[![Coverage Status](https://coveralls.io/repos/github/lumie31/EPIC-Mail/badge.svg?branch=develop)](https://coveralls.io/github/lumie31/EPIC-Mail?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/f735e739ebb04ca18923/maintainability)](https://codeclimate.com/github/lumie31/EPIC-Mail/maintainability)

# EPIC Mail
A web application that helps people exchange messages/information over the internet

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites
To successfully install and run this software on your local machine, you'll need the following:

- [Nodejs](https://www.nodejs.org/en) - JavaScript runtime built on Chrome's V8 JavaScript engine
- [Express](https://expressjs.com) - A web framework for [Nodejs](https://www.nodejs.org/en)
- [Babel](https://babeljs.io) - Javascript compiler
- [ESlint](https://www.eslint.org) - Javascript linter. [Airbnb](https://github.com/airbnb/javascript) style guide

### Installing
Step by step series instructions on how to get the development environment setup locally.
- Open the terminal
- cd into directory that you want the project to reside
```
cd projects
```
- Clone the repository into that directory
```
git clone https://github.com/lumie31/EPIC-Mail
```
```
Run npm install && npm run start:dev
```

## API Documentation
The full documentation for all API end point can be found [here](https://epic-mail-server.herokuapp.com/api-docs/)

## Running the tests
The application uses the following tools for testing:
- [Mocha](https://mochajs.org) - A JavaScript test framework 
- [Chai](https://www.chaijs.com/) - A BDD / TDD Assertion library
- [nyc](https://github.com/istanbuljs/nyc) - The Istanbul command line interface

Running unit tests
- In the terminal, `cd` into the cloned project file
- Run `npm test`. This runs tests and displays coverage data generated by [Istanbul's](https://istanbul.js.org/) nyc

## Contributing
I will happily accept your pull request if it:
- Has tests
- Does not break backward compatibility

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Author
Olumide Okedusi
