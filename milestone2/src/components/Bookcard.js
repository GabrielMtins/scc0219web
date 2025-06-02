import './Bookcard.css';

import { useCar } from '../contexts/CarContext';
import { ToastContainer, toast } from 'react-toastify';
import { useLogin } from '../contexts/LoginContext';
import { useNavigate } from 'react-router-dom';

function Bookcard({ book }) {
	const { car, addToCar } = useCar();
	const { user } = useLogin();

	const navigate = useNavigate();

	const clicked = () => {
		if(user == null){
			navigate('/login');
			toast.error('Faça login para adicionar compras ao carrinho');
			return;
		}

		const success = addToCar(book.id, 1);

		if (success) {
			toast.success('Adicionado item ao carrinho');
		}
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
