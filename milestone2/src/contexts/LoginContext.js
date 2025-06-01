import { createContext, useContext, useState } from 'react';

const LoginContext = createContext();

const fakeLoginAPI = async (credentials) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve({});
		}, 250);
	});
};

const fakeSignUpAPI = async (credentials) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve({});
		}, 500);
	});
};

export function LoginProvider({children}) {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(false);

	const login = async (credentials) => {
		setLoading(true);

		try {
			/* inserir api fake aqui */
			const response = await fakeLoginAPI(credentials);
			setUser(credentials);
			return true;
		} catch(error) {
			console.error("Login failed: ", error);
			return false;
		} finally {
			setLoading(false);
		}
	};

	const signUp = async (credentials) => {
		setLoading(true);

		try {
			/* inserir api fake aqui */
			const response = await fakeSignUpAPI(credentials);
			setUser(credentials);
			return true;
		} catch(error) {
			console.error("Login failed: ", error);
			return false;
		} finally {
			setLoading(false);
		}
	};

	return (
		<LoginContext.Provider value={{user, login, signUp, loading}}>
			{children}
		</LoginContext.Provider>
	);
}

export function useLogin() {
	return useContext(LoginContext);
}
