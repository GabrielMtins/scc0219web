import '../palette.css';
import './Home.css';
import './Catalogo.css';
import Bookcard from '../components/Bookcard.js';
import Booklist from '../components/Booklist.js';

import {useCar} from '../contexts/CarContext';

function Catalogo() {
	const {catalog} = useCar();

	return (
		<div className="page">
			<div className="main-content">
				<h1> Catálogo </h1>
		
				<div className="barra-busca">
					<input type="text" placeholder="Buscar livros..." className="input-busca" /> 
					<button className="btn-busca">Buscar</button>
				</div>
		
				<button className="btn-filtro">Filtros</button>
			</div>

			<Booklist book_list={catalog} />
		</div>
	);
}

export default Catalogo;
