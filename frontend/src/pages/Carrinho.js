import '../palette.css';
import './Home.css';
import Bookcard from '../components/Bookcard.js';
import Booklist from '../components/Booklist.js';

import { useNavigate } from 'react-router-dom';
import { useCar } from '../contexts/CarContext';
import { useLogin } from '../contexts/LoginContext';

import CarList from '../components/CarList'
import { useState, useEffect } from 'react';

function Carrinho() {
	const { user, loading } = useLogin();
	const navigate = useNavigate();
	const { car, resetCar, addToCar, catalog, getItemCatalog, resetIdAmount } = useCar();

	useEffect(() => {
		if(user == null && car != []){
			resetCar();
		}
	}, [user]);

	/* Se o usuário for nulo, retorna para a página de login */
	useEffect(() => {
		if (!loading) {
			if (!user) navigate('/login');
    	}
  	}, [user, loading, navigate]);

	/* Fazer a verificação dos dados. Por exemplo, o usuário pode ter posto
	 * dois livros no carrinho, mas o administrador retirou um dos livros. 
	 * Nesse caso, resetamos automaticamente para a quantidade máxima */
	useEffect(() => {
		const updateData = async () => {
			if(user){
				Object.keys(car).forEach(async (id) => {
					const car_item = getItemCatalog(id);

					if(car[id] > car_item.amount){
						await resetIdAmount(id, car_item.amount);
					}
				});
			}
		};

		updateData();
	});

	const items = Object.keys(car);

	return (
		<div className="page">
			<CarList car_list={items} />
		</div>
	);
}

export default Carrinho;
