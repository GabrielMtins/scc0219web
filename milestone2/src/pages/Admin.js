import { useState } from 'react';
import EstoqueTable from '../components/EstoqueTable';
import AddBookForm from '../components/AddBookForm';
import SellsList from '../components/SellsList';
import './Admin.css';
import { useCar } from '../contexts/CarContext';

const Admin = () => {
	const { catalog, updateCatalog, addCatalog, removeCatalog } = useCar();

	const [livrosEmEstoque, setLivrosEmEstoque] = useState([
		{ id: 'dom-casmurro', title: 'Dom Casmurro', author: 'Machado de Assis', publisher: 'Editora Garnier', price: 29.90, amount: 15 },
		{ id: 'pequeno-principe', title: 'O Pequeno Príncipe', author: 'Antoine de Saint-Exupéry', publisher: 'Agir', preco: 39.90, amount: 20 },
	]);

	// Histórico de vendas permanece com a mesma estrutura,
	// a menos que queira adicionar editora aqui também.
	const [historicoVendas, setHistoricoVendas] = useState([
		{ id: 'venda-1', data: '2025-04-23', livroTitulo: 'Dom Casmurro', quantidadeVendida: 2, valorUnitario: 29.90, valorTotal: 59.80 },
		{ id: 'venda-2', data: '2025-04-24', livroTitulo: 'O Pequeno Príncipe', quantidadeVendida: 1, valorUnitario: 39.90, valorTotal: 39.90 },
		{ id: 'venda-3', data: '2025-05-01', livroTitulo: 'Dom Casmurro', quantidadeVendida: 1, valorUnitario: 29.90, valorTotal: 29.90 },
	]);

	const handleAdicionarLivro = (novoLivro) => {
		const tituloNormalizado = novoLivro.title.trim().toLowerCase();
		const autorNormalizado = novoLivro.author.trim().toLowerCase();
		const editoraNormalizada = novoLivro.publisher.trim().toLowerCase(); // Adicionado

		const duplicado = catalog.find(
			livro =>
				livro.title.trim().toLowerCase() === tituloNormalizado &&
				livro.author.trim().toLowerCase() === autorNormalizado &&
				livro.editor.trim().toLowerCase() === editoraNormalizada // Adicionado
		);

		if (duplicado) {
			alert('Erro: Um livro com o mesmo título, autor e editora já existe no estoque.');
			return;
		}

		addCatalog(novoLivro);
	};

	const handleRemoveLivro = (livroId) => {
		removeCatalog(livroId);
	};

	const handleAtualizarLivro = (livroId, dadosAtualizados) => {
		const preco = parseFloat(dadosAtualizados.price);
		const quantidade = parseInt(dadosAtualizados.amount, 10);
		const editora = dadosAtualizados.publisher.trim(); // Editora é string

		if (isNaN(preco) || preco < 0) {
			alert("O preço deve ser um número não negativo.");
			return;
		}
		if (isNaN(quantidade) || quantidade < 0) {
			alert("A quantidade deve ser um número inteiro não negativo.");
			return;
		}
		if (!editora) {
			alert("O campo editora não pode ser vazio.");
			return;
		}

		updateCatalog(livroId, dadosAtualizados);
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
