import React, { useState, useEffect } from 'react';
import { useLogin } from '../contexts/LoginContext';
import "./UserManagement.css";

const UserManagement = () => {
	// Funções do contexto de login
	const { getAllUsers, updateUser, deleteUser } = useLogin();
	
	// Estados do componente
	const [users, setUsers] = useState([]);
	// CORREÇÃO: Renomeado para maior clareza, agora armazena o username em edição
	const [editingUsername, setEditingUsername] = useState(null); 
	const [editFormData, setEditFormData] = useState({});

	// Efeito para buscar os usuários da API
	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const userList = await getAllUsers();
				if (userList) {
					setUsers(userList);
				}
			} catch (error) {
				console.error("Falha ao buscar usuários:", error);
			}
		};

		fetchUsers();
	}, [getAllUsers]);

	// Inicia o modo de edição para um usuário
	const handleEditClick = (user) => {
		setEditingUsername(user.username); // CORREÇÃO: Usa o username do usuário
		setEditFormData({ ...user });
	};

	// Cancela o modo de edição
	const handleCancelClick = () => {
		setEditingUsername(null);
	};

	// Salva as alterações feitas em um usuário
	const handleSaveClick = async (username) => {
		// --- ADICIONE ESTA LINHA PARA DEPURAR ---
		console.log("Enviando estes dados para a API:", editFormData);
		// -----------------------------------------

		try {
			const updatedUser = await updateUser(username, editFormData);

			const updatedUsers = users.map((user) =>
				user.username === username ? updatedUser : user
			);
			setUsers(updatedUsers);
			setEditingUsername(null); 
		} catch (error) {
			console.error("Falha ao atualizar usuário:", error);
		}
	};

	// Exclui um usuário
	const handleDeleteClick = async (username) => {
		try {
			await deleteUser(username); 

			// Remove o usuário da lista localmente
			const newUsers = users.filter((user) => user.username !== username);
			setUsers(newUsers);
		} catch (error) {
			console.error("Falha ao excluir usuário:", error);
		}
	};
	
	// Atualiza o estado do formulário a cada mudança nos inputs
	const handleInputChange = (event) => {
		const { name, value } = event.target;
		
		const isCheckboxOrSelectBoolean = name === 'admin';
		const finalValue = isCheckboxOrSelectBoolean ? (value === 'true') : value;

		setEditFormData({ ...editFormData, [name]: finalValue });
	};

	return (
		<div className="user-management-container">
			<h2 className="section-title">Gerenciar Usuários</h2>
			<div className="table-wrapper">
				<table className="user-table">
					<thead>
						<tr>
							<th>Nome Completo</th>
							<th>Usuário</th>
							<th>Email</th>
							<th>CEP</th>
							<th>Endereço</th>
							<th>Telefone</th>
							<th>Função</th>
							<th className="actions-cell">Ações</th>
						</tr>
					</thead>
					<tbody>
						{users.map(user => (
							<React.Fragment key={user.username}> {/* CORREÇÃO: Usando username como chave */}
								{editingUsername === user.username ? ( // CORREÇÃO: Comparação com username
									// --- MODO DE EDIÇÃO ---
									<tr className="edit-row">
										<td><input type="text" name="fullname" value={editFormData.fullname} onChange={handleInputChange} /></td>
										{/* MUDANÇA CRÍTICA: Campo username desabilitado para garantir estabilidade */}
										<td><input type="text" name="username" value={editFormData.username} onChange={handleInputChange} disabled /></td>
										<td><input type="email" name="email" value={editFormData.email} onChange={handleInputChange} /></td>
										<td><input type="text" name="cep" value={editFormData.cep} onChange={handleInputChange} /></td>
										<td><input type="text" name="address" value={editFormData.address} onChange={handleInputChange} /></td>
										<td><input type="text" name="phone" value={editFormData.phone} onChange={handleInputChange} /></td>
										<td>
											<select name="admin" value={editFormData.admin} onChange={handleInputChange}>
												<option value={true}>Admin</option>
												<option value={false}>Cliente</option>
											</select>
										</td>
										<td className="actions-cell">
											{/* CORREÇÃO: Passando user.username para a função */}
											<button onClick={() => handleSaveClick(user.username)} className="btn-action btn-salvar">Salvar</button>
											<button onClick={handleCancelClick} className="btn-action btn-cancelar">Cancelar</button>
										</td>
									</tr>
								) : (
									// --- MODO DE VISUALIZAÇÃO ---
									<tr>
										<td>{user.fullname}</td>
										<td>{user.username}</td>
										<td>{user.email}</td>
										<td>{user.cep}</td>
										<td>{user.address}</td>
										<td>{user.phone}</td>
										<td>{user.admin ? 'Admin' : 'Cliente'}</td>
										<td className="actions-cell">
											{/* CORREÇÃO: Passando o objeto user ou o user.username */}
											<button onClick={() => handleEditClick(user)} className="btn-action btn-editar">Editar</button>
											<button onClick={() => handleDeleteClick(user.username)} className="btn-action btn-excluir">Excluir</button>
										</td>
									</tr>
								)}
							</React.Fragment>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default UserManagement;