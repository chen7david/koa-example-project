# Koa-Example-Project
<strong>Introduction:</strong> This is a guide that aims to help you to set up new Koa projects with ease. This is achieved by providing examples covering the most common use cases.

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