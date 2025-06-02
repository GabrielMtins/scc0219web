import '../palette.css';
import './Home.css';
import Bookcard from '../components/Bookcard.js';
import Booklist from '../components/Booklist.js';

import { useCar } from '../contexts/CarContext';

import CarList from '../components/CarList'

function Carrinho() {
	const { car, addToCar, catalog } = useCar();
	const items = Object.keys(car);

	return (
		<div className="page">
			<CarList car_list={items} />
		</div>
	);
}

export default Carrinho;
