import './Booklist.css'
import Bookcard from './Bookcard'

function Booklist({book_list}) {
	return (
		<div className="livros-container">
			{book_list.map((book) => <Bookcard book={book} />)}
		</div>
	);
}

export default Booklist;
