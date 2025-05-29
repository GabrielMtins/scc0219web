import '../palette.css';
import './Home.css';
import './Catalogo.css';
import Bookcard from '../components/Bookcard.js';
import Booklist from '../components/Booklist.js';

import {useCar} from '../contexts/CarContext';
import {useState, useEffect} from 'react';

function Catalogo() {
	const {catalog} = useCar();
	const [filtered_catalog, setFilteredCatalog] = useState(catalog);

	const [search, setSearch] = useState("");

	const searchByName = () => {
		setFilteredCatalog(catalog.
			filter((item) => (item.title.toLowerCase().includes(search.toLowerCase())))
		);
	};

	const searchButtonClick = () => {
		searchByName();
	};

	return (
		<div className="page">
			<div className="main-content">
				<h1> Catálogo </h1>
		
				<div className="barra-busca">
					<input type="text" placeholder="Buscar livros..." className="input-busca" onChange={(event) => setSearch(event.target.value)}/> 
					<button className="btn-busca" onClick={searchButtonClick}> Buscar </button>
				</div>
		
				<button className="btn-filtro">Filtros</button>
			</div>

			<Booklist book_list={filtered_catalog} />
		</div>
	);
}

export default Catalogo;
