const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
	buyer: {
		type: String, // Idealmente, isso seria uma referência: mongoose.Schema.Types.ObjectId, ref: 'User'
		required: [true, 'Comprador é necessário'],
		trim: true
	},
	books: {
		type: String,
		required: [true, 'Livros é necessário'],
		trim: true
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
