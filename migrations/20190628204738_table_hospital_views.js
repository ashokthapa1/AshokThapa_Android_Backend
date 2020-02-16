
exports.up = function(knex,Promise) {
    return knex
    .schema
    .hasTable('view_hospital')
    .then(function (exists) {
        if (!exists) {
            return knex // **** udpate
                .schema
                .createTable('view_hospital', function (table) {
                    table.increments('id').primary()
                    table.string('hospitalId')
                    table.string('viewCount')
                })
                .then(console.log("Table view_hospital created."));
        }else{
            console.log("Table view_hospital already created!");
        }
    })
  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('view_hospital');
  
};
