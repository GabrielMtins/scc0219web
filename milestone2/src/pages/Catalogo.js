import '../palette.css';
import './Home.css';
import './Catalogo.css';
import Bookcard from '../components/Bookcard.js';
import Booklist from '../components/Booklist.js';
import FilterBox from '../components/FilterBox.js';

import {useCar} from '../contexts/CarContext';
import {useState, useEffect} from 'react';

function Catalogo() {
	const {catalog} = useCar();
	const [filtered_catalog, setFilteredCatalog] = useState(catalog);
	const [filterOptions, setFilterOptions] = useState({});
	const [useFilter, setUseFilter] = useState(false);

	const [search, setSearch] = useState("");
	const [actualSearch, setActualSearch] = useState("");

	const applyAnyFilters = () => {
		setFilteredCatalog(catalog
			.filter((item) => (item.title.toLowerCase().includes(actualSearch.toLowerCase())))
			.filter((item) => {
				for(const key of Object.keys(filterOptions)){
					if(filterOptions[key] == "nil"){
						continue;
					}

					if(filterOptions[key] != item[key])
						return false;
				}
				
				return true;
			})
		);
	};

	const searchButtonClick = () => {
		setActualSearch(search);
	};

	const handleKeyDown = (event) => {
		if(event.key == 'Enter'){
			searchButtonClick();
		}
	};

	useEffect(() => {
		applyAnyFilters();
	}, [actualSearch]);
	
	const addFilter = (object) => {
		setFilterOptions(filterOptions => ({...filterOptions, ...object}));
	};

	const resetFilter = () => {
		setFilterOptions({});
	}

	useEffect(() => {
		applyAnyFilters();
	}, [filterOptions]);

	const displayFilter = () => {
		if(useFilter == true){
			return (<FilterBox filterOptions={filterOptions} addFilter={addFilter} resetFilter={resetFilter} applyFilter={applyAnyFilters}/>);
		}
	};

	const applyFilter = () => {
		setFilteredCatalog(catalog.filter((item) => {
			for(const key of Object.keys(filterOptions)){
				if(filterOptions[key] == "nil"){
					continue;
				}

				if(filterOptions[key] != item[key])
					return false;
			}
			
			return true;
		}));
	};

	const showFilter = () => {
		setUseFilter(!useFilter);
	};

	return (
		<div className="page">
			<div className="main-content">
				<h1> Catálogo </h1>
		
				<div className="barra-busca">
					<input type="text" placeholder="Buscar livros..." className="input-busca" onKeyDown={handleKeyDown} onChange={(event) => setSearch(event.target.value)}/> 
					<button className="btn-busca" onClick={searchButtonClick}> Buscar </button>
				</div>

				<button className="btn-filtro" onClick={showFilter}>Filtros</button>

				{displayFilter()}

				<Booklist book_list={filtered_catalog} />
			</div>
		</div>
	);
}

export default Catalogo;
