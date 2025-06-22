const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// --- Modelos ---
const User = require('./models/User');
const Book = require('./models/Book');
const Sale = require('./models/Sale');

const app = express();
const PORT = 5000;

const mongoURI = 'mongodb://localhost:27017/mydb';

// --- Middlewares ---
app.use(cors()); // Permite requisições de outras origens (o nosso frontend)
app.use(express.json()); // Permite que o express entenda requisições com corpo em JSON

// --- Conexão com o MongoDB ---
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB conectado com sucesso!'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

app.use((req, _res, next) => {
	console.log(`[${new Date().toISOString()}] ${req.method}`);
	next();
});	

// ----------------------------------
// ---------- Rotas da API ----------
// ----------------------------------
// Rota para buscar todas as tarefas

// ---------- USERS ----------
// GET /users/all  – lista todos os users
app.get('/users/all', async (req, res) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (error) {
		console.error("Erro ao buscar os usuários:", error);
		res.status(500).json({ error: 'Falha ao recuperar os usuários' });
	}
});

// GET /users  – busca um usuário (parâmetros passados no front)
app.get('/users', async (req, res) => {
	try {
		const { username, password } = req.query;

		const credentials = await User.findOne({username: username});

		if(!credentials){
			return res.status(500).json({ error: 'Usuário não existe.'});
		}

		if(credentials.password != password) {
			return res.status(500).json({ error: 'Senha incorreta.'});
		}

		res.json(credentials);
	} catch (error) {
		console.error("Erro ao logar:", error);
		res.status(500).json({ error: 'Erro ao logar.' });
	}
});

// POST /users  – cria um novo user e retorna ele
app.post('/users', async (req, res) => {
	try {
		const { fullname, username, address, phone, password, cep, email } = req.body;
		const cart = "{}";

		const newUser = new User({ fullname, username, address, phone, password, cep, email, cart });
		const savedUser = await newUser.save();

		res.status(201).json(newUser);
	} catch (error) {
		console.log(error.name);
		res.status(500).json({ error: 'Usuário ou email indisponíveis' });
	}
});

// PUT /users/:username  – altera um user existente e retorna ele
app.put('/users/:username', async (req, res) => {
	try {
		const targetName = req.params.username;

		const { fullname, username, email, address, cep, password } = req.body;
		if (!fullname || !username || !email || !address || !cep || !password) {
			return res.status(400).json({ error: 'Todos os campos são necessários' });
		}

		const updatedUser = await User.findOneAndUpdate(
			{ username: targetName },
			{ fullname, username, email, address, cep, password },
			{ new: true, runValidators: true }
		);

		if (!updatedUser) {
			return res.status(404).json({ error: `Usuário ${targetName} não encontrado` });
		}

		res.status(200).json(updatedUser);
	} catch (error) {
		console.error(`Erro no update do usuário ${req.params.id}:`, error);
		if (error.name === 'ValidationError') {
				return res.status(400).json({ error: error.message });
		}
		res.status(500).json({ error: 'Falha no update do usuário' });
	}
})

// PUT /users/:username  – altera os itens do carrinho do usuário
app.put('/users/cart/:username', async (req, res) => {
	try {
		const targetName = req.params.username;

		const { cart } = req.body;
		if (!cart) {
			return res.status(400).json({ error: 'Todos os campos são necessários' });
		}

		const updatedUser = await User.findOneAndUpdate(
			{ username: targetName },
			{ cart },
			{ new: true, runValidators: true }
		);

		if (!updatedUser) {
			return res.status(404).json({ error: `Usuário ${targetName} não encontrado` });
		}

		res.status(200).json(updatedUser);
	} catch (error) {
		console.error(`Erro no update do usuário ${req.params.id}:`, error);
		if (error.name === 'ValidationError') {
				return res.status(400).json({ error: error.message });
		}
		res.status(500).json({ error: 'Falha no update do usuário' });
	}
})

// DELETE /users/:username  – deleta um user
app.delete('/users/:username', async (req, res) => {
	try {
		const targetName = req.params.username;

		const deletedUser = await User.findOneAndDelete({ username: targetName });

		if (!deletedUser) {
			return res.status(404).json({ error: `Usuário ${targetName} não encontrado` });
		}

		res.status(200);
	} catch (error) {
		console.error(`Erro deletando usuário ${req.params.id}:`, error);
		res.status(500).json({ error: 'Falha ao deletar o usuário' });
	}
})

// ---------- BOOKS ----------
// GET /books  – lista todos os livros
app.get('/books', async (req, res) => {
	try {
		const books = await Book.find();
		res.json(books);
	} catch (error) {
		console.error("Erro ao buscar os livros:", error);
		res.status(500).json({ error: 'Falha ao recuperar os livros' });
	}
});

// GET /books/:id  – busca um livro
app.get('/books/:id', async (req, res) => {
	try {
		const bookId = req.params.id;

		const book = await Book.findOne({ id: bookId });

		if (!book) {
			return res.status(404).json({ error: `Livro ${bookId} não encontrado` });
		}
		res.json(book);
	} catch (error) {
		console.error(`Erro ao buscar o livro ${req.params.id}:`, error);
		res.status(500).json({ error: 'Falha ao recuperar o livro' });
	}
});

// POST /books  – cria um novo livro e retorna todos os livros
app.post('/books', async (req, res) => {
	try {
		const { id, author, img_link, title, price, genre, publisher, description, amount, sales} = req.body;

		if (!id || !author || !img_link || !title || !price || !genre || !publisher || !description || isNaN(amount) || isNaN(sales)) {
			return res.status(400).json({ error: 'Todos os campos são necessários' });
		}

		const newBook = new Book({ id, author, img_link, title, price, genre, publisher, description, amount, sales });
		await newBook.save();
		const books = await Book.find();

		res.status(201).json(books);
	} catch (error) {
		console.error("Erro ao criar o livro:", error);
		if (error.name === 'ValidationError') {
			return res.status(400).json({ error: error.message });
		}
		res.status(500).json({ error: 'Falha ao criar o livro' });
	}
});

// PUT /books/:id  – altera um livro existente e retorna todos os livros
app.put('/books/:id', async (req, res) => {
	try {
		const bookId = req.params.id;

		const { id, author, img_link, title, price, genre, publisher, description, amount, sales} = req.body;
		if (!id || !author || !img_link || !title || !price || !genre || !publisher || !description || isNaN(amount) || isNaN(sales)) {
			return res.status(400).json({ error: 'Todos os campos são necessários' });
		}

		const updatedBook = await Book.findOneAndUpdate(
			{ id: bookId },
			{ id, author, img_link, title, price, genre, publisher, description, amount, sales },
			{ new: true, runValidators: true }
		);

		if (!updatedBook) {
			return res.status(404).json({ error: `Livro ${bookId} não encontrado` });
		}

		const books = await Book.find();

		res.json(books);
	} catch (error) {
		console.error(`Erro na atualização do livro ${req.params.id}:`, error);
		if (error.name === 'ValidationError') {
			return res.status(400).json({ error: error.message });
		}
		res.status(500).json({ error: 'Falha na atualização do livro' });
	}
});

// DELETE /books/:id  – deleta um livro e retorna todos os livros
app.delete('/books/:id', async (req, res) => {
	try {
		const bookId = req.params.id;

		const deletedBook = await Book.findOneAndDelete({ id: bookId });

		if (!deletedBook) {
			return res.status(404).json({ error: `Livro ${bookId} não encontrado` });
		}

		const books = await Book.find();

		res.json(books);
	} catch (error) {
		console.error(`Erro ao deletar o livro ${req.params.id}:`, error);
		res.status(500).json({ error: 'Falha ao deletar o livro' });
	}
});

// ---------- SALES ----------
// GET /sales  – lista todos as vendas
app.get('/sales', async (req, res) => {
	try {
		const sales = await Sale.find();
		res.json(sales);
	} catch (error) {
		console.error("Erro ao buscar as vendas:", error);
		res.status(500).json({ error: 'Falha ao recuperar as vendas' });
	}
});

// GET /sales/:id  – busca uma venda
app.get('/sales/:id', async (req, res) => {
	try {
		const buyerName = req.params.id;

		const sales = await Sale.find({ buyer: buyerName });

		const first_sales = sales.sort((sale) => sale.date).slice(0, 5);

		res.json(first_sales);
	} catch (error) {
		console.error(`Erro ao buscar a venda ${req.params.id}:`, error);
		res.status(500).json({ error: 'Falha ao recuperar a venda' });
	}
});

// POST /sales  – cria uma nova venda e retorna todos as vendas
app.post('/sales', async (req, res) => {
	try {
		const { buyer, books, price } = req.body;

		if (!buyer || !books || !price) {
			return res.status(400).json({ error: 'Todos os campos são necessários' });
		}

		const newSale = new Sale({ buyer, books, price });
		const savedSale = await newSale.save();
		const sales = await Sale.find()

		res.status(201).json(sales);
	} catch (error) {
		console.error("Erro ao criar a venda:", error);
		if (error.name === 'ValidationError') {
				return res.status(400).json({ error: error.message });
		}
		res.status(500).json({ error: 'Falha ao criar a venda' });
	}
});

// PUT /sales/:id  – altera uma venda existente e retorna todos as vendas
app.put('/sales/:id', async (req, res) => {
	try {
		const saleId = req.params.id;

		const { id, buyer, title, amount, price } = req.body;
		if (!id || !buyer || !title || !amount || !price) {
			return res.status(400).json({ error: 'Todos os campos são necessários' });
		}

		const updatedSale = await Sale.findOneAndUpdate(
			{ id: saleId },
			{ id, buyer, title, amount, price },
			{ new: true, runValidators: true }
		);

		if (!updatedSale) {
			return res.status(404).json({ error: `Venda ${saleId} não encontrada` });
		}

		const sales = await Sale.find()

		res.json(sales);
	} catch (error) {
		console.error(`Erro no update da venda ${req.params.id}:`, error);
		if (error.name === 'ValidationError') {
				return res.status(400).json({ error: error.message });
		}
		res.status(500).json({ error: 'Falha no update da venda' });
	}
});

// DELETE /sales/:id  – deleta uma venda e retorna todos as vendas
app.delete('/sales/:id', async (req, res) => {
	try {
		const saleId = req.params.id;

		const deletedSale = await Sale.findOneAndDelete({ id: saleId });

		if (!deletedSale) {
			return res.status(404).json({ error: `Venda ${saleId} não encontrada` });
		}

		const sales = await Sale.find()

		res.json(sales);
	} catch (error) {
		console.error(`Erro deletando venda ${req.params.id}:`, error);
		res.status(500).json({ error: 'Falha ao deletar a venda' });
	}
});

// --- Iniciar o Servidor ---
app.listen(PORT, '0.0.0.0', () => {
	console.log(`Servidor rodando na porta ${PORT}`);
	console.log('Servidor tem que estar em:', mongoURI);
});
