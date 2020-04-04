
exports.up = function(knex) {
    return knex.schema.createTable('pecas', function (table) {
        table.string('codigo').primary();
        table.string('nome').notNullable();
        table.string('categoria');
        table.string('preco').notNullable();
        table.string('quantidade').notNullable();
        table.string('descricao');
        table.string('foto');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('pecas');
};
