const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {

	/**
	 * Lista todas as ONGs
	 * 
	 * @param {*} request 
	 * @param {*} response 
	 */
	async index(request, response) {
		const ngos = await connection('ngos').select('*');

		return response.json(ngos);
	},

	/**
	 * Cria uma nova ONG 
	 * 
	 * @param {*} request 
	 * @param {*} response 
	 */
	async create(request, response) {
		const {
			name,
			email,
			whatsapp,
			state,
			city
		} = request.body;

		const id = crypto.randomBytes(4).toString('HEX');

		await connection('ngos').insert({
			id,
			name,
			email,
			whatsapp,
			state,
			city,
		});

		return response.json({ id });
	}
}