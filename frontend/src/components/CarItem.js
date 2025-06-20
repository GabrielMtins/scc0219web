import './CarList.css'
import '../palette.css'
import { useCar } from '../contexts/CarContext';
import { useState, useEffect } from 'react';

function CarItem({ id }) {
	const { car, addToCar, catalog, resetId, getItemCatalog } = useCar();

	//let foundItem = catalog.find((book) => (book.id === id));
	let foundItem = getItemCatalog(id);
	//let foundItem = catalog[id];
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
		foundItem = getItemCatalog(id);
		//foundItem = catalog[id];
		quantity = car[id];
	}, [id]);

	return (
		<div className="carrinho-item">
			<div className="imagem">
				<img src={foundItem.img_link} alt="" />
			</div>

			<div className="info">
				<div className="nome-livro"> <h4> {foundItem.title} </h4> </div>

				<div className="preco-carrinho">
					<div className="preco-livro"> <p> R$ {foundItem.price} </p> </div>

					<div className="contador">
						<button onClick={resetItem} className="mini_button"> Remover </button>
						<button onClick={removeItem} className="mini_button"> - </button>
						<span> {quantity} / {foundItem.amount} </span>
						<button onClick={addItem} className="mini_button"> + </button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CarItem;
