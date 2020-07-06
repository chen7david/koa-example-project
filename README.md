# Koa-Example-Project
#### Introduction 
This is a guide that aims to help you to set up new Koa projects with ease. This is achieved by providing examples covering the most common use cases.

#### prerequisites
- nodejs should be installed globally on your computer (check this by running <code>npm -v</code>, if you get a version number back you're good to go.)
- nodemon installed either globally or locally (this is solely for convenience)


## SETTING UP A NODE PROJECT
<p>
Since Koa is used to build node applications, we should first have a look how to set up a node project. 
To set up a node project, complete the following steps:
- create a new folder (this will be our project folder)
- navigate into your folder with terminal (use the cd command on MAC)
- run <code>npm init -y</code>
</p>

## SERVER

Essential Server Packages:

- koa
- koa-router
- koa-bodyparser
- kcors
- config
- js-yaml

```bach
npm i koa koa-router koa-bodyparser kcors config js-yaml
```

### BOOTSTRAP APPLICATION FILE
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

```bach
├── config
|  └── default.yaml
├── package-lock.json
├── package.json
└── src
   ├── index.js
   └── routes
      ├── example.js
      └── index.js
```