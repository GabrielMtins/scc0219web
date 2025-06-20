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
	const { car, resetCar, addToCar, catalog } = useCar();

	useEffect(() => {
		if(user == null && car != []){
			resetCar();
		}
	}, [user]);

	useEffect(() => {
		if (!loading) {
			if (!user) navigate('/login');
    	}
  	}, [user, loading, navigate]);

	const items = Object.keys(car);

	return (
		<div className="page">
			<CarList car_list={items} />
		</div>
	);
}

export default Carrinho;
