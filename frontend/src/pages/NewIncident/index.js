import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';

import './styles.css';
import logoImg from '../../assets/images/logo.svg';

export default function NewIncident() {
	// recupera os valores do post
	const [title, setTitle]             = useState('');
	const [description, setDescription] = useState('');
	const [value, setValue]             = useState('');

	// armazena o historico para fazer a navegacao
	const history = useHistory();
	// recupera o nome da ONG pelo historico do navegador
	const ngoId   = localStorage.getItem('ngoId');

	/**
	 * Envia os parametros para o backend
	 *
	 * @param {*} e
	 */
	async function handleNewIncident(e) {
		// impede que o submit recarregue a pagina
		e.preventDefault();
		// monta um "array" com os valores do post
		const data = {
			title,
			description,
			value,
		};

		try {
			// envia os dados do formulario para o backend obedecendo o arquivo "routes.js" do backend
			await api.post('incidents', data, {
				headers: {
					Authorization: ngoId,
				}
			});
			// encaminha o usuario para a home
			history.push('/profile');

		} catch (error) {
			// resposta para o usuario
			alert('Erro no cadastro, por favor tente novamente.');
		}
	}

	return (
		<div className="new-incident-container">
			<div className="content">
				<section>
					<img src={ logoImg } alt="Be The Hero" />

					<h1>Cadastrar novo caso</h1>
					<p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

					<Link to="/profile" className="back-link">
						<FiArrowLeft size={16} color="#E02041" />
						Voltar
					</Link>
				</section>

				<form onSubmit={ handleNewIncident }>
					<input type="text" value={ title } onChange={ e => setTitle(e.target.value) } placeholder="Título do caso" />
					<textarea value={ description } onChange={ e => setDescription(e.target.value) } placeholder="Descrição" />
					<input type="text" value={ value } onChange={ e => setValue(e.target.value) } placeholder="Valor" />

					<button type="submit" className="button">Cadastrar</button>
				</form>
			</div>
		</div>
	);
}