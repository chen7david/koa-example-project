const Model = require('./Model')

class ExampleModel extends Model {
    static get tableName(){
        return 'examples'
    }
}

module.exports = ExampleModel