import { useState, useEffect } from 'react';
import EstoqueTable from '../components/EstoqueTable';
import AddBookForm from '../components/AddBookForm';
import SellsList from '../components/SellsList';
import UserManagement from '../components/UserManagement'; 
import './Admin.css';
import { useCar } from '../contexts/CarContext';
import { toast } from 'react-toastify';
import { useLogin } from '../contexts/LoginContext';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
	const { catalog, updateCatalog, addCatalog, removeCatalog } = useCar();
	const { user, getAllSalesHistory } = useLogin();
	const navigate = useNavigate();

	// Estado para controlar a aba ativa
	const [activeTab, setActiveTab] = useState('estoque');
	const [historicoVendas, setHistoricoVendas] = useState([]);

	useEffect(() => {
		if (!user || user.admin !== true) {
			navigate('/');
			return; // Interrompe a execução se o usuário não for admin
		}

		const fetchData = async () => {
			try {
				const data = await getAllSalesHistory();
				setHistoricoVendas(data);
			} catch (error) {
				toast.error('Falha ao buscar histórico de vendas.');
				console.error(error);
			}
		};

		// Chama os dados com o histórico de vendas apenas uma vez ou quando as dependências mudarem
		fetchData();
	}, [user, navigate, getAllSalesHistory]); // Array de dependências para otimização

	const handleAdicionarLivro = async (novoLivro) => {
		const tituloNormalizado = novoLivro.title.trim().toLowerCase();
		const autorNormalizado = novoLivro.author.trim().toLowerCase();
		const editoraNormalizada = novoLivro.publisher.trim().toLowerCase();
		const generoNormalizado = novoLivro.genre.trim().toLowerCase();

		const found_already_title = catalog.find(livro => livro.title.trim().toLowerCase() === tituloNormalizado);

		if (found_already_title) {
			toast.error('Livro com mesmo título já existe.');
			return;
		}

		// Reutiliza dados existentes para consistência
		const found_already_publisher = catalog.find(livro => livro.publisher.trim().toLowerCase() === editoraNormalizada);
		if (found_already_publisher) {
			novoLivro.publisher = found_already_publisher.publisher;
		}

		const found_already_author = catalog.find(livro => livro.author.trim().toLowerCase() === autorNormalizado);
		if (found_already_author) {
			novoLivro.author = found_already_author.author;
		}

		const found_already_genre = catalog.find(livro => livro.genre.trim().toLowerCase() === generoNormalizado);
		if (found_already_genre) {
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
		const editora = dadosAtualizados.publisher.trim();
		const img_link = dadosAtualizados.img_link.trim();

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

		if(!img_link) {
			toast.error("O campo do link para a imagem não pode ser vazio.");
			return;
		}

		await updateCatalog(livroId, dadosAtualizados);
	};

	return (
		<>
			<div className="hero-image"></div>
			<main className="admin-container">
				{/* Navegação das Abas */}
				<div className="admin-tabs">
					<button
						className={`tab-button ${activeTab === 'estoque' ? 'active' : ''}`}
						onClick={() => setActiveTab('estoque')}
					>
						Gerenciar Estoque
					</button>
					<button
						className={`tab-button ${activeTab === 'vendas' ? 'active' : ''}`}
						onClick={() => setActiveTab('vendas')}
					>
						Histórico de Vendas
					</button>
					<button
						className={`tab-button ${activeTab === 'usuarios' ? 'active' : ''}`}
						onClick={() => setActiveTab('usuarios')}
					>
						Gerenciar Usuários
					</button>
				</div>

				{/* Conteúdo da Aba Ativa */}
				<div className="admin-tab-content">
					{activeTab === 'estoque' && (
						<>
							<EstoqueTable
								livros={catalog}
								onRemoveLivro={handleRemoveLivro}
								onAtualizarLivro={handleAtualizarLivro}
							/>
							<AddBookForm onAdicionarLivro={handleAdicionarLivro} />
						</>
					)}

					{activeTab === 'vendas' && (
						<SellsList vendas={historicoVendas} />
					)}
					
					{activeTab === 'usuarios' && (
						<UserManagement />
					)}
				</div>
			</main>
		</>
	);
}

export default Admin;
