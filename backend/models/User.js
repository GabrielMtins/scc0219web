const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	fullname: {
		type: String,
		required: [true, 'Nome completo é necessário'],
		trim: true
	},
	username: {
		type: String,
		required: [true, 'Nome de usuário é necessário'],
		unique: [true, 'Nome de usuário deve ser único'],
		trim: true
	},
	email: {
		type: String,
		required: [true, 'Email é necessário'],
		unique: [true, 'Email deve ser único'],
		trim: true
	},
	cep: {
		type: String,
		required: [true, 'CEP é necessário'],
		trim: true
	},
	address: {
		type: String,
		required: [true, 'Endereço é necessário'],
		trim: true
	},
	password: {
		type: String,
		required: [true, 'Senha é necessária'],
		trim: true
	}
});

module.exports = mongoose.model('User', userSchema);