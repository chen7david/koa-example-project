# Koa-Example-Project
#### Introduction 
This is a guide that aims to help you to set up new Koa projects with ease. This is achieved by providing examples covering the most common use cases.

#### prerequisites
- nodejs should be installed globally on your computer (check this by running <code>npm -v</code>, if you get a version number back you're good to go.)
- nodemon should installed either globally or locally (this is solely for convenience)

## Getting Started

### Server

Essential server packages:

- koa
- koa-router
- koa-bodyparser
- kcors
- config
- js-yaml

#### Step by Step Walkthrough
1. create a new folder (this will be our project folder)
2. navigate into your folder with terminal (use the cd command on MAC)
3. run <code>npm init -y</code>
4. run <code>npm i koa koa-router koa-bodyparser kcors config js-yaml</code>
5. create the following folders and files in the same order as shown in the tree diagram displayed below

```bach
├── config
|  └── default.yaml
├── package-lock.json
├── package.json
└── src
   ├── controllers
   ├── index.js
   ├── middleware
   ├── models
   └── routes
```
6. In your package.json file replace the "test" line with <code>"dev":"nodemon ./src/index.js"</code> in the scripts section
7. Copy paste the following lines of code to your ./config/default.js file
```yaml
server:
   protocol: 'http'
   hostname: 'localhost'
   port: 3000
```
8. Copy paste the following lines of code to your ./src/index.js file

```js
const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const cors = require('kcors')
const { server } = require('config')
const url = require('url')
const app = new Koa()

/* MIDDLEWARE */
app.use(bodyparser())
app.use(cors())


/* ROUTES */


app.listen(server.port, () => {
    console.log(`running at ${url.format(server)}`)
})
```
9. In terminal run <code>npm run dev</code> (you should see "running at http://localhost:3000" printed in your console)
10. open a web-browser and navigate to "http://localhost:3000" (you should see a blank page with Not found. If you see this the server is working)

#### Step by Step Walkthrough the Code in ./src/index.js

In each line of code below we are using nodejs's <code>require</code> function to import a package and assign it to a named variable so that we can refer to it later in our code when we want to use it. 
```js
const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const cors = require('kcors')
const url = require('url')
```

Essential Database Packages:
- knex
- pg
- objection

```bach
npm i knex pg objection
```

