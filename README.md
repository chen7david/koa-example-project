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
   |  └── ExampleController.js
   ├── index.js
   ├── middleware
   ├── models
   └── routes
      ├── example.js
      └── index.js
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
10. open a web-browser and navigate to "http://localhost:3000" (you should see a blank page displaying the phrase "Not Found". If you see this the server is working)

#### Step by Step Walkthrough the Code in ./src/index.js

In each line of code below we are using nodejs's <code>require</code> function to import a package and assign its returned value to a named variable so that we can refer to it later in our code when we want to use it. 
```js
const Koa = require('koa')
const bodyparser = require('koa-bodyparser') // parses the request object 
const cors = require('kcors') // makes cross origin request possible
const url = require('url') // is used to format url objects
```

The <code>app.use()</code> function takes middleware as an argument. Here we can place routes or other kinds of mutations and checks that will run on each request. In the example below 
```js
app.use(someMiddleware())
```

### Routes
So far our Koa application responds "Not Found" to any request that is send to it. Adding a router will help us respond to specific requests. The code below will show you how to add a router to your koa application. 

```js
// src/routes/example 

const Router = require('koa-router')
const router = new Router()
const controller = require('./controllers/ExampleController.js')

/* ROUTE DEFINITIONS */

// RUNS paramLoader function first on each request that includes the :id param in the url path
router.param('id', controller.paramLoader)

// HOME ROUTE
router.get('/', controller.home)

// QUERY PARAM
router.get('/animals', controller.queryParam)

// PATH PARAM
router.get('/animal/:id', controller.pathParam)

module.exports = router
```

### Controllers
Controllers provide all the logic and functionality of your app. They are responsible for returing a result to the client.

```js
// src/controllers/ExampleController.js

module.exports = {

    home: async (ctx, next) => {
        ctx.body = 'Welcome to our Home Page'
    },

    paramLoader: async (id, ctx, next) => {
        console.log({id})
        return next()
    },

    queryParam: async (ctx, next) => {
        const queryParams = ctx.request.query
        ctx.body = {
            msg: 'Query Params are below.',
            queryParams
        }
    },

    pathParam: async (ctx, next) => {
        const pathParams = ctx.params
        ctx.body = {
            msg: 'Path Params are below.',
            pathParams
        }
    },
}
```

### Addning a Database

Essential Database Packages:
- knex
- pg
- objection

```bach
npm i knex pg objection
```
#### Connecting Knex to Database
Almost any project will require some form of storage. In this section we will add a postgreSQL database to our Koa application. This will help us to store application related information. The follow the steps below to setup the db connection.

1. copy paste the code below into your ./config/default.js file

```yaml
database:
    client: postgresql
    connection:
        database: some-database-name
        host: '192.168.50.251'
        port: 3001
        user: db-username
        password: db-password
    migrations:
        tableName: knex_migrations
        directory: ./src/models/migrations
    pool:
        min: 2
        max: 10
```
2. run <code>npm i knex pg objection</code> 
3. run <code>knex init</code> (this will create a knex configuration file in your root directory)
4. in your knexfile.js add this line of code at the top <code>const { database } = require('config')</code>
5. set development to database, now your knexfile should look like the code below:
```js
const { database } = require('config')

module.exports = {

  development: database,

}
```

#### Connecting Objection to Knex
Now we will use an Object relational Mapper(ORM) called objection js to wrap knexjs. Follow the steps below to set it up.
1. create a Model.js file in your src/models folder
2. copy paste the code below into your Models.js file
```js
const { Model } = require('objection')
const knexfile = require('./../../knexfile')
const Knex = require('knex')(knexfile)
Model.Knex(Knex)

class BaseModel extends Model {

}

module.exports = BaseModel
``` 
3. you can now inherit from the BaseModel class like so in the example below:
```js
const Model = require('./Model')

class ExampleModel extends Model {
    static get tableName(){
        return 'examples'
    }
}

module.exports = ExampleModel
```

#### Using Models in Your Controllers
```js
const { ExampleModel } = require('./../models')

module.exports = {

    dbExample: async (ctx, next) => {
        // retrurn all examples in DB
        const example = await ExampleModel.query()
        ctx.body = example
    },
}
```