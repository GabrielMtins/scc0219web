import "./Form.css";
import { useLogin } from '../contexts/LoginContext';
import { toast } from 'react-toastify';

const SignInForm = () => {
	const { signUp } = useLogin();

	const validate = async () => {
		const nome = document.getElementById("nome").value.trim();
		const usuario = document.getElementById("usuario").value.trim();
		const email = document.getElementById("email").value.trim();
		const endereco = document.getElementById("endereco").value.trim();
		const cep = document.getElementById("cep").value.trim();
		const senha = document.getElementById("senha").value;
		const confirmarSenha = document.getElementById("confirmarSenha").value;

		if (!nome || !usuario || !email || !endereco || !cep || !senha || !confirmarSenha) {
			alert("Por favor, preencha todos os campos.");
			return;
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			alert("Email inválido.");
			return;
		}

		const cepRegex = /^\d{5}-?\d{3}$/;
		if (!cepRegex.test(cep)) {
			alert("CEP inválido. Use o formato 12345-678.");
			return;
		}

		if (senha.length < 6) {
			alert("A senha deve ter pelo menos 6 caracteres.");
			return;
		}

		if (senha !== confirmarSenha) {
			alert("As senhas não coincidem.");
			return;
		}

		// Enviar dados para o backend
		const credentials = {
			"fullname": nome,
			"username": usuario,
			"email": email,
			"address": endereco,
			"cep": cep,
			"password": senha
		};

		const success = await signUp(credentials);

		if (success) {
			const inputs = document.querySelectorAll('.input');
			inputs.forEach((input) => { input.classList.add('hidden'); });

			document.getElementById("submit").classList.add("hidden");
			document.getElementById("title").textContent = "Conta criada com sucesso";
		}
		else {
			toast.error('Falha no cadastro. Por favor, tente novamente mais tarde.');
		}
	};

	return (
		<div className="form-container">
			<h2 id="title">Criar Conta</h2>

			<div className="input">
				<label>Nome completo:</label>
				<input type="text" id="nome" required />
			</div>

			<div className="input">
				<label>Usuário:</label>
				<input type="text" id="usuario" required />
			</div>

			<div className="input">
				<label>Email:</label>
				<input type="email" id="email" required />
			</div>

			<div className="input">
				<label>Endereço:</label>
				<input type="text" id="endereco" required />
			</div>

			<div className="input">
				<label>CEP:</label>
				<input type="text" id="cep" placeholder="Ex: 12345-678" required />
			</div>

			<div className="input">
				<label>Senha:</label>
				<input type="password" id="senha" required />
			</div>

			<div className="input">
				<label>Confirmar Senha:</label>
				<input type="password" id="confirmarSenha" required />
			</div>

			<div className="submit-container">
				<input id="submit" className="submit" type="submit" value="Criar Conta" onClick={validate} />
			</div>
		</div>
	);
};

export default SignInForm;
