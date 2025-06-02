import { createContext, useContext, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const CarContext = createContext();

export function CarProvider({ children }) {
	const book_list = [
		{
			id: 0,
			author: 'George Orwell',
			img_link: 'https://m.media-amazon.com/images/I/819js3EQwbL._AC_UF1000,1000_QL80_.jpg',
			title: '1984',
			price: '29.90',
			genre: 'Distopia',
			publisher: 'Companhia das Letras',
			amount: 4,
		},
		{
			id: 1,
			author: 'Karl Marx',
			img_link: 'https://boitempoeditorial.fbitsstatic.net/img/p/o-capital-livro-1-152742/338393.jpg?w=290&h=420&v=no-value',
			title: 'O Capital',
			price: '89.90',
			genre: 'Filosofia',
			publisher: 'Boitempo Editorial',
			amount: 4,
		},
		{
			id: 2,
			author: 'Karl Marx',
			img_link: 'https://m.media-amazon.com/images/I/61D7dwT4jjL._AC_UF1000,1000_QL80_.jpg',
			title: 'A Ideologia Alemã',
			price: '79.90',
			genre: 'Filosofia',
			publisher: 'Boitempo Editorial',
			amount: 4,
		},
		{
			id: 3,
			author: 'René Descartes',
			img_link: 'https://m.media-amazon.com/images/I/61n0pOJWpML._AC_UF1000,1000_QL80_.jpg',
			title: 'Meditações Metafísicas',
			price: '79.90',
			genre: 'Filosofia',
			publisher: 'WMF Martins Fonters',
			amount: 2,
		},
		{
			id: 4,
			author: 'Luís de Camões',
			img_link: 'https://m.media-amazon.com/images/I/710jGDp8QuL._AC_UF1000,1000_QL80_.jpg',
			title: 'Sonetos',
			price: '19.90',
			genre: 'Poesia',
			publisher: 'Principis',
			amount: 10,
		},
		{
			id: 5,
			author: 'Andrei Tarkosvki',
			img_link: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1569535201i/846751.jpg',
			title: 'Esculpir o tempo',
			price: '99.90',
			genre: 'Cinema',
			publisher: 'Principis',
			amount: 2,
		},
	];

	const [car, setCar] = useState({});
	const [catalog, setCatalog] = useState(book_list);
	const [nextId, setNextId] = useState(100);

	const getItemCatalog = (id) => {
		return catalog.find((book) => book.id == id)
	};

	const addToCar = (id, amount) => {
		if (car[id] + amount > getItemCatalog(id).amount) {
			toast.error('Não há mais desse produto no estoque.');
			return false;
		}

		setCar(car => ({
			...car,
			[id]: (car[id] || 0) + amount
		}));

		return true;
	};

	const resetId = (id) => {
		setCar(car => ({
			...car,
			[id]: 0
		}));
	};

	const updateCatalog = (id, book) => {
		setCatalog(catalog => catalog.map((item, i) => (i === id ? { ...item, ...book } : item)));
	};

	const addCatalog = (book) => {
		setCatalog(catalog => ([
			...catalog,
			{ 'id': nextId, ...book },
		]));

		setNextId(nextId + 1);
	};

	const removeCatalog = (id) => {
		setCatalog(catalog => ([
			...catalog.slice(0, id),
			...catalog.slice(id + 1)
		]));
	};

	return (
		<CarContext.Provider value={{ car, addToCar, catalog, resetId, setCatalog, updateCatalog, setCatalog, addCatalog, getItemCatalog, removeCatalog }}>
			{children}
		</CarContext.Provider>
	);
}

export function useCar() {
	return useContext(CarContext);
}
