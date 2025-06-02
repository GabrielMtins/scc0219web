import React, { useState, useEffect } from 'react';

import './CheckoutSection.css';

// Dados mock para as opções "existentes"
const mockExistingData = {
	comprador: [
		{ id: 'c1', nomeCompleto: 'Ana Silva', email: 'ana.silva@example.com', telefone: '11987654321' },
		{ id: 'c2', nomeCompleto: 'Bruno Costa', email: 'bruno.costa@example.com', telefone: '21912345678' },
	],
	endereco: [
		{ id: 'e1', ruaNumero: 'Rua das Palmeiras, 100', bairro: 'Centro', cidade: 'São Paulo', cep: '01001-000' },
		{ id: 'e2', ruaNumero: 'Avenida Copacabana, 200', bairro: 'Copacabana', cidade: 'Rio de Janeiro', cep: '22020-001' },
	],
	pagamento: [ // Para pagamento, vamos usar um apelido para o select, os dados reais seriam preenchidos
		{ id: 'p1', apelido: 'Cartão Visa Final 1234', numeroCartao: '**** **** **** 1234', validade: '12/27', cvv: '***' },
		{ id: 'p2', apelido: 'Cartão Master Final 5678', numeroCartao: '**** **** **** 5678', validade: '10/26', cvv: '***' },
	],
};


const CheckoutSection = () => {
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
		pagamento: false,
	});
	const [selectedExisting, setSelectedExisting] = useState({
		comprador: '',
		endereco: '',
		pagamento: '',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
		if (errors[name]) {
			setErrors(prev => ({ ...prev, [name]: '' }));
		}
	};

	const handleToggleExisting = (section) => {
		setShowExisting(prev => {
			const isSwitchingToExisting = !prev[section];
			if (isSwitchingToExisting) {
				// Limpar campos e erros da seção ao mudar para "usar existente"
				let fieldsToClear = {};
				let errorsToClear = {};
				if (section === 'comprador') {
					fieldsToClear = { nomeCompleto: '', email: '', telefone: '' };
					errorsToClear = { nomeCompleto: '', email: '', telefone: '' };
				} else if (section === 'endereco') {
					fieldsToClear = { ruaNumero: '', bairro: '', cidade: '', cep: '' };
					errorsToClear = { ruaNumero: '', bairro: '', cidade: '', cep: '' };
				} else if (section === 'pagamento') {
					fieldsToClear = { numeroCartao: '', validade: '', cvv: '' };
					errorsToClear = { numeroCartao: '', validade: '', cvv: '' };
				}
				setFormData(prevData => ({ ...prevData, ...fieldsToClear }));
				setErrors(prevErrors => ({ ...prevErrors, ...errorsToClear }));
				setSelectedExisting(prevSelected => ({ ...prevSelected, [section]: '' }));
			} else {
				// Voltando para "cadastrar novo", reseta a seleção existente
				setSelectedExisting(prevSelected => ({ ...prevSelected, [section]: '' }));
			}
			return { ...prev, [section]: !prev[section] };
		});
	};

	const handleSelectExisting = (section, id) => {
		setSelectedExisting(prev => ({ ...prev, [section]: id }));
		const selectedItem = mockExistingData[section].find(item => item.id === id);

		if (selectedItem) {
			let dataToSet = { ...selectedItem };
			if (section === 'pagamento') {
				// Buscar os dados completos, se necessário
			}
			delete dataToSet.apelido;
			delete dataToSet.id;

			setFormData(prevData => ({
				...prevData,
				...dataToSet,
			}));
			// Limpa erros da seção
			let errorsToClear = {};
			if (section === 'comprador') errorsToClear = { nomeCompleto: '', email: '', telefone: '' };
			else if (section === 'endereco') errorsToClear = { ruaNumero: '', bairro: '', cidade: '', cep: '' };
			else if (section === 'pagamento') errorsToClear = { numeroCartao: '', validade: '', cvv: '' };
			setErrors(prevErrors => ({ ...prevErrors, ...errorsToClear }));
		}
	};

	const validate = () => {
		const newErrors = {};
		// Comprador
		if (!showExisting.comprador || !selectedExisting.comprador) {
			if (!formData.nomeCompleto.trim()) newErrors.nomeCompleto = 'Nome completo é obrigatório.';
			if (!formData.email.trim()) newErrors.email = 'E-mail é obrigatório.';
			else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Formato de e-mail inválido.';
			if (!formData.telefone.trim()) newErrors.telefone = 'Telefone é obrigatório.';
			else if (!/^\d{10,11}$/.test(formData.telefone.replace(/\D/g, ''))) newErrors.telefone = 'Formato de telefone inválido (apenas números, 10 ou 11 dígitos).';
		}

		// Endereço
		if (!showExisting.endereco || !selectedExisting.endereco) {
			if (!formData.ruaNumero.trim()) newErrors.ruaNumero = 'Rua e número são obrigatórios.';
			if (!formData.bairro.trim()) newErrors.bairro = 'Bairro é obrigatório.';
			if (!formData.cidade.trim()) newErrors.cidade = 'Cidade é obrigatória.';
			if (!formData.cep.trim()) newErrors.cep = 'CEP é obrigatório.';
			else if (!/^\d{5}-?\d{3}$/.test(formData.cep)) newErrors.cep = 'Formato de CEP inválido (XXXXX-XXX ou XXXXXXXX).';
		}

		// Pagamento
		if (!showExisting.pagamento || !selectedExisting.pagamento) {
			if (!formData.numeroCartao.trim()) newErrors.numeroCartao = 'Número do cartão é obrigatório.';
			else if (!/^\d{13,19}$/.test(formData.numeroCartao.replace(/\s/g, ''))) newErrors.numeroCartao = 'Número do cartão inválido.';

			if (!formData.validade.trim()) newErrors.validade = 'Validade é obrigatória.';
			else {
				const [mesStr, anoStr] = formData.validade.split('/');
				if (!mesStr || !anoStr || !/^(0[1-9]|1[0-2])$/.test(mesStr) || !/^\d{2}$/.test(anoStr)) {
					newErrors.validade = 'Formato de validade inválido (MM/AA).';
				} else {
					const mes = parseInt(mesStr, 10);
					const ano = parseInt(`20${anoStr}`, 10);
					const hoje = new Date();
					const dataExpiracao = new Date(ano, mes, 1); // Primeiro dia do mês seguinte à expiração
					if (dataExpiracao <= hoje) {
						newErrors.validade = 'Cartão expirado.';
					}
				}
			}
			if (!formData.cvv.trim()) newErrors.cvv = 'CVV é obrigatório.';
			else if (!/^\d{3,4}$/.test(formData.cvv)) newErrors.cvv = 'CVV inválido (3 ou 4 dígitos).';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (validate()) {
			console.log('Formulário válido! Dados enviados:', formData);
			// Enviar os dados para o backend aqui
			alert('Compra finalizada com sucesso! (Verifique o console para os dados)');
		} else {
			console.log('Formulário inválido. Erros:', errors);
			alert('Por favor, corrija os erros no formulário.');
		}
	};

	// Helper para renderizar campos ou select
	const renderSectionFields = (sectionName, fieldsConfig, existingDataList) => {
		if (showExisting[sectionName]) {
			return (
				<>
					<button type="button" className="btn-toggle" onClick={() => handleToggleExisting(sectionName)}>
						Cadastrar Novo
					</button>
					<div className="form-group">
						<label htmlFor={`${sectionName}-select`}>Selecionar {sectionName.replace(/^\w/, c => c.toUpperCase())} Existente</label>
						<select
							id={`${sectionName}-select`}
							className="form-control"
							value={selectedExisting[sectionName]}
							onChange={(e) => handleSelectExisting(sectionName, e.target.value)}
						>
							<option value="">-- Selecione --</option>
							{existingDataList.map(item => (
								<option key={item.id} value={item.id}>
									{sectionName === 'comprador' ? `${item.nomeCompleto} (${item.email})` :
										sectionName === 'endereco' ? `${item.ruaNumero}, ${item.cidade}` :
											item.apelido || `Opção ${item.id}` 
									}
								</option>
							))}
						</select>
						{selectedExisting[sectionName] && mockExistingData[sectionName].find(i => i.id === selectedExisting[sectionName]) && (
							<div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#f9f9f9', border: '1px solid #eee', borderRadius: '4px' }}>
								{Object.entries(mockExistingData[sectionName].find(i => i.id === selectedExisting[sectionName])).map(([key, value]) => {
									if (key !== 'id' && key !== 'cvv') { 
										const displayKey = key.replace(/([A-Z])/g, ' $1').replace(/^\w/, c => c.toUpperCase());
										return <p key={key} style={{ margin: '2px 0', fontSize: '0.9em' }}><strong>{displayKey}:</strong> {key === 'numeroCartao' && typeof value === 'string' ? value.slice(-4).padStart(value.length, '*') : value}</p>
									}
									return null;
								})}
							</div>
						)}
					</div>
				</>
			);
		} else {
			return (
				<>
					<button type="button" className="btn-toggle" onClick={() => handleToggleExisting(sectionName)}>
						Usar {sectionName.replace(/^\w/, c => c.toUpperCase())} Existente
					</button>
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
							{errors[field.name] && <p style={{ color: 'red', fontSize: '0.8em', marginTop: '4px' }}>{errors[field.name]}</p>}
						</div>
					))}
				</>
			);
		}
	};


	return (
		<div className="checkout-main-content">
			<h1>Finalizar Compra</h1>
			<form className="form-compra" onSubmit={handleSubmit} noValidate> {/* noValidate desabilita validação HTML5 padrão */}

				{/* Seção Comprador */}
				<div className="checkout-section-container">
					<h2>Comprador</h2>
					{renderSectionFields('comprador', [
						{ name: 'nomeCompleto', label: 'Nome completo', type: 'text', required: true },
						{ name: 'email', label: 'E-mail', type: 'email', required: true },
						{ name: 'telefone', label: 'Telefone', type: 'tel', placeholder: 'Ex: 11999998888', required: true },
					], mockExistingData.comprador)}
				</div>

				{/* Seção Endereço de Entrega */}
				<div className="checkout-section-container">
					<h2>Endereço de Entrega</h2>
					{renderSectionFields('endereco', [
						{ name: 'ruaNumero', label: 'Rua e número', type: 'text', required: true },
						{ name: 'bairro', label: 'Bairro', type: 'text', required: true },
						{ name: 'cidade', label: 'Cidade', type: 'text', required: true },
						{ name: 'cep', label: 'CEP', type: 'text', placeholder: 'Ex: 00000-000', required: true },
					], mockExistingData.endereco)}
				</div>

				{/* Seção Método de Pagamento */}
				<div className="checkout-section-container">
					<h2>Método de Pagamento</h2>
					{renderSectionFields('pagamento', [
						{ name: 'numeroCartao', label: 'Número do Cartão', type: 'text', placeholder: 'XXXX XXXX XXXX XXXX', required: true },
						{ name: 'validade', label: 'Validade (MM/AA)', type: 'text', placeholder: 'MM/AA', required: true },
						{ name: 'cvv', label: 'CVV', type: 'text', placeholder: 'XXX ou XXXX', required: true },
					], mockExistingData.pagamento)}
				</div>

				<button type="submit" className="btn-comprar">Confirmar Compra</button>
			</form>
		</div>
	);
};

export default CheckoutSection;