import { useState } from 'react';
import EstoqueTable from '../components/EstoqueTable';
import AddBookForm from '../components/AddBookForm';
import SellsList from '../components/SellsList';
import './Admin.css';

const Admin = () => {
  const [livrosEmEstoque, setLivrosEmEstoque] = useState([
    { id: 'dom-casmurro', titulo: 'Dom Casmurro', autor: 'Machado de Assis', editora: 'Editora Garnier', preco: 29.90, quantidade: 15 },
    { id: 'pequeno-principe', titulo: 'O Pequeno Príncipe', autor: 'Antoine de Saint-Exupéry', editora: 'Agir', preco: 39.90, quantidade: 20 },
  ]);

  // Histórico de vendas permanece com a mesma estrutura,
  // a menos que queira adicionar editora aqui também.
  const [historicoVendas, setHistoricoVendas] = useState([
    { id: 'venda-1', data: '2025-04-23', livroTitulo: 'Dom Casmurro', quantidadeVendida: 2, valorUnitario: 29.90, valorTotal: 59.80 },
    { id: 'venda-2', data: '2025-04-24', livroTitulo: 'O Pequeno Príncipe', quantidadeVendida: 1, valorUnitario: 39.90, valorTotal: 39.90 },
    { id: 'venda-3', data: '2025-05-01', livroTitulo: 'Dom Casmurro', quantidadeVendida: 1, valorUnitario: 29.90, valorTotal: 29.90 },
  ]);

  const handleAdicionarLivro = (novoLivro) => {
    const tituloNormalizado = novoLivro.titulo.trim().toLowerCase();
    const autorNormalizado = novoLivro.autor.trim().toLowerCase();
    const editoraNormalizada = novoLivro.editora.trim().toLowerCase(); // Adicionado

    const duplicado = livrosEmEstoque.find(
      livro =>
        livro.titulo.trim().toLowerCase() === tituloNormalizado &&
        livro.autor.trim().toLowerCase() === autorNormalizado &&
        livro.editora.trim().toLowerCase() === editoraNormalizada // Adicionado
    );

    if (duplicado) {
      alert('Erro: Um livro com o mesmo título, autor e editora já existe no estoque.');
      return;
    }

    const livroParaAdicionar = {
        ...novoLivro,
        id: novoLivro.id || `livro-${Date.now()}`
    };
    setLivrosEmEstoque(prevLivros => [...prevLivros, livroParaAdicionar]);
  };

  const handleRemoveLivro = (livroId) => {
    setLivrosEmEstoque(prevLivros =>
      prevLivros.filter(livro => livro.id !== livroId)
    );
  };

  const handleAtualizarLivro = (livroId, dadosAtualizados) => {
    const preco = parseFloat(dadosAtualizados.preco);
    const quantidade = parseInt(dadosAtualizados.quantidade, 10);
    const editora = dadosAtualizados.editora.trim(); // Editora é string

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

    setLivrosEmEstoque(prevLivros =>
      prevLivros.map(livro =>
        livro.id === livroId ? { ...livro, preco, quantidade, editora } : livro // Editora adicionada
      )
    );
  };

  return (
    <>
      <div className="hero-image"></div>
      <main className="admin-container">
        <EstoqueTable
          livros={livrosEmEstoque}
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