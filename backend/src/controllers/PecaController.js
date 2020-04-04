const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const pecas = await connection('pecas').select('*');

        return response.json(pecas);
    },

    async create(request, response) {
        const {
            codigo,
            nome,
            categoria,
            preco,
            quantidade,
            descricao,
            foto
        } = request.body;

        await connection('pecas').insert({
            codigo,
            nome,
            categoria,
            preco,
            quantidade,
            descricao,
            foto
        });
        
        return response.json({ codigo });
    },

    async delete(request, response) {
        const { codigo } = request.params;

        await connection('pecas').where('codigo', codigo).delete();

        return response.status(204).send();
    }
};