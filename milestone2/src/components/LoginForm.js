import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import "./Form.css"

const LoginForm = () => {
	const [inputData, setInputData] = useState("")

	const handleSubmit = (e) => {
		console.log(e)
	}

	return (
		<div className="form-container">
			<h2>Login</h2>
			
			<div>
				<div className="input">
					<label>Usuário:</label>
					<input type="text" required/>
				</div>

				<div className="input">
					<label>Senha:</label>
					<input type="password" required/>
				</div>
			</div>

			<div>Esqueceu a senha? <Link to="/recover"> Mudar senha</Link></div>
			<div>Ainda não tem conta? <Link to="/singUp">Criar conta</Link></div>

			<div className="submit-container">
				<div className="submit" onClick={() => {handleSubmit()}}>Entrar</div>
			</div>
		</div>
	);
}

export default LoginForm;