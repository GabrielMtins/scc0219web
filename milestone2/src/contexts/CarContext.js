import { createContext, useContext, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const CarContext = createContext();
const API_URL = 'http://localhost:5000/books';
const SALES_API_URL = 'http://localhost:5000/sales'

export function CarProvider({ children }) {
	const [newBookTitle, setNewBookTitle] = useState('');
	
	/* Catalog diz a respeito do objeto do catálogo, contendo
	 * a lista de livros com suas propriedades. */
	const [catalog, setCatalog] = useState([]);

	/* nextId é apenas uma variável para ids de livros. Ela é usada
	 * para garantir ids únicos. */
	const [nextId, setNextId] = useState(1000);

  	// useEffect para buscar os dados quando o componente montar
  	useEffect(() => {
    	const fetchBooks = async () => {
			try {
				// Faz a requisição GET para o backend
				const response = await axios.get(API_URL);
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

	// Função para lidar com o envio do formulário
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!newBookTitle) return;

		try {
			const response = await axios.post(API_URL, { title: newBookTitle });
			// Adiciona a nova tarefa à lista existente sem precisar buscar tudo de novo
			setCatalog([...catalog, response.data]);
			setNewBookTitle(''); // Limpa o input
		} catch (error) {
			console.error("Erro ao adicionar o livro:", error);
		}
	};

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

	/* Função que retorna o item do catálogo dado o id.
	 * Fazendo busca no front end. */
	const getItemCatalog = (id) => {
		return catalog.find((book) => book.id == id)
	};

	/* Função que adicionará (ou remover) um item do 
	 * carrinho. Ela performa a verificação do estoque disponível. */
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

	/* Limpa o carrinho, chamada quando o usuário
	 * sai do login. */
	const resetCar = () => {
		setCar([]);
	};

	/* Basicamente remove um elemento do carrinho, marcando
	 * sua quantidade como 0 */
	const resetId = (id) => {
		setCar(car => ({
			...car,
			[id]: 0
		}));
	};

	/* Atualiza as informações de um livro
	 * no catálogo. Utilizada nas funções de atualização
	 * da página de admin. */
	const updateCatalog = async (id, book) => {
		try {
			const updated = {...getItemCatalog(id), ...book};
			const response = await axios.put(`${API_URL}/${id}`, updated);

			setCatalog(response.data);
		} catch(error){
			toast.error('Erro ao atualizar o livro.');
			console.log(error);
		}
	};

	/* Adiciona um livro novo ao catálogo,
	 * atualizando o slot de id disponível também. */
	const addCatalog = async (book) => {
		try {
			const new_book = {'id': nextId, ...book};
			console.log(new_book);
			const response = await axios.post(API_URL, new_book);
			setCatalog(response.data);
			setNextId(nextId + 1);
		} catch(error) {
			toast.error('Erro ao adicionar livro');
		}
	};

	/* Remove um livro do catálogo dado o id */
	const removeCatalog = async (id) => {
		try {
			const response = await axios.delete(`${API_URL}/${id}`);

			setCatalog(response.data);
		} catch(error) {
			toast.error('Erro ao remover livro');
		}
	};

	/* Apenas as funções relacionadas ao contexto do carrinho */
	return (
		<CarContext.Provider value={{ car, resetCar, addToCar, catalog, resetId, setCatalog, updateCatalog, setCatalog, addCatalog, getItemCatalog, removeCatalog, currentBook, setCurrentBook }}>
			{children}
		</CarContext.Provider>
	);
}

export function useCar() {
	return useContext(CarContext);
}
