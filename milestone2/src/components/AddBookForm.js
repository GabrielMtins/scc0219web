import { useState } from "react";
import "./AddBookForm.css";

const AddBookForm = ({ onAdicionarLivro }) => {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [editora, setEditora] = useState(''); // Adicionado
  const [preco, setPreco] = useState('');
  const [quantidade, setQuantidade] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!titulo || !autor || !editora || !preco || !quantidade) { // Editora adicionada à validação
      alert('Por favor, preencha todos os campos, incluindo a editora.');
      return;
    }

    const precoNum = parseFloat(preco);
    const quantidadeNum = parseInt(quantidade, 10);

    if (isNaN(precoNum) || precoNum < 0) {
      alert("O preço deve ser um número não negativo.");
      return;
    }
    if (isNaN(quantidadeNum) || quantidadeNum < 0) {
      alert("A quantidade deve ser um número inteiro não negativo.");
      return;
    }

    onAdicionarLivro({
      titulo,
      autor,
      editora, // Adicionado
      preco: precoNum,
      quantidade: quantidadeNum,
    });

    setTitulo('');
    setAutor('');
    setEditora(''); // Limpar campo
    setPreco('');
    setQuantidade('');
  };

  return (
    <section className="adicionar-livro">
      <h2 className="section-title">Adicionar Novo Livro</h2>
      <form className="add-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Título do Livro"
          required
        />
        <input
          type="text"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
          placeholder="Autor"
          required
        />
        <input // Novo campo para Editora
          type="text"
          value={editora}
          onChange={(e) => setEditora(e.target.value)}
          placeholder="Editora"
          required
        />
        <input
          type="number"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          placeholder="Preço (R$)"
          step="0.01"
          min="0"
          required
        />
        <input
          type="number"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
          placeholder="Quantidade"
          min="0"
          required
        />
        <button type="submit" className="btn-adicionar">Adicionar ao Estoque</button>
      </form>
    </section>
  );
}

export default AddBookForm;