
exports.up = function(knex) {
    return knex.schema.createTable('quotes', tbl => {
        tbl.increments();
        tbl.string('author', 50).notNullable();
        tbl.string('quote', 500).notNullable();
        tbl.integer('year');
        });
};

exports.down = function(knex) {
    return knex.schema.dropTable('quotes');
};
