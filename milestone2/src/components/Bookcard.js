import './Bookcard.css';

import {useCar} from '../contexts/CarContext';
import { ToastContainer, toast } from 'react-toastify';

function Bookcard({book}) {
	const {car, addToCar} = useCar();

	const clicked = () => {
		addToCar(book.id, 1);
		toast.success('Adicionado item ao carrinho');
	};

	return (
		<div className="livro-card">
			<img src={book.img_link} alt={book.title} />

			<div className="livro-info">
				<h3> {book.title} </h3>
				<p className="autor"> {book.author} </p>
				<p className="preco"> R$ {book.price} </p>
				<button className="btn-comprar" onClick={clicked}> Comprar </button>
			</div>
		</div>
	);
}

export default Bookcard;
