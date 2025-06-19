import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useLogin } from '../contexts/LoginContext';

import './CheckoutSection.css';

const CheckoutSection = () => {
	const { user } = useLogin();

	const ProfileData = {
		comprador: {nomeCompleto: user.fullname, email: user.email},
		endereco: {ruaNumero: user.address, cep: user.cep },
	};

	const initialFormData = {
		nomeCompleto: '',
		email: '',
		telefone: '',
		ruaNumero: '',
		bairro: '',
		cidade: '',
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
            fieldsToClear = { nomeCompleto: '', email: '', telefone: '' };
            errorsToClear = { nomeCompleto: '', email: '', telefone: '' };
            if (isSwitchingToProfile) {
                dataToSet = { ...ProfileData.comprador };
                delete dataToSet.id;
            }
        } else if (section === 'endereco') {
            fieldsToClear = { ruaNumero: '', bairro: '', cidade: '', cep: '' };
            errorsToClear = { ruaNumero: '', bairro: '', cidade: '', cep: '' };
            if (isSwitchingToProfile) {
                dataToSet = { ...ProfileData.endereco };
                delete dataToSet.id;
            }
        }

        setFormData(prevData => ({ ...prevData, ...fieldsToClear, ...dataToSet }));
        setErrors(prevErrors => ({ ...prevErrors, ...errorsToClear }));
		setShowExisting(prev => ({ ...prev, [section]: isSwitchingToProfile }));
	};


	const validate = () => {
		const newErrors = {};
		// Validação do Comprador
		if (!formData.nomeCompleto.trim()) newErrors.nomeCompleto = 'Nome completo é obrigatório.';
		if (!formData.email.trim()) newErrors.email = 'E-mail é obrigatório.';
		else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Formato de e-mail inválido.';
		if (!formData.telefone.trim()) newErrors.telefone = 'Telefone é obrigatório.';
		else if (!/^\d{10,11}$/.test(formData.telefone.replace(/\D/g, ''))) newErrors.telefone = 'Formato de telefone inválido.';

		// Validação do Endereço
		if (!formData.ruaNumero.trim()) newErrors.ruaNumero = 'Rua e número são obrigatórios.';
		if (!formData.bairro.trim()) newErrors.bairro = 'Bairro é obrigatório.';
		if (!formData.cidade.trim()) newErrors.cidade = 'Cidade é obrigatória.';
		if (!formData.cep.trim()) newErrors.cep = 'CEP é obrigatório.';
		else if (!/^\d{5}-?\d{3}$/.test(formData.cep)) newErrors.cep = 'Formato de CEP inválido.';

		// Validação do Pagamento
		if (!formData.numeroCartao.trim()) newErrors.numeroCartao = 'Número do cartão é obrigatório.';
		else if (!/^\d{13,19}$/.test(formData.numeroCartao.replace(/\s/g, ''))) newErrors.numeroCartao = 'Número do cartão inválido.';

		if (!formData.validade.trim()) newErrors.validade = 'Validade é obrigatória.';
		else {
			const [mesStr, anoStr] = formData.validade.split('/');
			if (!mesStr || !anoStr || !/^(0[1-9]|1[0-2])$/.test(mesStr) || !/^\d{2}$/.test(anoStr)) {
				newErrors.validade = 'Validade inválida.';
			} else {
				const mes = parseInt(mesStr, 10);
				const ano = parseInt(`20${anoStr}`, 10);
				const hoje = new Date();
				const dataExpiracao = new Date(ano, mes, 1);
				if (dataExpiracao <= hoje) {
					newErrors.validade = 'Cartão expirado.';
				}
			}
		}
		if (!formData.cvv.trim()) newErrors.cvv = 'CVV é obrigatório.';
		else if (!/^\d{3,4}$/.test(formData.cvv)) newErrors.cvv = 'CVV inválido.';
		
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (validate()) {
			console.log('Formulário válido! Dados enviados:', formData);
			toast.success('Compra finalizada com sucesso! (Verifique o console para os dados)');
		} else {
			console.log('Formulário inválido. Erros:', errors);
			toast.error('Por favor, corrija os erros no formulário.');
		}
	};
    
    // Define o estilo do erro como uma constante para evitar repetição
    const errorStyle = { color: 'red', fontSize: '0.8em', marginTop: '4px' };

	// Helper para renderizar campos ou os dados do perfil
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
                                <p><strong>Endereço:</strong> {profileData.ruaNumero}</p>
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
                            {/* MUDANÇA AQUI */}
							{errors[field.name] && <p style={errorStyle}>{errors[field.name]}</p>}
						</div>
					))}
					{profileData && (
                        <button type="button" className="btn-toggle" onClick={() => handleToggleExisting(sectionName)}>
						    Usar {sectionName.replace(/^\w/, c => c.toUpperCase())} do Perfil
					    </button>
                    )}
				</>
			);
		}
	};


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
						{ name: 'telefone', label: 'Telefone', type: 'tel', placeholder: 'Ex: 11999998888', required: true },
					])}
				</div>

				{/* Seção Endereço de Entrega */}
				<div className="checkout-section-container">
					<h2>Endereço de Entrega</h2>
					{renderSectionFields('endereco', [
						{ name: 'ruaNumero', label: 'Rua e número', type: 'text', required: true },
						{ name: 'bairro', label: 'Bairro', type: 'text', required: true },
						{ name: 'cidade', label: 'Cidade', type: 'text', required: true },
						{ name: 'cep', label: 'CEP', type: 'text', placeholder: 'Ex: 00000-000', required: true },
					])}
				</div>

				{/* Seção Método de Pagamento */}
				<div className="checkout-section-container">
					<h2>Método de Pagamento</h2>
					<>
						<div className="form-group" key="numeroCartao">
							<label htmlFor="numeroCartao">Número do Cartão*</label>
							<input type="text" id="numeroCartao" name="numeroCartao" value={formData.numeroCartao} onChange={handleChange} placeholder="XXXX XXXX XXXX XXXX" required />
							{/* MUDANÇA AQUI */}
							{errors.numeroCartao && <p style={errorStyle}>{errors.numeroCartao}</p>}
						</div>
						<div className="form-group" key="validade">
							<label htmlFor="validade">Validade (MM/AA)*</label>
							<input type="text" id="validade" name="validade" value={formData.validade} onChange={handleChange} placeholder="MM/AA" required />
                            {/* MUDANÇA AQUI */}
							{errors.validade && <p style={errorStyle}>{errors.validade}</p>}
						</div>
						<div className="form-group" key="cvv">
							<label htmlFor="cvv">CVV*</label>
							<input type="text" id="cvv" name="cvv" value={formData.cvv} onChange={handleChange} placeholder="XXX ou XXXX" required />
                            {/* MUDANÇA AQUI */}
							{errors.cvv && <p style={errorStyle}>{errors.cvv}</p>}
						</div>
					</>
				</div>

				<button type="submit" className="btn-comprar">Confirmar Compra</button>
			</form>
		</div>
	);
};

export default CheckoutSection;