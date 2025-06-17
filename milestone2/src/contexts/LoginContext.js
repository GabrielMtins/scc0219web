import { createContext, useContext, useState } from 'react';

const LoginContext = createContext();

/* API fake de login, utilizando apenas um time para indicar o tempo
 * de resposta do servidor. No futuros será substituído por uma API
 * do backend. */
const fakeLoginAPI = async (credentials) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve({});
		}, 250);
	});
};

/* API fake de sign up, no mesmo estilo da anterior. */
const fakeSignUpAPI = async (credentials) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve({});
		}, 500);
	});
};

export function LoginProvider({ children }) {
	/* Variável que armazena os estados do usuário, inicialmente
	 * marcada como null. */
	const [user, setUser] = useState(null);

	const [loading, setLoading] = useState(false);

	/* Função de login que tenta acessar o servidor
	 * dado as credenciais. Utiliza a API falsa, mas que será
	 * substituída pela verdadeira na milestone 3. */
	const login = async (credentials) => {
		setLoading(true);

		try {
			/* inserir api fake aqui */
			const response = await fakeLoginAPI(credentials);
			setUser(credentials);
			return true;
		} catch (error) {
			console.error("Login failed: ", error);
			return false;
		} finally {
			setLoading(false);
		}
	};

	/* Função de login que tenta criar uma conta no servidor
	 * dado as credenciais. Utiliza a API falsa, mas que será
	 * substituída pela verdadeira na milestone 3. */
	const signUp = async (credentials) => {
		setLoading(true);

		try {
			/* inserir api fake aqui */
			const response = await fakeSignUpAPI(credentials);
			setUser(credentials);
			return true;
		} catch (error) {
			console.error("Login failed: ", error);
			return false;
		} finally {
			setLoading(false);
		}
	};

	/* Função para logout, definindo o usuário para o padrão novamente. */
	const logout = () => {
		setUser(null);
	};

	return (
		<LoginContext.Provider value={{ user, login, signUp, loading, logout }}>
			{children}
		</LoginContext.Provider>
	);
}

export function useLogin() {
	return useContext(LoginContext);
}
