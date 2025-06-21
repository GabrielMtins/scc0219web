import React, { useState, useMemo, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../contexts/LoginContext';
import { useCar } from '../contexts/CarContext';

import './CheckoutSection.css';

const CheckoutSection = () => {
	const { user, loading } = useLogin();
	const { updateCarToServer } = useCar();
	const navigate = useNavigate();
	
	useEffect(() => {
		if (!loading) {
		  if (!user) navigate('/login');
		}
	}, [user, loading, navigate]);

	const ProfileData = useMemo(() => {
		if (!user) {
			return { comprador: null, endereco: null };
		}
		return {
			comprador: { nomeCompleto: user.fullname || '', email: user.email || '' },
			endereco: { endereco: user.address || '', cep: user.cep || '' },
		};
	}, [user]);

	const initialFormData = {
		nomeCompleto: '',
		email: '',
		endereco: '',
		cep: '',
		numeroCartao: '',
		validade: '', // MM/AA
		cvv: '',
	};

	const [formData, setFormData] = useState(initialFormData);
	const [errors, setErrors] = useState({});
	const [showExisting, setShowExisting] = useState({
		comprador: false,
		endereco: false,
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
		if (errors[name]) {
			setErrors(prev => ({ ...prev, [name]: '' }));
		}
	};

	const handleToggleExisting = (section) => {
		const isSwitchingToProfile = !showExisting[section];
		let fieldsToClear = {};
		let errorsToClear = {};
		let dataToSet = {};

		if (section === 'comprador') {
			fieldsToClear = { nomeCompleto: '', email: '' };
			errorsToClear = { nomeCompleto: '', email: '' };
			if (isSwitchingToProfile && ProfileData.comprador) {
				dataToSet = ProfileData.comprador;
			}
		} else if (section === 'endereco') {
			fieldsToClear = { endereco: '', cep: '' };
			errorsToClear = { endereco: '', cep: '' };
			if (isSwitchingToProfile && ProfileData.endereco) {
				dataToSet = ProfileData.endereco;
			}
		}

		setFormData(prevData => ({ ...prevData, ...fieldsToClear, ...dataToSet }));
		setErrors(prevErrors => ({ ...prevErrors, ...errorsToClear }));
		setShowExisting(prev => ({ ...prev, [section]: isSwitchingToProfile }));
	};

	const validate = async () => {
		const newErrors = {};
		// Validação do Comprador
		if (!formData.nomeCompleto.trim()) newErrors.nomeCompleto = 'Nome completo é obrigatório.';
		if (!formData.email.trim()) newErrors.email = 'E-mail é obrigatório.';
		else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Formato de e-mail inválido.';

		// Validação do Endereço
		if (!formData.endereco.trim()) newErrors.endereco = 'Endereço é obrigatório.';
		if (!formData.cep.trim()) newErrors.cep = 'CEP é obrigatório.';
		else if (!/^\d{5}-?\d{3}$/.test(formData.cep)) newErrors.cep = 'Formato de CEP inválido (use XXXXX-XXX).';

		// Validação do Pagamento
		if (!formData.numeroCartao.trim()) newErrors.numeroCartao = 'Número do cartão é obrigatório.';
		else if (!/^\d{13,19}$/.test(formData.numeroCartao.replace(/\s/g, ''))) newErrors.numeroCartao = 'Número do cartão inválido.';

		if (!formData.validade.trim()) newErrors.validade = 'Validade é obrigatória.';
		else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.validade)) {
			newErrors.validade = 'Formato da validade inválido (use MM/AA).';
		} else {
			const [mesStr, anoStr] = formData.validade.split('/');
			const mes = parseInt(mesStr, 10);
			const ano = parseInt(`20${anoStr}`, 10);
			const hoje = new Date();
			// Um cartão é válido até o último dia do mês de expiração.
			const ultimoDiaDoMesDeExpiracao = new Date(ano, mes, 0);

			if (ultimoDiaDoMesDeExpiracao < hoje) {
				newErrors.validade = 'Cartão expirado.';
			}
		}
		if (!formData.cvv.trim()) newErrors.cvv = 'CVV é obrigatório.';
		else if (!/^\d{3,4}$/.test(formData.cvv)) newErrors.cvv = 'CVV inválido.';

		
		setErrors(newErrors);
		return newErrors;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const validationErrors = await validate();

		if (Object.keys(validationErrors).length === 0) {
			console.log('Formulário válido! Dados enviados:', formData);
			toast.success('Compra finalizada com sucesso!');
			navigate('/');

			await updateCarToServer(user.username);
		} else {
			console.log('Formulário inválido. Erros:', validationErrors);
			toast.error('Por favor, corrija os erros no formulário.');
		}
	};
	
	const errorStyle = { color: 'red', fontSize: '0.8em', marginTop: '4px' };

	const renderSectionFields = (sectionName, fieldsConfig) => {
		const profileData = ProfileData[sectionName];

		if (showExisting[sectionName] && profileData) {
			return (
				<>
					<div className="profile-data-display">
						{sectionName === 'comprador' && (
							<>
								<p><strong>Nome:</strong> {profileData.nomeCompleto}</p>
								<p><strong>Email:</strong> {profileData.email}</p>
							</>
						)}
						{sectionName === 'endereco' && (
							<>
								<p><strong>Endereço:</strong> {profileData.endereco}</p>
								<p><strong>CEP:</strong> {profileData.cep}</p>
							</>
						)}
					</div>
					<button type="button" className="btn-toggle" onClick={() => handleToggleExisting(sectionName)}>
						Digitar outro
					</button>
				</>
			);
		} else {
			return (
				<>
					{fieldsConfig.map(field => (
						<div className="form-group" key={field.name}>
							<label htmlFor={field.name}>{field.label}{field.required && '*'}</label>
							<input
								type={field.type}
								id={field.name}
								name={field.name}
								value={formData[field.name]}
								onChange={handleChange}
								placeholder={field.placeholder || ''}
								required={field.required}
							/>
							{errors[field.name] && <p style={errorStyle}>{errors[field.name]}</p>}
						</div>
					))}
					{profileData && (
						<button type="button" className="btn-toggle" onClick={() => handleToggleExisting(sectionName)}>
							Usar {sectionName === 'comprador' ? 'Dados' : 'Endereço'} do Perfil
						</button>
					)}
				</>
			);
		}
	};

	if (!user){
		navigate('/login');
	}

	return (
		<div className="checkout-main-content">
			<h1>Finalizar Compra</h1>
			<form className="form-compra" onSubmit={handleSubmit} noValidate>

				{/* Seção Comprador */}
				<div className="checkout-section-container">
					<h2>Comprador</h2>
					{renderSectionFields('comprador', [
						{ name: 'nomeCompleto', label: 'Nome completo', type: 'text', required: true },
						{ name: 'email', label: 'E-mail', type: 'email', required: true },
					])}
				</div>

				{/* Seção Endereço de Entrega */}
				<div className="checkout-section-container">
					<h2>Endereço de Entrega</h2>
					{renderSectionFields('endereco', [
						{ name: 'endereco', label: 'Endereço', type: 'text', required: true },
						{ name: 'cep', label: 'CEP', type: 'text', placeholder: 'Ex: 00000-000', required: true },
					])}
				</div>

				{/* Seção Método de Pagamento (sem alterações na estrutura) */}
				<div className="checkout-section-container">
					<h2>Método de Pagamento</h2>
					<div className="form-group">
						<label htmlFor="numeroCartao">Número do Cartão*</label>
						<input type="text" id="numeroCartao" name="numeroCartao" value={formData.numeroCartao} onChange={handleChange} placeholder="XXXX XXXX XXXX XXXX" required />
						{errors.numeroCartao && <p style={errorStyle}>{errors.numeroCartao}</p>}
					</div>
					<div className="form-group">
						<label htmlFor="validade">Validade (MM/AA)*</label>
						<input type="text" id="validade" name="validade" value={formData.validade} onChange={handleChange} placeholder="MM/AA" required />
						{errors.validade && <p style={errorStyle}>{errors.validade}</p>}
					</div>
					<div className="form-group">
						<label htmlFor="cvv">CVV*</label>
						<input type="text" id="cvv" name="cvv" value={formData.cvv} onChange={handleChange} placeholder="XXX ou XXXX" required />
						{errors.cvv && <p style={errorStyle}>{errors.cvv}</p>}
					</div>
				</div>

				<button type="submit" className="btn-comprar">Confirmar Compra</button>
			</form>
		</div>
	);
};

export default CheckoutSection;
