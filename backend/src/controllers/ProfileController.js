const connection = require('../database/connection');

module.exports = {

	/**
	 * Lista todos os incidentes de uma ONG
	 * 
	 * @param {*} request 
	 * @param {*} response 
	 */
	async index(request, response) {
		const ngo_id = request.headers.authorization;

		const incidents = await connection('incidents')
			.where('ngo_id', ngo_id)
			.select('*')
			.first();

		return response.json(incidents);
	}
};