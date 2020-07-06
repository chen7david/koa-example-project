const { Model } = require('objection')
const knexfile = require('./../../knexfile')
const Knex = require('knex')(knexfile)
Model.Knex(Knex)

class BaseModel extends Model {

}

module.exports = BaseModel