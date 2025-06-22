const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
	id: {
		type: Number,
		required: [true, 'ID é necessário'],
		unique: [true, 'ID deve ser único'],
	},
	author: {
		type: String,
		required: [true, 'Autor é necessário'],
		trim: true
	},
	img_link: {
		type: String,
		required: [true, 'Imagem é necessária'],
		trim: true
	},
	title: {
		type: String,
		required: [true, 'Título é necessário'],
		unique: [true, 'Título deve ser único'],
		trim: true
	},
	price: {
		type: Number,
		required: [true, 'Preço é necessário'],
	},
	genre: {
		type: String,
		required: [true, 'Gênero é necessário'],
		trim: true
	},
	publisher: {
		type: String,
		required: [true, 'Editora é necessária'],
		trim: true
	},
	description: {
		type: String,
		required: [true, 'Descrição é necessária'],
		trim: true
	},
	amount: {
		type: Number,
		required: [true, 'Quantidade é necessária'],
	},
	sales: {
		type: Number,
		required: [true, 'Vendas é necessária'],
	}
});

module.exports = mongoose.model('Book', bookSchema);
