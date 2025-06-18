const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

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

// --- Modelo (Schema) de Tarefa ---
const postSchema = new mongoose.Schema({
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
		trim: true
	},
	amount: {
		type: Number,
		required: [true, 'Quantidade é necessária'],
		trim: true
	}
});

const Post = mongoose.model('Post', postSchema);

app.use((req, _res, next) => {
	console.log(`[${new Date().toISOString()}] ${req.method}`);
	next();
});

// --- Rotas da API (Endpoints) ---
// Rota para buscar todas as tarefas

// GET /posts  – lista todos os posts
app.get('/posts', async (req, res) => {
	try {
		const posts = await Post.find();
		res.json(posts);
	} catch (error) {
		console.error("Erro ao buscar o post:", error);
		res.status(500).json({ error: 'Falha ao recuperar o post' });
	}
});

// GET /posts/:id  – busca um post
app.get('/posts/:id', async (req, res) => {
	try {
		const postId = req.params.id;
		if (!mongoose.Types.ObjectId.isValid(postId)) {
				return res.status(400).json({ error: 'Formato de ID inválido' });
		}

		const post = await Post.findById(postId);

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
		const { author, img_link, title, price, genre, publisher, description, amount } = req.body;

		if (!author || !img_link || !title || !price || !genre || !publisher || !description || !amount) {
			return res.status(400).json({ error: 'Todos os campos são necessários' });
		}

		const newPost = new Post({ author, img_link, title, price, genre, publisher, description, amount });
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
		if (!mongoose.Types.ObjectId.isValid(postId)) {
				return res.status(400).json({ error: 'Formato de ID inválido' });
		}

		const { author, img_link, title, price, genre, publisher, description, amount } = req.body;
		if (!author || !img_link || !title || !price || !genre || !publisher || !description || !amount) {
			return res.status(400).json({ error: 'Todos os campos são necessários' });
		}

		const updatedPost = await Post.findByIdAndUpdate(
			postId,
			{ title, content, author },
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

// DELETE /posts/:id  – delete um post e retorna todos os posts
app.delete('/posts/:id', async (req, res) => {
	try {
		const postId = req.params.id;
		if (!mongoose.Types.ObjectId.isValid(postId)) {
				return res.status(400).json({ error: 'Formato de ID inválido' });
		}

		const deletedPost = await Post.findByIdAndDelete(postId);

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

// --- Iniciar o Servidor ---
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log('Servidor tem que estar em:', mongoURI);
});