import React, { useState } from 'react';
import "./EstoqueTable.css";

const EstoqueTable = ({ livros, onRemoveLivro, onAtualizarLivro }) => {
	const [editingRowId, setEditingRowId] = useState(null);
	const [editFormData, setEditFormData] = useState({ publisher: '', price: '', amount: '' }); // Editora adicionada

	if (!livros || livros.length === 0) {
		return (
			<section className="estoque">
				<h2 className="section-title">Estoque Atual</h2>
				<p style={{textAlign: 'center', padding: '1rem', backgroundColor: 'white', borderRadius: '8px'}}>Nenhum livro no estoque.</p>
			</section>
		);
	}

	const handleEditClick = (livro) => {
		setEditingRowId(livro.id);
		setEditFormData({
			publisher: livro.publisher, // Adicionado
			price: parseFloat(livro.price).toFixed(2),
			amount: livro.amount.toString()
		});
	};

	const handleCancelClick = () => {
		setEditingRowId(null);
	};

	const handleSaveClick = (livroId) => {
		onAtualizarLivro(livroId, { // Passa os dados do formulário de edição
			publisher: editFormData.publisher,
			price: editFormData.price,
			amount: editFormData.amount,
		});
		setEditingRowId(null);
	};

	const handleEditFormChange = (event) => {
		const { name, value } = event.target;
		setEditFormData(prevData => ({ ...prevData, [name]: value }));
	};

	return (
		<section className="estoque">
			<h2 className="section-title">Estoque Atual</h2>
			<form onSubmit={(e) => e.preventDefault()}>
				<table>
					<thead>
						<tr>
							<th>Título</th>
							<th>Autor</th>
							<th>Editora</th> {/* Nova coluna */}
							<th>Preço (R$)</th>
							<th>Quantidade</th>
							<th>Ações</th>
						</tr>
					</thead>
					<tbody>
						{livros.map((livro) => (
							<React.Fragment key={livro.id}>
								{editingRowId === livro.id ? (
									// Linha em modo de edição
									<tr>
										<td>{livro.titulo}</td>
										<td>{livro.autor}</td>
										<td> {/* Campo de edição para Editora */}
											<input
												type="text"
												name="publisher"
												value={editFormData.publisher}
												onChange={handleEditFormChange}
												className="edit-input edit-input-publisher" // Classe específica se precisar de estilo diferente
												required
											/>
										</td>
										<td>
											<input
												type="number"
												name="price"
												value={editFormData.price}
												onChange={handleEditFormChange}
												step="0.01"
												min="0"
												className="edit-input"
												required
											/>
										</td>
										<td>
											<input
												type="number"
												name="amount"
												value={editFormData.amount}
												onChange={handleEditFormChange}
												min="0"
												className="edit-input"
												required
											/>
										</td>
										<td className="actions-cell">
											<button type="button" onClick={() => handleSaveClick(livro.id)} className="btn-salvar">Salvar</button>
											<button type="button" onClick={handleCancelClick} className="btn-cancelar">Cancelar</button>
										</td>
									</tr>
								) : (
									// Linha em modo de visualização
									<tr>
										<td>{livro.title}</td>
										<td>{livro.author}</td>
										<td>{livro.publisher}</td> {/* Exibe a publisher */}
										<td>{parseFloat(livro.price).toFixed(2)}</td>
										<td>{livro.amount}</td>
										<td className="actions-cell">
											<button type="button" onClick={() => handleEditClick(livro)} className="btn-editar">Editar</button>
											<button
												type="button"
												className="btn-remover"
												onClick={() => onRemoveLivro(livro.id)}
											>
												Remover
											</button>
										</td>
									</tr>
								)}
							</React.Fragment>
						))}
					</tbody>
				</table>
			</form>
		</section>
	);
}

export default EstoqueTable;
