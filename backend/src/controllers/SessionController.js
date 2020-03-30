const connection = require('../database/connection');

module.exports = {

	/**
	 * Executa o login de uma ONG
	 * 
	 * @param {*} request 
	 * @param {*} response 
	 */
	async create(request, response) {
		const { id } = request.body;

		const ngo = await connection('ngos')
			.where('id', id)
			.select('name')
			.first();

		if (ngo == undefined) {
			return response.status(400).json({
				error: 'Nenhuma ONG encontrada com este ID.'
			});
		}

		return response.json({ ngo });
	}
}