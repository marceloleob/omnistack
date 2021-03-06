import React, { useState, useEffect } from "react";
import { Feather } from '@expo/vector-icons'
import { useNavigation } from "@react-navigation/native";
import { View, FlatList, Image, Text, TouchableOpacity } from "react-native";
import api from '../../services/api';

import logoImg from '../../assets/logo.png';
import styles from './styles';

export default function Incidents() {
	const [incidents, setIncidents] = useState([]);
	const [total, setTotal]         = useState(0);
	const [page, setPage]           = useState(1);
	const [loading, setLoading]     = useState(false);
	const navigation                = useNavigation();

	function navigateToDetail(incident) {
		navigation.navigate('Detail', { incident });
	}

	async function loadIncidents(params) {
		// verificar se o loading esta setado
		if (loading) {
			// evitar que mais de uma requisicao de loading seja feita ao mesmo tempo
			return;
		}
		// impede buscar mais informacoes no momento em que tudo ja carregou
		if (total > 0 && incidents.length === total) {
			// nao buscar mais informacoes
			return;
		}

		setLoading(true);

		const response = await api.get('incidents', {
			params: { page } // passa a pagina para o backend
		});

		/**
		 * Ao carregar as paginas, com a sintaxe "..." ele ANEXA a pagina
		 * anterior com a proxima igual o carregamento infinito do facebook
		 * Forma correta de anexar dois vetores dentro do REACT
		 */
		setIncidents([...incidents, ...response.data]);
		setTotal(response.headers['x-total-count']);
		setPage(page + 1);
		setLoading(false);
	}

	useEffect(() => {
		loadIncidents();
	}, []);

	return (
		<View style={ styles.container }>
			<View style={ styles.header }>
				<Image source={ logoImg } />
				<Text style={ styles.headerText }>
					Total de <Text style={ styles.headerTextBold }>{ total } casos</Text>
				</Text>
			</View>

			<Text style={ styles.title }>Bem-vindo!</Text>
			<Text style={ styles.description }>Escolha um dos casos abaixo e salve o dia.</Text>

			<FlatList
				data={incidents}
				style={ styles.incidentList }
				keyExtractor={ incident => String(incident.id) }
				// showsVerticalScrollIndicator={false}
				onEndReached={ loadIncidents }
				onEndReachedThreshold={ 0.2 } // carrega novos itens quando o usuario estiver a 20% do final da lista
				renderItem={({ item: incident }) => (
					<View style={ styles.incidentBox }>
						<Text style={ styles.incidentProperty }>ONG:</Text>
						<Text style={ styles.incidentValue }>{ incident.name }</Text>

						<Text style={ styles.incidentProperty }>CASO:</Text>
						<Text style={ styles.incidentValue }>{ incident.title }</Text>

						<Text style={ styles.incidentProperty }>VALOR:</Text>
						<Text style={ styles.incidentValue }>{ Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value) }</Text>

						<TouchableOpacity style={ styles.detailsButton } onPress={ () => navigateToDetail(incident) }>
							<Text style={ styles.detailsButtonText }>Ver mais detalhes</Text>
							<Feather name="arrow-right" size={16} color="#E02041" />
						</TouchableOpacity>
					</View>
				)}
			/>

		</View>
	);
}