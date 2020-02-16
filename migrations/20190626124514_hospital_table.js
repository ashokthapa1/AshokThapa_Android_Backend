
exports.up = function(knex, Promise) {
    return knex
    .schema
    .hasTable('hospital')
    .then(function (exists) {
        if (!exists) {
            return knex // **** udpate
                .schema
                .createTable('hospital', function (table) {
                    table.increments('id').primary()
                    table.string('name')
                    table.string('address')
                    table.string('rating')
                    table.string('phone')
                    table.string('diseases')
                    table.string('doctors')
                    table.string('nears')
                })
                .then(console.log("Table hospital created."));
        }else{
            console.log("Table hospital already created!");
        }
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('hospital');
};
