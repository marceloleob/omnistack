const connection = require('../database/connection');

module.exports = {
	/**
	 * Lista todas os Incidentes
	 * 
	 * @param {*} request 
	 * @param {*} response 
	 */
	async index(request, response) {
		const limitPage = 5;

		const { page = 1 } = request.query;

		// recupera o total de registros
		const [count] = await connection('incidents').count();
		const total = count['count(*)'];
		// calcula o total de paginas
		const pages = Math.abs(Math.floor(total / limitPage) + (((limitPage / total) > 0) ? 1 : 0));

		const incidents = await connection('incidents')
			.join('ngos', 'ngos.id', '=', 'incidents.ngo_id')
			.limit(limitPage)
			.offset((page - 1) * 5)
			.select([
				'incidents.*', 
				'ngos.name', 
				'ngos.email',
				'ngos.whatsapp',
				'ngos.state',
				'ngos.city'
			]);

		// envia para o cabecalho da pagina de reposta
		response.header('X-Total-Count', total);
		response.header('X-Total-Pages', pages);

		return response.json(incidents);
	},

	/**
	 * Cria um novo Incidente 
	 * 
	 * @param {*} request 
	 * @param {*} response 
	 */
	async create(request, response) {
		const {
			title,
			description,
			value
		} = request.body;

		const ngo_id = request.headers.authorization;

		const [id] = await connection('incidents').insert({
			title,
			description,
			value,
			ngo_id,
		});

		return response.json({ id });
	},

	/**
	 * Exclui um Incidente
	 * 
	 * @param {*} request 
	 * @param {*} response 
	 */
	async delete(request, response) {
		const { id } = request.params;

		const ngo_id = request.headers.authorization;

		const incident = await connection('incidents')
			.where('id', id)
			.select('ngo_id')
			.first();

		if (incident == undefined) {
			return response.status(401).json({
				error: 'Esta ONG já foi excluída.'
			});
		}

		if (incident.ngo_id != ngo_id) {
			return response.status(401).json({
				error: 'Operação não é permitida.'
			});
		}

		await connection('incidents').where('id', id).delete();
		
		return response.status(204).send();
	}
};