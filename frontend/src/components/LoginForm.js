import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useLogin } from '../contexts/LoginContext';
import { useCar } from '../contexts/CarContext';
import "./Form.css";
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")

	const { user, login, loading } = useLogin();
	const { setCurrentUsername, setCar } = useCar();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		if (!username) {
			toast.error("Insira o nome de usuário.");
			return;
		}

		if (!password) {
			toast.error("Insira a senha.");
			return;
		}

		const success = await login({
			"username": username,
			"password": password
		});

		if (success) {
			navigate('/');
			toast.success('Login feito com sucesso!');
		}
	};

	useEffect(() => {
		if(user != null) {
			setCurrentUsername(user.username);
			setCar(car => JSON.parse(user.cart));
			console.log(user.cart);
		}
	}, [user]);

	return (
		<div className="form-container">
			<h2>Login</h2>

			<div>
				<div className="input">
					<label>Usuário:</label>
					<input type="text" required onChange={(event) => setUsername(event.target.value)} />
				</div>

				<div className="input">
					<label>Senha:</label>
					<input type="password" required onChange={(event) => setPassword(event.target.value)} />
				</div>
			</div>

			<div>Ainda não tem conta? <Link to="/singUp">Criar conta</Link></div>

			<div className="submit-container">
				<div className="submit" onClick={handleSubmit}>Entrar</div>
			</div>
		</div>
	);
}

export default LoginForm;
