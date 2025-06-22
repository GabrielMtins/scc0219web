import '../palette.css'
import './CarList.css'
import CarItem from '../components/CarItem'
import { useCar } from '../contexts/CarContext';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CarList({ car_list }) {
	const { car, catalog, getItemCatalog } = useCar();
	const navigate = useNavigate();

	let price = 0;
	let filtered_car_list = [];

	/* Função de calcular os preços */
	const updatePrice = () => {
		/* Mapeia os ids para o cálculo de preço */
		const price_list = car_list.map(
			(id) => (getItemCatalog(id).price * car[id])
		);

		if (price_list.length == 0) {
			price = 0;
		}
		else {
			price = price_list.reduce((acc, other) => (parseFloat(acc) + parseFloat(other))).toFixed(2);
		}

		filtered_car_list = car_list.filter((id) => (car[id] > 0));
	};

	const displayItems = () => {
		if (filtered_car_list.length == 0) {
			return (<p> Carrinho vazio: adicione itens no carrinho para comprar. </p>);
		}
		else {
			return filtered_car_list.map((id) => <CarItem id={id} />);
		}
	}

	const onPay = () => {
		if(price != 0){
			navigate('/checkout');
		}
		else{
			toast.error('Insira um item no carrinho para realizar a compra');
		}
	}

	updatePrice();

	useEffect(() => {
		updatePrice();
	});

	return (
		<div className="carrinho-container">
			<div className="carrinho">
				<div className="cabecalho-carrinho">
					<Link to="/catalogo"> <button> &larr; </button> </Link>

					<h3>Meu carrinho</h3>
				</div>

				{displayItems()}

				<button className="pagar" onClick={onPay}>Pagar R$ {price}</button>
			</div>
		</div>
	);
}

export default CarList;
