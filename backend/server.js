const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5001;

const mongoURI = 'mongodb://localhost:27017/mydb';

// --- Middlewares ---
app.use(cors()); // Permite requisições de outras origens (o nosso frontend)
app.use(express.json()); // Permite que o express entenda requisições com corpo em JSON

// --- Conexão com o MongoDB ---
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB conectado com sucesso!'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// --- Modelo (Schema) de Tarefa ---
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

const postSchema = new mongoose.Schema({
	id: {
		type: Number,
		required: [true, 'ID é necessário'],
		unique: [true, 'ID deve ser único'],
		trim: true
	},
	author: {
		type: String,
		required: [true, 'Autor é necessário'],
		trim: true
	},
	img_link: {
		type: String,
		required: [true, 'Imagem é necessária'],
		unique: [true, 'Imagem deve ser única'],
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
		trim: true
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
		unique: [true, 'Descrição deve ser única'],
		trim: true
	},
	amount: {
		type: Number,
		required: [true, 'Quantidade é necessária'],
		trim: true
	}
});

const saleSchema = new mongoose.Schema({
	id: {
		type: Number,
		required: [true, 'ID é necessário'],
		unique: [true, 'ID deve ser único'],
		trim: true
	},
	buyer: {
		type: String,
		required: [true, 'Título é necessário'],
		trim: true
	},
	title: {
		type: String,
		required: [true, 'Título é necessário'],
		unique: [true, 'Título deve ser único'],
		trim: true
	},
	amount: {
		type: Number,
		required: [true, 'Quantidade é necessária'],
		trim: true
	},
	price: {
		type: Number,
		required: [true, 'Preço é necessário'],
		trim: true
	},
	date: {
		type: String,
		default: () => {return new Date().toISOString().split('T')[0];},
		immutable: false
	}	
})	

const Post = mongoose.model('Post', postSchema);
const User = mongoose.model('User', userSchema);
const Sale = mongoose.model('Sale', saleSchema);

app.use((req, _res, next) => {
	console.log(`[${new Date().toISOString()}] ${req.method}`);
	next();
});	

// --- Rotas da API ---
// Rota para buscar todas as tarefas

// GET /users/all  – lista todos os users
app.get('/users/all', async (req, res) => {
	try {
		const posts = await User.find();
		res.json(posts);
	} catch (error) {
		console.error("Erro ao buscar os usuários:", error);
		res.status(500).json({ error: 'Falha ao recuperar os usuários' });
	}
});

// GET /users  – busca um post (parâmetros passados no front)
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
		const { fullname, username, address, password, cep, email } = req.body;

		const newUser = new User({ fullname, username, address, password, cep, email });
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

// DELETE /posts/:username  – deleta um user
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

// GET /posts  – lista todos os posts
app.get('/posts', async (req, res) => {
	try {
		const posts = await Post.find();
		res.json(posts);
	} catch (error) {
		console.error("Erro ao buscar os posts:", error);
		res.status(500).json({ error: 'Falha ao recuperar os posts' });
	}	
});	

// GET /posts/:id  – busca um post
app.get('/posts/:id', async (req, res) => {
	try {
		const postId = req.params.id;

		const post = await Post.findOne({ id: postId });

		if (!post) {
			return res.status(404).json({ error: `Post ${postId} não encontrado` });
		}	
		res.json(post);
	} catch (error) {
		console.error(`Erro ao buscar o post ${req.params.id}:`, error);
		res.status(500).json({ error: 'Falha ao recuperar o post' });
	}	
});	

// POST /posts  – cria um novo post e retorna todos os posts
app.post('/posts', async (req, res) => {
	try {
		const { id, author, img_link, title, price, genre, publisher, description, amount } = req.body;

		if (!id || !author || !img_link || !title || !price || !genre || !publisher || !description || !amount) {
			return res.status(400).json({ error: 'Todos os campos são necessários' });
		}	

		const newPost = new Post({ id, author, img_link, title, price, genre, publisher, description, amount });
		const savedPost = await newPost.save();
		const posts = await Post.find()

		res.status(201).json(posts);
	} catch (error) {
		console.error("Erro ao criar o post:", error);
		if (error.name === 'ValidationError') {
				return res.status(400).json({ error: error.message });
		}		
		res.status(500).json({ error: 'Falha ao criar o post' });
	}	
});	

// PUT /posts/:id  – altera um post existente e retorna todos os posts
app.put('/posts/:id', async (req, res) => {
	try {
		const postId = req.params.id;

		const { id, author, img_link, title, price, genre, publisher, description, amount } = req.body;
		if (!id || !author || !img_link || !title || !price || !genre || !publisher || !description || !amount) {
			return res.status(400).json({ error: 'Todos os campos são necessários' });
		}	

		const updatedPost = await Post.findOneAndUpdate(
			{ id: postId },
			{ id, author, img_link, title, price, genre, publisher, description, amount },
			{ new: true, runValidators: true }
		);	

		if (!updatedPost) {
			return res.status(404).json({ error: `Post ${postId} não encontrado` });
		}	

		const posts = await Post.find()

		res.json(posts);
	} catch (error) {
		console.error(`Erro no update do post ${req.params.id}:`, error);
		if (error.name === 'ValidationError') {
				return res.status(400).json({ error: error.message });
		}		
		res.status(500).json({ error: 'Falha no update do post' });
	}	
});	

// DELETE /posts/:id  – deleta um post e retorna todos os posts
app.delete('/posts/:id', async (req, res) => {
	try {
		const postId = req.params.id;

		const deletedPost = await Post.findOneAndDelete({ id: postId });

		if (!deletedPost) {
			return res.status(404).json({ error: `Post ${postId} não encontrado` });
		}	

		const posts = await Post.find()

		res.json(posts);
	} catch (error) {
		console.error(`Erro deletando post ${req.params.id}:`, error);
		res.status(500).json({ error: 'Falha ao deletar o post' });
	}	
});	

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
		const saleId = req.params.id;

		const sale = await Sale.findOne({ id: saleId });

		if (!sale) {
			return res.status(404).json({ error: `Venda ${saleId} não encontrada` });
		}
		res.json(sale);
	} catch (error) {
		console.error(`Erro ao buscar a venda ${req.params.id}:`, error);
		res.status(500).json({ error: 'Falha ao recuperar a venda' });
	}
});

// POST /sales  – cria uma nova venda e retorna todos as vendas
app.post('/sales', async (req, res) => {
	try {
		const { id, buyer, title, amount, price } = req.body;

		if (!id || !buyer || !title || !amount || !price) {
			return res.status(400).json({ error: 'Todos os campos são necessários' });
		}

		const newSale = new Sale({ id, buyer, title, amount, price });
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