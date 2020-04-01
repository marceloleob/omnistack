import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import api from '../../services/api';

import './styles.css';
import logoImg from '../../assets/images/logo.svg';

export default function Profile() {
	const [incidents, setIncidents] = useState([]);
	// armazena o historico para fazer a navegacao
	const history = useHistory();
	// recupera o nome da ONG pelo historico do navegador
	const ngoId   = localStorage.getItem('ngoId');
	const ngoName = localStorage.getItem('ngoName');

	/**
	 * Recebe dois parametros:
	 *
	 * 1) Qual funcao que eu quero que seja executada - () => {}
	 * 2) Quando que a funcao vai ser executada       - []       - Se eu passar um "ngoName" por exemplo,
	 * 															   toda vez que o valor dessa variavel for alterado,
	 * 															   executa a funcao desejada.
	 */
	useEffect(() => {
		api.get('profile', {
			headers: {
				Authorization: ngoId,
			}
		}).then(response => {
			setIncidents(response.data);
		});
	}, [ngoId]);

	/**
	 * Posta para o backend um ID que sera deletado
	 *
	 * @param {*} id
	 */
	async function handleDeleteIncident(id) {
		try {
			// envia para o backend
			await api.delete(`incidents/${id}`, {
				headers: {
					Authorization: ngoId,
				}
			});

			// remove do frontend
			setIncidents(incidents.filter(incident => incident.id !== id));

		} catch (error) {
			alert('Erro ao deletar, tente novamente.');
		}
	}

	/**
	 * Logout da pagina
	 *
	 */
	function handleLogout() {
		// limpar tudo que esta no header do navegador
		localStorage.clear();
		// redireciona para a pagina de login
		history.push('/');
	}

	return (
		<div className="profile-container">
			<header>
				<img src={ logoImg } alt="Be The Hero" />
				<span>Bem vinda, { ngoName }</span>

				<Link to="/incidents/new" className="button">Cadastrar novo caso</Link>
				<button type="button" onClick={ handleLogout }>
					<FiPower size={18} color="#E02041" />
				</button>
			</header>

			<h1>Casos cadastrados</h1>

			<ul>
				{ incidents.map(incident => (
					<li key={ incident.id }>
						<strong>CASO:</strong>
						<p>{ incident.title }</p>

						<strong>DESCRIÇÃO:</strong>
						<p>{ incident.description }</p>

						<strong>VALOR:</strong>
						<p>{ Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value) }</p>

						<button type="button" onClick={() => handleDeleteIncident(incident.id) }>
							<FiTrash2 size={20} color="#a8a8b3" />
						</button>
					</li>
				)) }

			</ul>
		</div>
	);
}