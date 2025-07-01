import '../palette.css';
import './Home.css';
import './Catalogo.css';
import Bookcard from '../components/Bookcard.js';
import Bookpage from '../components/Bookpage.js';
import { useCar } from '../contexts/CarContext';
import { useNavigate } from 'react-router-dom';

function ProductPage() {
	const { currentBook, getItemCatalog } = useCar();
	const navigate = useNavigate();

	const back = async () => {
		navigate("/catalogo");
	};

	return (
		<div className="page">
			<br />
			<button className="back-button" onClick={back}> Voltar </button>
			<br />
			<br />
			<Bookpage book={getItemCatalog(currentBook)} />
		</div>
	);
}

export default ProductPage;
