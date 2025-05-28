import '../palette.css'
import './Home.css'
import Bookcard from '../components/Bookcard.js'
import Booklist from '../components/Booklist.js'

function Catalogo() {
	let book_example = {
		author: 'George Orwell',
		img_link: 'https://m.media-amazon.com/images/I/819js3EQwbL._AC_UF1000,1000_QL80_.jpg',
		title: '1984',
		price: 'R$ 29,90'
	};

	let book_list_example = [
		book_example,
		book_example,
		book_example,
		book_example,
		book_example,
		book_example,
		book_example,
		book_example,
		book_example,
		book_example,
	];

	return (
		<div className="page">
			<div class="hero-image"></div>

			<div className="main-content">
				<h1> Bem vindo à Livraria Pedro II</h1>
				<h2> Conheça o nosso catálogo: </h2>
			</div>

			<Booklist book_list={book_list_example} />
		</div>
	);
}

export default Catalogo;
