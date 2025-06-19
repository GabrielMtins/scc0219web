import { createContext, useContext, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const CarContext = createContext();
const API_URL = 'http://localhost:5001/posts';

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

	/* Lista temporária para armazenar os livros,
	 * no futuro essa lista deverá ser armazenada no backend. 
	const Books = [
		{
			id: 0,
			author: 'George Orwell',
			img_link: 'https://m.media-amazon.com/images/I/819js3EQwbL._AC_UF1000,1000_QL80_.jpg',
			title: '1984',
			price: '29.90',
			genre: 'Distopia',
			publisher: 'Companhia das Letras',
			description: 'Publicada originalmente em 1949, a distopia futurista 1984 é um dos romances mais influentes do século XX, um inquestionável clássico moderno. Lançada poucos meses antes da morte do autor, é uma obra magistral que ainda se impõe como uma poderosa reflexão ficcional sobre a essência nefasta de qualquer forma de poder totalitário.',
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
			description: 'O primeiro livro de O capital: crítica da economia política, intitulado O processo de produção do capital, é o único volume da principal obra de maturidade de Karl Marx publicado durante a vida do autor, morto em 1883. Esta terceira edição marca os 10 anos da publicação desta tradução no Brasil, feita diretamente do alemão. A edição se insere em um histórico esforço intelectual coletivo de trazer ao público brasileiro, em seu todo ou em versões reduzidas, a principal obra marxiana de crítica da economia política.',
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
			description: 'Chega às livrarias a aguardada edição integral de A ideologia alemã, de Karl Marx e Friedrich Engels. Traduzida diretamente do alemão para o português por Rubens Enderle, Nélio Schneider e Luciano Martorano, com texto final de Rubens Enderle, a edição da Boitempo tem introdução escrita por Emir Sader e supervisão editorial de Leandro Konder, um dos maiores estudiosos do marxismo no Brasil. Além disso, será a versão mais fiel aos originais deixados pelos autores, pois é a primeira no mundo traduzida a partir da inovadora Mega-2.Essa nova edição cuidadosa, que se tornará referência para todos os interessados nos escritos de Marx e Engels, foi feita dentro da tradição de rigor com os livros desses autores estabelecida pela Boitempo.',
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
			description: '\“Penso, Logo Existo.\” (René Descartes)\n Esta sentença, que se transformou em uma das mais célebres alegações da Filosofia moderna, constitui-se no fio condutor deste livro, escrito em meados do século XVII e considerado a obra-prima de seu autor. Para bem compreender a metafísica de Descartes, é indispensável ao leitor conhecer as Meditações Metafísicas , que ampliam suas considerações inspiradas no método cartesiano – iniciadas em Discurso sobre o Método – para comprovar a existência de Deus e a primazia da alma sobre o corpo.',
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
			description: 'Em meio ao movimento renascentista, Camões traz de volta os autores clássicos em sua escrita, utilizando gêneros poéticos, eruditas, clássicos grego-romanos como a ode e écloga. Contudo também fez uso dos versos decassílabos introduzidos em Portugal por Sá Miranda em 1527 que também trouxe a estrutura de soneto. Escreveu em português e em castelhano adotando uma postura racional para abordar os temas relevantes de sua época. Seus sonetos são reconhecidos como uma das maiores obras do Classicismo.',
			amount: 10,
		},
		{
			id: 5,
			author: 'Andrei Tarkosvki',
			img_link: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1569535201i/846751.jpg',
			title: 'Esculpir o tempo',
			price: '99.90',
			genre: 'Cinema',
			description: 'Esculpir o tempo é um livro do cineasta russo Andrei Tarkovsky sobre arte e cinema em geral, e seus próprios filmes em particular. Foi originalmente publicado em 1985 em alemão pouco antes da morte do autor.',
			publisher: 'Principis',
			amount: 2,
		},
	];
	*/

	//console.log(Array.isArray(Books));
	
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
