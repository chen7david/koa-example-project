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

    queryParams: async (ctx, next) => {
        const queryParams = ctx.request.query
        ctx.body = {
            msg: 'Query Params are below.',
            queryParams
        }
    },

    pathParams: async (ctx, next) => {
        const pathParams = ctx.params
        ctx.body = {
            msg: 'Path Params are below.',
            pathParams
        }
    },

    bodyParams: async (ctx, next) => {
        const bodyParams = ctx.request.body
        ctx.body = {
            msg: 'Path Params are below.',
            bodyParams
        }
    },
}
```

## Connecting to Database 

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
## Serving Files

### Serving Static Files
Sometimes you might need to host some images or vidoes on your server. This is easilly achievable by adding Koa static middleware to you application. Follow the steps below to server static files.

Essential Package:
- koa-static

```bash
npm i koa-static
```
1. run <code>npm i koa-static</code> 
2. create a new folder called "public" in your src folder. 
3. require koa-static package in your "src/index.js" file and add it as middleware. your file should now look like this:


```js
const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const cors = require('kcors')
const { server } = require('config')
const router = require('./routes')
const serve = require('koa-static') // NEW LINE ADDED
const url = require('url')
const app = new Koa()

/* MIDDLEWARE */
app.use(cors())
app.use(bodyparser())
app.use(serve(__dirname + './../public')) // NEW LINE ADDED


/* ROUTES */
app.use(router.example.routes())

app.listen(server.port, () => {
    console.log(`running at ${url.format(server)}`)
})
```


### Uploading Files
This section shows an example of how to add upload functionality to your Koa application.


## Adding Sockets 
This section we will shows an example of how to add realtime functionality to your Koa application.


## Adding Cargo-io 
This allows us to send uniform notifications to our clients.

##### Adding Cargo to your app
```js
const Koa = require('koa')
const app = new Koa()
const { cargo } = require('koatools')

app.use(cargo())
```

##### Using Cargo in your controllers
```js
create: async (ctx, next) => {
    cargo.setPayload(user)
    cargo.directive('confirm-email')
    ctx.body = ctx.cargo.setDetail('created', 'user')
    ctx.body = ctx.cargo.loadDetails(type, { label, limit, ref }, key)
    ctx.body = ctx.cargo.loadDetails('duplicate', key, key)
    ctx.cargo.persistDetail()
},
```

##### JWT With PEM 

```js
// src/utils/keys.js

const fs = require('fs')
const p = require('path')
const pripath = p.resolve(__dirname, '../../', 'config', 'private.pem')
const { accexp, refexp, passphrase } = require('config').security
const pubpath = p.resolve(__dirname, '../../', 'config', 'public.pem')
const _prikey = fs.readFileSync(pripath, 'utf8')
const pubkey = fs.readFileSync(pubpath, 'utf8')
const accsign = { expiresIn: accexp, algorithm: 'RS256' }
const refsign = { expiresIn: refexp, algorithm: 'RS256' }
const versign = { algorithms: ['RS256'] }
const prikey = { key: _prikey, passphrase }

module.exports = {
    prikey,
    pubkey,
    accsign,
    refsign,
    versign
}

// in your project
const jwt = require('jsonwebtoken')

const token = jwt.sign({userId: 22342342}, prikey, accsign)
const verify = jwt.verify(token, pubkey, versign)
```

##### Default Fields 
```js
/*  */
cosnt fields = {
    unknown: (code) => `unknown error, something went wrong - ER${code}`,  
    undefinded: (noun) =>`${noun} is not definded`,
    invalid: (noun) =>`invalid ${noun}!`,
    incorrect: (noun) =>`incorrect ${noun}!`,
    incomplete: (noun) =>`incomplete ${noun}!`,
    completed: (noun) =>`completed ${noun}!`,
    expired: (noun) =>`expired ${noun}!`,
    forbidden: (noun) =>`forbidden ${noun}!`,
    duplicate: (noun) => `${noun} is already in use!`, 
    required: (noun) =>`${noun} required!`,
    login: (noun) =>`welcome back ${noun}!`,
    logout: (noun) =>`goodbye ${noun}, hope to see you again soon!`,
    verified: (noun) =>`${noun} verification complete!`,
    verification_required: (noun) =>`${noun} verification incomplete!`,
    suspended: (noun) =>`${noun} suspended!`,
    disabled: (noun) =>`${noun} disabled`,
    missing: (noun) =>`${noun} missing`,
    confirmed: (noun) =>`${noun} confirmed`,
    confirmation_email: (noun) => `a confirmation email was sent to ${noun}, please follow the instructions to confirm your email.`,
    password_recovery_email: (noun) => `a password recovery email was sent to ${noun}, please follow the instructions to revocer your password.`,
    confirmation_required: (noun) =>`${noun} confirmation required`,
    already_confirmed: (noun) =>`${noun} already confirmed`,
    authorized_login: (noun) =>`successfully authorized ${noun}!`,
    custom: (noun) =>`${noun}`,

    /* CRUD */ 

    created: (noun) =>`successfully created new ${noun}!`,
    create_failed: (noun) =>`faild to create new ${noun}!`,
    updated: (noun) =>`successfully updated ${noun}!`,
    update_faild: (noun) =>`faild to update ${noun}!`,
    deleted: (noun) =>`successfully deleted ${noun}!`,
    delete_faild: (noun) =>`faild to delete ${noun}!`,
    authorized: (noun) =>`successfully authorized ${noun}!`,

    /* JOI */ 
    
    'any.required': ({label}) => `${label} is required`, 
    'string.empty': ({label}) => `${label} is not allowed to be empty`, 
    'string.base': ({label}) => `${label} must be a string`,
    'object.base': ({label}) => `${label} must be an object`, 
    'object.empty': ({label}) => `${label} is not allowed to be empty`, 
    'boolean.base': ({label}) => `${label} must be a boolean`, 
    'boolean.empty': ({label}) => `${label} is not allowed to be empty`, 
    'number.base': ({label}) => `${label} must be a number`, 
    'number.empty': ({label}) => `${label} is not allowed to be empty`, 
    'array.base': ({label}) => `${label} must be an array`, 
    'number.integer': ({label}) => `${label} must be an integer`, 
    'string.email': ({label}) => `${label} must be a valid email`, 
    'string.min': ({label, limit}) => `${label} length must be at least ${limit} characters long`, 
    'string.max': ({label, limit}) => `${label} length must be less than or equal to ${limit} characters long`, 
    'string.length': ({label, limit}) => `${label} length must be exactly equal to ${limit} characters long`, 
    'any.only': ({label, ref}) => `${label} and ${ref} must match`, 
}
```