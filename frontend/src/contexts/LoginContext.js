import { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const LOGIN_API_URL = 'http://localhost:5000/users';
const SALES_API_URL = 'http://localhost:5000/sales';

const LoginContext = createContext();

export function LoginProvider({ children }) {
	/* Variável que armazena os estados do usuário, inicialmente
	 * marcada como null. */
	const [user, setUser] = useState(null);

	const [loading, setLoading] = useState(false);

	/* Função que dada uma credencial retorna falso ou verdadeiro
	 * para indicar se foi possível fazer login. */
	const login = async (credentials) => {
		setLoading(true);

		try {
			console.log(credentials);

			const response = await axios.get(LOGIN_API_URL, 
				{
					params: credentials
				}
			);
			setUser(response.data);
			return true;
		} catch (error) {
			toast.error(error.response.data.error);
			return false;
		} finally {
			setLoading(false);
		}
	};

	/* Função de sign up, retorna verdadeiro e automaticamente
	 * troca para o usuário criado. */
	const signUp = async (credentials) => {
		setLoading(true);

		try {
			/* inserir api fake aqui */
			const response = await axios.post(LOGIN_API_URL, credentials);
			setUser(credentials);
			return true;
		} catch (error) {
			toast.error(error.response.data.error);
			return false;
		} finally {
			setLoading(false);
		}
	};
	
	/* Retorna todos os usuários cadastrados */
	const getAllUsers = async () => {
		try {
			const response = await axios.get(`${LOGIN_API_URL}/all`);
			return response.data;
		} catch(error) {
			return [];
		}
	};

	const updateUser = async (username) => {
		try {
			const updated = await axios.put(`${LOGIN_API_URL}/${username}`);
			return updated.data
		} catch(error) {
			console.log(error);
			return [];
		}
	}

	const deleteUser = async (username) => {
		try {
			const newUsers = await axios.delete(`${LOGIN_API_URL}/${username}`);
			return newUsers.data
		} catch(error) {
			console.log(error);
			return [];
		}
	}

	/* Retorna o histórico de vendas do usuário atual */
	const getSalesHistory = async () => {
		try {
			const response = await axios.get(`${SALES_API_URL}/${user.username}`);
			return response.data;
		} catch(error) {
			return [];
		}
	};

	/* Retorna o histórico de vendas completo */
	const getAllSalesHistory = async () => {
		try {
			const response = await axios.get(SALES_API_URL);
			return response.data;
		} catch(error) {
			return [];
		}
	};

	/* Função para logout, definindo o usuário para o padrão novamente. */
	const logout = () => {
		setUser(null);
	};

	return (
		<LoginContext.Provider value={{ user, login, signUp, loading, logout, getAllUsers, updateUser, deleteUser, getSalesHistory, getAllSalesHistory }}>
			{children}
		</LoginContext.Provider>
	);
}

export function useLogin() {
	return useContext(LoginContext);
}
