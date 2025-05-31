import { createContext, useContext, useState } from 'react';

const CarContext = createContext();

export function CarProvider({children}) {
	const book_list = [
		{
			id: 0,
			author: 'George Orwell',
			img_link: 'https://m.media-amazon.com/images/I/819js3EQwbL._AC_UF1000,1000_QL80_.jpg',
			title: '1984',
			price: '29.90',
			genre: 'Distopia',
			publisher: 'Companhia das Letras',
		},
		{
			id: 1,
			author: 'Karl Marx',
			img_link: 'https://boitempoeditorial.fbitsstatic.net/img/p/o-capital-livro-1-152742/338393.jpg?w=290&h=420&v=no-value',
			title: 'O Capital',
			price: '89.90',
			genre: 'Filosofia',
			publisher: 'Boitempo Editorial',
		},
		{
			id: 2,
			author: 'Karl Marx',
			img_link: 'https://m.media-amazon.com/images/I/61D7dwT4jjL._AC_UF1000,1000_QL80_.jpg',
			title: 'A Ideologia Alemã',
			price: '79.90',
			genre: 'Filosofia',
			publisher: 'Boitempo Editorial',
		},
		{
			id: 3,
			author: 'Karl Marx',
			img_link: 'https://m.media-amazon.com/images/I/61D7dwT4jjL._AC_UF1000,1000_QL80_.jpg',
			title: 'A Ideologia Alemã 1984',
			price: '79.90',
			genre: 'Filosofia',
			publisher: 'Boitempo Editorial',
		},
	];

	const [car, setCar] = useState({});
	const [catalog, setCatalog] = useState(book_list);

	const addToCar = (id, amount) => {
		setCar(car => ({
			...car,
			[id]: (car[id] || 0) + amount
		}));
	};

	const resetId = (id) => {
		setCar(car => ({
			...car,
			[id]: 0
		}));
	};

	return (
		<CarContext.Provider value={{car, addToCar, catalog, resetId, setCatalog}}>
			{children}
		</CarContext.Provider>
	);
}

export function useCar() {
	return useContext(CarContext);
}
