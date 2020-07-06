const Router = require('koa-router')
const router = new Router()
const controller = require('./../controllers/ExampleController')

// RUNS paramLoader function first on each request that includes the :id param in the url path
router.param('id', controller.paramLoader)

// HOME ROUTE
router.get('/', controller.home)

// QUERY PARAM
router.get('/animals', controller.queryParam)

// PATH PARAM
router.get('/animal/:id', controller.pathParam)


module.exports = router