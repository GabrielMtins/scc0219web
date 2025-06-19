const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
	id: {
		type: Number,
		required: [true, 'ID é necessário'],
		unique: [true, 'ID deve ser único'],
	},
	buyer: {
		type: String, // Idealmente, isso seria uma referência: mongoose.Schema.Types.ObjectId, ref: 'User'
		required: [true, 'Comprador é necessário'],
		trim: true
	},
	title: {
		type: String,
		required: [true, 'Título é necessário'],
		trim: true
	},
	amount: {
		type: Number,
		required: [true, 'Quantidade é necessária'],
	},
	price: {
		type: Number,
		required: [true, 'Preço é necessário'],
	},
	date: {
		type: String,
		default: () => { return new Date().toISOString().split('T')[0]; },
		immutable: false
	}
});

module.exports = mongoose.model('Sale', saleSchema);