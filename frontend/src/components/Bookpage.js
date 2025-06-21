import './Bookpage.css';

import { useCar } from '../contexts/CarContext';
import { ToastContainer, toast } from 'react-toastify';
import { useLogin } from '../contexts/LoginContext';
import { useNavigate } from 'react-router-dom';

function Bookpage({ book }) {
	const { car, addToCar, setCurrentBook } = useCar();
	const { user } = useLogin();

	const navigate = useNavigate();

	const clicked = async () => {
		if(user == null){
			navigate('/login');
			toast.error('Faça login para adicionar compras ao carrinho');
			return;
		}

		const success = await addToCar(book.id, 1);

		if (success) {
			toast.success('Adicionado item ao carrinho');
		}
	};

	return (
		<div className="bookpage-card">
			<img src={book.img_link} alt={book.title} />

			<div className="bookpage-info">
				<h3> {book.title} </h3>
				<p className="autor"> {book.author} </p>
				<p className="preco"> R$ {book.price} </p>
				<p className="preco"> Estoque: {book.amount} </p>

				<p className="description"> {book.description} </p>
			
				<div className="bookpage-button-container">
					<button className="bookpage-button" onClick={clicked}> Comprar </button>
				</div>
			</div>
		</div>
	);
}

export default Bookpage;
