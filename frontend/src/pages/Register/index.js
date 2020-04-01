import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';

import './styles.css';
import logoImg from '../../assets/images/logo.svg';

export default function Register() {
	// recupera os valores do post
	const [name, setName]         = useState('');
	const [email, setEmail]       = useState('');
	const [whatsapp, setWhatsapp] = useState('');
	const [city, setCity]         = useState('');
	const [state, setState]       = useState('');

	// armazena o historico para fazer a navegacao
	const history = useHistory();

	/**
	 * Envia os parametros para o backend
	 *
	 * @param {*} e
	 */
	async function handleRegister(e) {
		// impede que o submit recarregue a pagina
		e.preventDefault();
		// monta um "array" com os valores do post
		const data = {
			name,
			email,
			whatsapp,
			city,
			state,
		};

		try {
			// envia os dados do formulario para o backend obedecendo o arquivo "routes.js" do backend
			const response = await api.post('ngos', data);
			// resposta para o usuario
			alert(`Seu ID de acesso é: ${response.data.id}`);
			// encaminha o usuario para a home
			history.push('/');

		} catch (error) {
			// resposta para o usuario
			alert('Erro no cadastro, por favor tente novamente.');
		}
	}

	return (
		<div className="register-container">
			<div className="content">
				<section>
					<img src={ logoImg } alt="Be The Hero" />

					<h1>Cadastro</h1>
					<p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

					<Link to="/" className="back-link">
						<FiArrowLeft size={16} color="#E02041" />
						Voltar
					</Link>
				</section>

				<form onSubmit={ handleRegister }>
					<input type="text" value={ name } onChange={ e => setName(e.target.value) } placeholder="Nome da ONG" />
					<input type="email" value={ email } onChange={ e => setEmail(e.target.value) } placeholder="E-mail" />
					<input type="text" value={ whatsapp } onChange={ e => setWhatsapp(e.target.value) } placeholder="WhatsApp" />
					<div className="input-group">
						<input type="text" value={ city } onChange={ e => setCity(e.target.value) } placeholder="Cidade" />
						<input type="text" value={ state } onChange={ e => setState(e.target.value) } placeholder="UF" style={{ width: 80 }} />
					</div>

					<button type="submit" className="button">Cadastrar</button>
				</form>
			</div>
		</div>
	);
}
