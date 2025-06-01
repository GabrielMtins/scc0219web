import { useState } from "react";
import "./AddBookForm.css";

const AddBookForm = ({ onAdicionarLivro }) => {
	const [title, setTitulo] = useState('');
	const [author, setAutor] = useState('');
	const [publisher, setEditora] = useState(''); // Adicionado
	const [price, setPreco] = useState('');
	const [amount, setQuantidade] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!title || !author || !publisher || !price || !amount) { // Editora adicionada à validação
			alert('Por favor, preencha todos os campos, incluindo a publisher.');
			return;
		}

		const priceNum = parseFloat(price);
		const amountNum = parseInt(amount, 10);

		if (isNaN(priceNum) || priceNum < 0) {
			alert("O preço deve ser um número não negativo.");
			return;
		}
		if (isNaN(amountNum) || amountNum < 0) {
			alert("A amount deve ser um número inteiro não negativo.");
			return;
		}

		onAdicionarLivro({
			title,
			author,
			publisher, // Adicionado
			price: priceNum,
			amount: amountNum,
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
					value={title}
					onChange={(e) => setTitulo(e.target.value)}
					placeholder="Título do Livro"
					required
				/>
				<input
					type="text"
					value={author}
					onChange={(e) => setAutor(e.target.value)}
					placeholder="Autor"
					required
				/>
				<input // Novo campo para Editora
					type="text"
					value={publisher}
					onChange={(e) => setEditora(e.target.value)}
					placeholder="Editora"
					required
				/>
				<input
					type="number"
					value={price}
					onChange={(e) => setPreco(e.target.value)}
					placeholder="Preço (R$)"
					step="0.01"
					min="0"
					required
				/>
				<input
					type="number"
					value={amount}
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
