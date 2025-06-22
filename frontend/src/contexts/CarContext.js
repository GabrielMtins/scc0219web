import { createContext, useContext, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const CarContext = createContext();
const BOOKS_API_URL = 'http://localhost:5000/books';
const SALES_API_URL = 'http://localhost:5000/sales';
const LOGIN_API_URL = 'http://localhost:5000/users';

export function CarProvider({ children }) {
	/* Esse livro nulo é apenas para facilitar
	 * o uso do carrinho */
	const nullbook = {
		'amount': 0,
		'price': 0
	};

	const [newBookTitle, setNewBookTitle] = useState('');
	
	/* Catalog diz a respeito do objeto do catálogo, contendo
	 * a lista de livros com suas propriedades. */
	const [catalog, setCatalog] = useState([]);

	/* nextId é apenas uma variável para ids de livros. Ela é usada
	 * para garantir ids únicos. */
	const [nextId, setNextId] = useState(1000);

	const [currentUsername, setCurrentUsername] = useState(null);

  	// useEffect para buscar os dados quando o componente montar
  	useEffect(() => {
    	const fetchBooks = async () => {
			try {
				// Faz a requisição GET para o backend
				const response = await axios.get(BOOKS_API_URL);
				const newCatalog = response.data;
				const minNextId = Math.max(...newCatalog.map(book => book.id)) + 1;

				setCatalog(newCatalog); // Atualiza o estado com os dados recebidos
				setNextId(minNextId);
			} catch (error) {
				console.error("Erro ao buscar os livros:", error);
			}
		};

		fetchBooks();
	}, []); // O array vazio [] faz com que o useEffect rode apenas uma vez

	/* Car será o carrinho que o usuário pode utilizar, ele será
	* armazenado localmente. Provavelmente poderá ser salvo no backend
	* caso necessário. */
	const [car, setCar] = useState({});

	/* currentBook diz respeito ao livro que a página de
	 * descrição irá mostrar. */
	const [currentBook, setCurrentBook] = useState(null);

	/* A seguir, estarão algumas funções relacionadas ao
	 * carrinho e ao catálogo. Idealmente, algumas funções relacionadas
	 * ao catálogo serão movidas para o backend. */

	const sendCartToServer = async (new_car) => {
		if(currentUsername) {
			try {
				await axios.put(`${LOGIN_API_URL}/cart/${currentUsername}`, {'cart': JSON.stringify(new_car)});
			} catch(error) {
				console.log("Falha em salvar o carrinho " +error);
			}
		}
	};

	/* Função que retorna o item do catálogo dado o id.
	 * Fazendo busca no front end. */
	const getItemCatalog = (id) => {
		return catalog.find((book) => book.id == id) || nullbook;
	};

	/* Função que adicionará (ou remover) um item do 
	 * carrinho. Ela performa a verificação do estoque disponível. */
	const addToCar = async (id, amount) => {
		if (car[id]||0 + amount > getItemCatalog(id).amount) {
			toast.error('Não há mais desse produto no estoque.');
			return false;
		}
		const new_car = {
			...car,
			[id]: (car[id] || 0) + amount
		};

		await sendCartToServer(new_car);
		setCar(car => ({...car, ...new_car}));

		return true;
	};

	/* Limpa o carrinho, chamada quando o usuário
	 * sai do login. */
	const resetCar = async () => {
		await sendCartToServer({});
		setCar({});
	};

	/* Reseta um item do carrinho com uma dada quantidade */
	const resetIdAmount = async (id, amount) => {
		const new_car = {
			...car,
			[id]: amount
		};

		await sendCartToServer(new_car);
		setCar(car => ({...car, ...new_car}));
	};

	/* Basicamente remove um elemento do carrinho, marcando
	 * sua quantidade como 0 */
	const resetId = async (id) => {
		await resetIdAmount(id, 0);
	};

	/* Atualiza as informações de um livro
	 * no catálogo. Utilizada nas funções de atualização
	 * da página de admin. */
	const updateCatalog = async (id, book) => {
		try {
			const updated = {...getItemCatalog(id), ...book};
			const response = await axios.put(`${BOOKS_API_URL}/${id}`, updated);

			setCatalog(response.data);
		} catch(error){
			console.log(error);
		}
	};

	/* Envia os dados da venda para o servidor */
	const sendSaleToServer = async (username) => {
		const items = Object.keys(car);

		/* Mapeia a string para o tipo
		 * 1x Capital */
		const sales_formated = items.map((id) => {
			if(car[id] == 0)
				return "";

			return car[id] + "x " + getItemCatalog(id).title;
		});

		const price = items.map((id) => (car[id] * getItemCatalog(id).price)).reduce((x, y) => (x + y));

		const sale = {
			'buyer': username,
			'price': price,
			'books': JSON.stringify(sales_formated),
		};

		try {
			await axios.post(SALES_API_URL, sale);
		} catch(error) {
			console.log(error);
		}
	};

	/* Atualiza o carrinho e o catálogo no servidor, enviando também a venda para 
	 * o servidor. */
	const updateCarToServer = async (username) => {
		Object.keys(car).forEach(async (id) => {
			const book = getItemCatalog(id);

			const new_amount = book.amount - car[id];
			const new_sales = book.sales + car[id];

			if(new_amount >= 0){
				const new_book = {...book, 'amount': new_amount, 'sales': new_sales};
				console.log(new_book);
				/* atualiza os dados do catálogo */
				await updateCatalog(id, new_book);
			}
		});

		await sendSaleToServer(username);

		await resetCar();
	};

	/* Adiciona um livro novo ao catálogo,
	 * atualizando o slot de id disponível também. */
	const addCatalog = async (book) => {
		try {
			const new_book = {'id': nextId, ...book};
			console.log(new_book);
			const response = await axios.post(BOOKS_API_URL, new_book);
			setCatalog(response.data);
			setNextId(nextId + 1);
		} catch(error) {
			toast.error('Erro ao adicionar livro');
		}
	};

	/* Remove um livro do catálogo dado o id */
	const removeCatalog = async (id) => {
		try {
			const response = await axios.delete(`${BOOKS_API_URL}/${id}`);

			setCatalog(response.data);
		} catch(error) {
			toast.error('Erro ao remover livro');
		}
	};

	/* Apenas as funções relacionadas ao contexto do carrinho */
	return (
		<CarContext.Provider value={{ setCurrentUsername, resetIdAmount, updateCarToServer, car, setCar,
				resetCar, addToCar, catalog, resetId, setCatalog, updateCatalog, 
				setCatalog, addCatalog, getItemCatalog, removeCatalog, currentBook, setCurrentBook }}>
			{children}
		</CarContext.Provider>
	);
}

export function useCar() {
	return useContext(CarContext);
}
