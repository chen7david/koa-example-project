
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