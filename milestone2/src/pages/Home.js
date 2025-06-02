import '../palette.css';
import './Home.css';
import Bookcard from '../components/Bookcard.js';
import Booklist from '../components/Booklist.js';

import { useCar } from '../contexts/CarContext';

function Home() {
	const { catalog } = useCar();

	return (
		<div className="page">
			<div className="hero-image"></div>

			<div className="main-content">
				<h1> Bem vindo à Livraria Pedro II</h1>
				<h2> Conheça o nosso catálogo: </h2>
			</div>

			<Booklist book_list={catalog} />
		</div>
	);
}

export default Home;
