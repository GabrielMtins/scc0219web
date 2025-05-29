import './CarList.css'
import {useCar} from '../contexts/CarContext';
import {useState, useEffect} from 'react';

function CarItem({id}) {
	const {car, addToCar, catalog, resetId} = useCar();

	let foundItem = catalog[id];
	let quantity = car[id];

	const addItem = () => {
		addToCar(id, 1);
	};

	const removeItem = () => {
		addToCar(id, -1);
	};

	const resetItem = () => {
		resetId(id);
	};

	useEffect(() => {
		foundItem = catalog[id];
		quantity = car[id];
	});

	return (
		<div class="carrinho-item">
			<div class="imagem">
				<img src={foundItem.img_link} alt="" / >
			</div>

			<div class="info">
				<h4 class="nome-livro"> {foundItem.title} </h4>

				<div class="preco-carrinho">
					<p class="preco-livro">R$ {foundItem.price}</p>

					<div class="contador">
						<button onClick={resetItem} className="mini_button"> Remover </button>
						<button onClick={removeItem} className="mini_button"> - </button>
						<span> {quantity} </span>
						<button onClick={addItem} className="mini_button"> + </button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CarItem;
