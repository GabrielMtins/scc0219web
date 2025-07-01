import { useState } from "react";
import { toast } from 'react-toastify';
import "./AddBookForm.css";

const AddBookForm = ({ onAdicionarLivro }) => {
	/* Estado do possível livro a ser adicionado */
	const [title, setTitulo] = useState('');
	const [author, setAutor] = useState('');
	const [publisher, setEditora] = useState(''); 
	const [price, setPreco] = useState('');
	const [amount, setQuantidade] = useState('');
	const [genre, setGenre] = useState('');
	const [img_link, setImgLink] = useState('');
	const [description, setDescription] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!title || !author || !publisher || !price || !amount || !img_link || !genre) { 
			toast.error('Por favor, preencha todos os campos, incluindo a publisher.');
			return;
		}

		const priceNum = parseFloat(price);
		const amountNum = parseInt(amount, 10);

		if (isNaN(priceNum) || priceNum < 0) {
			toast.error("O preço deve ser um número não negativo.");
			return;
		}
		if (isNaN(amountNum) || amountNum < 0) {
			toast.error("A amount deve ser um número inteiro não negativo.");
			return;
		}

		/* Enviar livro com os dados */
		onAdicionarLivro({
			'title': title,
			'author': author,
			'publisher': publisher, 
			'price': priceNum,
			'amount': amountNum,
			'img_link': img_link,
			'genre': genre,
			'description': description,
			'sales': 0
		});

		setTitulo('');
		setAutor('');
		setEditora(''); 
		setGenre('');
		setImgLink('');
		setPreco('');
		setQuantidade('');
		setDescription('');
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
				<input 
					type="text"
					value={publisher}
					onChange={(e) => setEditora(e.target.value)}
					placeholder="Editora"
					required
				/>
				<input 
					type="text"
					value={genre}
					onChange={(e) => setGenre(e.target.value)}
					placeholder="Gênero"
					required
				/>
				<input 
					type="text"
					value={img_link}
					onChange={(e) => setImgLink(e.target.value)}
					placeholder="Link para imagem"
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
				<input
					type="text"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					placeholder="Descrição"
					min="0"
					required
				/>
				<button type="submit" className="btn-adicionar">Adicionar ao Estoque</button>
			</form>
		</section>
	);
}

export default AddBookForm;
