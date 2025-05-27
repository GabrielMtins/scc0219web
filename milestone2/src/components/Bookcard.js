import './Bookcard.css'

function Bookcard({book}) {
	return (
		<div className="livro-card">
			<img src={book.img_link} alt={book.title} />

			<div className="livro-info">
				<h3> {book.title} </h3>
				<p className="autor"> {book.author} </p>
				<p className="preco"> {book.price} </p>
				<button className="btn-comprar"> Comprar </button>
			</div>
		</div>
	);
}

export default Bookcard;
