import '../palette.css';
import './FilterBox.css';
import {useCar} from '../contexts/CarContext';
import FilterType from '../components/FilterType';
import {useState, useEffect} from 'react';

function FilterBox({filterOptions, addFilter, resetFilter, applyFilter}) {
	const {catalog} = useCar();
	const authors = [...new Set(catalog.map((item) => (item.author)))];
	const genres = [...new Set(catalog.map((item) => (item.genre)))];
	const publishers = [...new Set(catalog.map((item) => (item.publisher)))];

	return (
		<div className="filter-box">
			<div className="filter">
				<h2> Escolha as opções de filtro. </h2>
	
				<div className="filter-type-container">
					<FilterType labelName="Autor:" filterName="author" list={authors} addFilter={addFilter} filterOptions={filterOptions}/>
					<FilterType labelName="Gênero:" filterName="genre" list={genres} addFilter={addFilter} filterOptions={filterOptions}/>
					<FilterType labelName="Editora:" filterName="publisher" list={publishers} addFilter={addFilter} filterOptions={filterOptions}/>
				</div>
	
				<div className="filter-buttons-container">
					<button onClick={resetFilter}> Limpar filtro </button>
				</div>
			</div>
		</div>
	);
}

export default FilterBox;
