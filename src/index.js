const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const cors = require('kcors')
const { server } = require('config')
const router = require('./routes')
const url = require('url')
const app = new Koa()

/* MIDDLEWARE */
app.use(bodyparser())
app.use(cors())


/* ROUTES */
app.use(router.example.routes())

app.listen(server.port, () => {
    console.log(`running at ${url.format(server)}`)
})