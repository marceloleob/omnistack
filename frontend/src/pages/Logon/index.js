import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import api from '../../services/api';

import './styles.css';
import logoImg from '../../assets/images/logo.svg';
import heroesImg from '../../assets/images/heroes.png';

export default function Logon() {
	// manipula o estado da variavel, armazena o valor (iniciando vazio)
	const [id, setId] = useState('');

	// armazena o historico para fazer a navegacao
	const history = useHistory();

	/**
	 * Envia os parametros para o backend
	 *
	 * @param {*} e
	 */
	async function handleLogin(e) {
		// impede que o submit recarregue a pagina
		e.preventDefault();

		try {
			// envia os dados do formulario para o backend obedecendo o arquivo "routes.js" do backend
			const response = await api.post('sessions', { id });
			// salva o retorno no navegador
			localStorage.setItem('ngoId', id);
			localStorage.setItem('ngoName', response.data.ngo.name);

			// encaminha o usuario para a area logada
			history.push('/profile');

		} catch (error) {
			// resposta para o usuario
			alert('Este ID não existe.');
		}
	}
	return (
		<div className="logon-container">
			<section className="form">
				<img src={ logoImg } alt="Be The Hero" />

				<form onSubmit={ handleLogin }>
					<h1>Área administrativa</h1>

					<input type="text" value={ id } onChange={ e => setId(e.target.value) } placeholder="Seu ID" />
					<button type="submit" className="button">Entrar</button>

					<Link to="/register" className="back-link">
						<FiLogIn size={16} color="#E02041" />
						Não tenho cadastro
					</Link>
				</form>
			</section>

			<img src={ heroesImg } alt="Heroes" />
		</div>
	);
}