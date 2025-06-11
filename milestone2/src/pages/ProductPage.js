import '../palette.css';
import './Home.css';
import './Catalogo.css';
import Bookcard from '../components/Bookcard.js';
import Bookpage from '../components/Bookpage.js';
import { useCar } from '../contexts/CarContext';

function ProductPage() {
	const { currentBook, getItemCatalog } = useCar();

	return (
		<div className="page">
			<br />
			<Bookpage book={getItemCatalog(currentBook)} />
		</div>
	);
}

export default ProductPage;
