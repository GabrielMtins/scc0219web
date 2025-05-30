import React, { useState } from 'react';
import "./EstoqueTable.css";

const EstoqueTable = ({ livros, onRemoveLivro, onAtualizarLivro }) => {
  const [editingRowId, setEditingRowId] = useState(null);
  const [editFormData, setEditFormData] = useState({ editora: '', preco: '', quantidade: '' }); // Editora adicionada

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
      editora: livro.editora, // Adicionado
      preco: parseFloat(livro.preco).toFixed(2),
      quantidade: livro.quantidade.toString()
    });
  };

  const handleCancelClick = () => {
    setEditingRowId(null);
  };

  const handleSaveClick = (livroId) => {
    onAtualizarLivro(livroId, { // Passa os dados do formulário de edição
      editora: editFormData.editora,
      preco: editFormData.preco,
      quantidade: editFormData.quantidade,
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
                        name="editora"
                        value={editFormData.editora}
                        onChange={handleEditFormChange}
                        className="edit-input edit-input-editora" // Classe específica se precisar de estilo diferente
                        required
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="preco"
                        value={editFormData.preco}
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
                        name="quantidade"
                        value={editFormData.quantidade}
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
                    <td>{livro.titulo}</td>
                    <td>{livro.autor}</td>
                    <td>{livro.editora}</td> {/* Exibe a editora */}
                    <td>{parseFloat(livro.preco).toFixed(2)}</td>
                    <td>{livro.quantidade}</td>
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