import { useState } from "react";
import { Link } from "react-router-dom";
import "./Form.css";

const RecoverForm = () => {
	const [step, setStep] = useState("email");

	const nextStep = ({ id, aTag, pTag }) => {
		const elemento = document.getElementById(id).value;
		let val = false;

		if (aTag === "email") {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			val = emailRegex.test(elemento); // Add teste real
		} else if (aTag === "code") {
			if (elemento.length >= 4) { // Mudar para teste real
				val = true;
			}
		} else if (aTag === "password") {
			if ((elemento.length >= 6)) {
				if (elemento === document.getElementById("passwordInput2").value) {
					val = true
					// Passar mudança para a base de dados
				}
			} else {
				alert("A senha deve ter ao menos 6 dígitos")
				return false;
			}
		}

		if (val) {
			document.getElementById(aTag).classList.add("hidden");
			if (pTag != "") {
				document.getElementById(pTag).classList.remove("hidden");
			}
		} else {
			alert("Dados inválidos.");
			return false
		}

		return true
	};

	return (
		<div className="form-container">
			<h2 id="title">Recuperar Senha</h2>

			<div>
				<div id="email" className="input">
					<label>Digite seu email:</label>
					<input type="email" id="emailInput" required />
				</div>

				<div id="code" className="hidden input">
					<label>Digite o código de verificação:</label>
					<input type="text" id="codeInput" required />
				</div>

				<div id="password" className="hidden">
					<div className="input">
						<label>Nova senha:</label>
						<input type="password" id="passwordInput1" required />
					</div>
					<div className="input">
						<label>Confirme a nova senha:</label>
						<input type="password" id="passwordInput2" required />
					</div>
				</div>
			</div>

			<div className="submit-container">
				<input
					id="submit"
					className="submit"
					type="submit"
					value="Avançar"
					onClick={() => {
						if (step === "email") {
							if (nextStep({ id: "emailInput", aTag: "email", pTag: "code" })) {
								setStep("code")
							}
						} else if (step === "code") {
							if (nextStep({ id: "codeInput", aTag: "code", pTag: "password" })) {
								setStep("password")
							}
						} else if (step === "password") {
							if (nextStep({ id: "passwordInput1", aTag: "password", pTag: "" })) {
								document.getElementById("submit").classList.add("hidden");
								document.getElementById("title").textContent = "Senha alterada com sucesso";
							}
						}
					}}
				/>
			</div>
		</div>
	);
};

export default RecoverForm;
