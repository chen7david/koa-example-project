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
- [x] create a new folder (this will be our project folder)
- [x] navigate into your folder with terminal (use the cd command on MAC)
- [x] run <code>npm init -y</code>
- [x] run <code>npm i koa koa-router koa-bodyparser kcors config js-yaml</code>
1. create the following folders and files in the same order as shown in the tree diagram below.

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
1. Copy paste the following lines of code to your ./src/index.js file

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

Essential Database Packages:
- knex
- pg
- objection

```bach
npm i knex pg objection
```

