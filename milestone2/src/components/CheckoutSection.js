import { useState, useEffect } from 'react';

const CheckoutSection = ({
  title,
  dataSectionName,
  selectOptions,
  formFields,
  onDataChange,
  initialSelectValue,
  initialFormValues,
  initialIsNew
}) => {
  const [showForm, setShowForm] = useState(initialIsNew || false);
  const [formValues, setFormValues] = useState(initialFormValues || {});
  const [currentSelectValue, setCurrentSelectValue] = useState(initialSelectValue || (selectOptions[0]?.value || ''));

  useEffect(() => {
    // Notifica o componente pai sobre o estado atual desta seção
    onDataChange(dataSectionName, showForm, formValues, currentSelectValue);
  }, [showForm, formValues, currentSelectValue, dataSectionName, onDataChange]);

  const handleToggle = () => {
    setShowForm(prev => !prev);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e) => {
    setCurrentSelectValue(e.target.value);
  };

  return (
    <div className="checkout-section-container">
      <h2>{title}</h2>

      {!showForm && (
        <select
          id={`${dataSectionName}-select`}
          value={currentSelectValue}
          onChange={handleSelectChange}
          aria-label={`Selecionar ${title}`}
        >
          {selectOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      )}

      <button type="button" className="btn-toggle" onClick={handleToggle}>
        {showForm ? `Usar ${dataSectionName.replace('_', ' ')} existente` : `Cadastrar novo ${dataSectionName.replace('_', ' ')}`}
      </button>

      {showForm && (
        <div id={`${dataSectionName}-form`} className="form-fields-container">
          {formFields.map(field => (
            <div className="form-group" key={field.id}>
              <label htmlFor={`${dataSectionName}-${field.id}`}>{field.label}</label>
              <input
                type={field.type}
                id={`${dataSectionName}-${field.id}`}
                name={field.name}
                value={formValues[field.name] || ''}
                onChange={handleInputChange}
                placeholder={field.placeholder || ''}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CheckoutSection;