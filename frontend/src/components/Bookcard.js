import './Bookcard.css';

import { useCar } from '../contexts/CarContext';
import { ToastContainer, toast } from 'react-toastify';
import { useLogin } from '../contexts/LoginContext';
import { useNavigate } from 'react-router-dom';

function Bookcard({ book }) {
	/* Pegar as funções adequadas de contexto */
	const { car, addToCar, setCurrentBook } = useCar();
	const { user } = useLogin();

	const navigate = useNavigate();

	/* Função para ser chamada quando o botão for clicado */
	const clicked = () => {
		/* Verifica se o usuário está logado, se não tiver,
		 * emitir mensagem de erro */
		if(user == null){
			navigate('/login');
			toast.error('Faça login para adicionar compras ao carrinho');
			return;
		}

		/* A função addToCar indica se foi possível adicionar item ou não
		 * (se ainda há elementos no estoque) */
		const success = addToCar(book.id, 1);

		if (success) {
			toast.success('Adicionado item ao carrinho');
		}
	};

	/* Caso seja clicado na imagem, definir o id do livro e navegar para
	 * a página de produto. */
	const goto_productpage = () => {
		setCurrentBook(book.id);
		navigate('/productpage');
	};

	return (
		<div className="livro-card">
			<img src={book.img_link} alt={book.title} onClick={goto_productpage} />

			<div className="livro-info">
				<h3> {book.title} </h3>
				<p className="autor"> {book.author} </p>
				<p className="preco"> R$ {book.price} </p>
				<p className="preco"> Estoque: {book.amount} </p>
				<button className="btn-comprar" onClick={clicked}> Comprar </button>
			</div>
		</div>
	);
}

export default Bookcard;
