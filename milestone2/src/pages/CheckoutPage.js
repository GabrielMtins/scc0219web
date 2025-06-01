import { useState } from 'react';
import CheckoutSection from '../components/CheckoutSection';
import './CheckoutPage.css';

const CheckoutPage = () => {
	const compradorFields = [
		{ label: 'Nome completo', id: 'comprador-nome', name: 'nome', type: 'text', required: true },
		{ label: 'E-mail', id: 'comprador-email', name: 'email', type: 'email', required: true, validationType: 'email' },
		{ label: 'Telefone', id: 'comprador-telefone', name: 'telefone', type: 'tel', required: true, validationType: 'phone' },
	];
	const enderecoFields = [
		{ label: 'Rua e número', id: 'endereco-rua', name: 'rua', type: 'text', required: true },
		{ label: 'Bairro', id: 'endereco-bairro', name: 'bairro', type: 'text', required: true },
		{ label: 'Cidade', id: 'endereco-cidade', name: 'cidade', type: 'text', required: true },
		{ label: 'CEP', id: 'endereco-cep', name: 'cep', type: 'text', required: true, validationType: 'cep' },
	];
	const pagamentoFields = [
		{ label: 'Número do Cartão', id: 'pagamento-cartao', name: 'cartao', type: 'text', required: true, validationType: 'cardNumber' },
		{ label: 'Validade (MM/AA)', id: 'pagamento-validade', name: 'validade', type: 'text', placeholder: 'MM/AA', required: true, validationType: 'expiryDate' },
		{ label: 'CVV', id: 'pagamento-cvv', name: 'cvv', type: 'text', required: true, validationType: 'cvv' },
	];

	const compradorOptions = [ { value: 'perfil1', label: 'João Silva (Salvo)' }, { value: 'perfil2', label: 'Maria Oliveira (Salvo)'} ];
	const enderecoOptions = [ { value: 'end1', label: 'Rua A, 123 - São Paulo, SP (Salvo)' }, { value: 'end2', label: 'Av. B, 456 - Rio de Janeiro, RJ (Salvo)'} ];
	const pagamentoOptions = [ { value: 'cartao1', label: 'Visa •••• 1234 (Salvo)' }, { value: 'cartao2', label: 'Mastercard •••• 5678 (Salvo)'} ];

	const initialSectionData = (options, fields) => {
		const initialFormVals = {};
		fields.forEach(field => { initialFormVals[field.name] = ''; });
		return {
			selectValue: options[0]?.value || '',
			isNew: false,
			formValues: initialFormVals,
		};
	};

	const [checkoutData, setCheckoutData] = useState({
		comprador: initialSectionData(compradorOptions, compradorFields),
		endereco: initialSectionData(enderecoOptions, enderecoFields),
		pagamento: initialSectionData(pagamentoOptions, pagamentoFields),
	});

	const handleSectionDataChange = (sectionName, isNew, formValuesData, selectValueData) => {
		setCheckoutData(prev => ({
			...prev,
			[sectionName]: {
				isNew: isNew,
				formValues: formValuesData,
				selectValue: selectValueData
			}
		}));
	};

	const validateFieldSimple = (value, fieldConfig) => {
		const { label, required, validationType } = fieldConfig;
		const val = String(value || '').trim();

		if (required && val === "") {
			alert(`O campo '${label}' é obrigatório.`);
			return false;
		}
		if (val === "") return true; // Não valida formato se não for obrigatório e estiver vazio

		switch (validationType) {
			case 'email':
				if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
					alert(`Formato de e-mail inválido.`);
					return false;
				}
				break;
			case 'phone':
				if (!/^\d{10,11}$/.test(val.replace(/\D/g, ''))) {
					alert(`Telefone inválido (10 ou 11 dígitos).`);
					return false;
				}
				break;
			case 'cep':
				if (!/^\d{5}-?\d{3}$/.test(val)) {
					alert(`CEP inválido (ex: 12345-678 ou 12345678).`);
					return false;
				}
				break;
			case 'cardNumber':
				if (!/^\d{13,19}$/.test(val.replace(/\s/g, ''))) {
					alert(`Número do cartão inválido (13 a 19 dígitos).`);
					return false;
				}
				break;
			case 'expiryDate':
				if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(val)) {
					alert(`Formato de validade inválido (MM/AA).`);
					return false;
				}
				// Validação simples de expiração (não verifica mês atual no ano atual)
				const parts = val.match(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/);
				if (parts) {
						const year = parseInt(`20${parts[2]}`, 10);
						const currentYear = new Date().getFullYear();
						if (year < currentYear) {
								 alert(`Cartão expirado (campo '${label}').`);
								 return false;
						}
				}
				break;
			case 'cvv':
				if (!/^\d{3,4}$/.test(val)) {
					alert(`CVV inválido (3 ou 4 dígitos).`);
					return false;
				}
				break;
			default:
				// Nenhuma validação de formato específica além de 'required'
				break;
		}
		return true;
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const finalPayload = {};
		let formIsValid = true;

		const sectionsConfig = {
				comprador: { options: compradorOptions, fields: compradorFields },
				endereco: { options: enderecoOptions, fields: enderecoFields },
				pagamento: { options: pagamentoOptions, fields: pagamentoFields }
		};

		for (const sectionName in checkoutData) {
			const sectionState = checkoutData[sectionName];
			const currentSectionConfig = sectionsConfig[sectionName];

			if (sectionState.isNew) { // Validar apenas se o formulário de cadastro estiver ativo
				finalPayload[sectionName] = {}; 
				for (const field of currentSectionConfig.fields) {
					const value = sectionState.formValues[field.name] || '';
					if (!validateFieldSimple(value, field)) {
						formIsValid = false;
						return;
					}
					finalPayload[sectionName][field.name] = value;
				}
			} else {
				const selectedOption = currentSectionConfig.options.find(opt => opt.value === sectionState.selectValue);
				finalPayload[sectionName] = selectedOption ? selectedOption.label : sectionState.selectValue;
			}
		}

		if (!formIsValid) {
			return;
		}

		console.log('Dados finais da compra (validados):', finalPayload);
		alert('Compra confirmada! (simulação)');
		// Enviar finalPayload para o backend
	};

	return (
		<div className="checkout-main-content">
			<h1>Finalizar Compra</h1>
			<form className="form-compra" onSubmit={handleSubmit} noValidate>
				<CheckoutSection
					title="Comprador"
					dataSectionName="comprador"
					selectOptions={compradorOptions}
					formFields={compradorFields}
					onDataChange={handleSectionDataChange}
					initialSelectValue={checkoutData.comprador.selectValue}
					initialFormValues={checkoutData.comprador.formValues}
					initialIsNew={checkoutData.comprador.isNew}
				/>
				<CheckoutSection
					title="Endereço de Entrega"
					dataSectionName="endereco"
					selectOptions={enderecoOptions}
					formFields={enderecoFields}
					onDataChange={handleSectionDataChange}
					initialSelectValue={checkoutData.endereco.selectValue}
					initialFormValues={checkoutData.endereco.formValues}
					initialIsNew={checkoutData.endereco.isNew}
				/>
				<CheckoutSection
					title="Método de Pagamento"
					dataSectionName="pagamento"
					selectOptions={pagamentoOptions}
					formFields={pagamentoFields}
					onDataChange={handleSectionDataChange}
					initialSelectValue={checkoutData.pagamento.selectValue}
					initialFormValues={checkoutData.pagamento.formValues}
					initialIsNew={checkoutData.pagamento.isNew}
				/>
				<button type="submit" className="btn-comprar">Confirmar Compra</button>
			</form>
		</div>
	);
};

export default CheckoutPage;
