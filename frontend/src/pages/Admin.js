import { useState, useEffect } from 'react';
import EstoqueTable from '../components/EstoqueTable';
import AddBookForm from '../components/AddBookForm';
import SellsList from '../components/SellsList';
import './Admin.css';
import { useCar } from '../contexts/CarContext';
import { toast } from 'react-toastify';
import { useLogin } from '../contexts/LoginContext';

const Admin = () => {
	const { catalog, updateCatalog, addCatalog, removeCatalog } = useCar();
	const { getAllSalesHistory } = useLogin();

	const [livrosEmEstoque, setLivrosEmEstoque] = useState([
		{ id: 'dom-casmurro', title: 'Dom Casmurro', author: 'Machado de Assis', publisher: 'Editora Garnier', price: 29.90, amount: 15 },
		{ id: 'pequeno-principe', title: 'O Pequeno Príncipe', author: 'Antoine de Saint-Exupéry', publisher: 'Agir', preco: 39.90, amount: 20 },
	]);

	const [historicoVendas, setHistoricoVendas] = useState([]);

	// Histórico de vendas permanece com a mesma estrutura,
	// a menos que queira adicionar editora aqui também.

	useEffect(() => {
		const fetchData = async () => {
			const data = await getAllSalesHistory();
			setHistoricoVendas(data);
		}

		fetchData();
	});

	const handleAdicionarLivro = async (novoLivro) => {
		const tituloNormalizado = novoLivro.title.trim().toLowerCase();
		const autorNormalizado = novoLivro.author.trim().toLowerCase();
		const editoraNormalizada = novoLivro.publisher.trim().toLowerCase(); // Adicionado
		const generoNormalizado = novoLivro.genre.trim().toLowerCase(); // Adicionado

		const found_already_title = catalog.find(livro => livro.title.trim().toLowerCase() === tituloNormalizado);
		const found_already_author = catalog.find(livro => livro.author.trim().toLowerCase() === autorNormalizado);
		const found_already_publisher = catalog.find(livro => livro.publisher.trim().toLowerCase() === editoraNormalizada);
		const found_already_genre = catalog.find(livro => livro.genre.trim().toLowerCase() === generoNormalizado);

		if(found_already_title) {
			toast.error('Livro com mesmo título já existe.');
			return;
		}

		if(found_already_publisher) {
			novoLivro.publisher = found_already_publisher.publisher;
		}

		if(found_already_author) {
			novoLivro.author = found_already_author.author;
		}

		if(found_already_genre) {
			novoLivro.genre = found_already_genre.genre;
		}

		await addCatalog(novoLivro);
	};

	const handleRemoveLivro = async (livroId) => {
		await removeCatalog(livroId);
	};

	const handleAtualizarLivro = async (livroId, dadosAtualizados) => {
		const preco = parseFloat(dadosAtualizados.price);
		const quantidade = parseInt(dadosAtualizados.amount, 10);
		const editora = dadosAtualizados.publisher.trim(); // Editora é string

		if (isNaN(preco) || preco < 0) {
			toast.error("O preço deve ser um número não negativo.");
			return;
		}
		if (isNaN(quantidade) || quantidade < 0) {
			toast.error("A quantidade deve ser um número inteiro não negativo.");
			return;
		}
		if (!editora) {
			toast.error("O campo editora não pode ser vazio.");
			return;
		}

		await updateCatalog(livroId, dadosAtualizados);
	};

	return (
		<>
			<div className="hero-image"></div>
			<main className="admin-container">
				<EstoqueTable
					livros={catalog}
					onRemoveLivro={handleRemoveLivro}
					onAtualizarLivro={handleAtualizarLivro}
				/>
				<AddBookForm onAdicionarLivro={handleAdicionarLivro} />
				<SellsList vendas={historicoVendas} />
			</main>
		</>
	);
}

export default Admin;
