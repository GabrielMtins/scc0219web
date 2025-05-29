import logo from './logo.svg';
import './palette.css';
import './App.css';

import {CarProvider} from './contexts/CarContext'

import Home from './pages/Home'
import About from './pages/About'
import Catalogo from './pages/Catalogo'
import Carrinho from './pages/Carrinho'

import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom';

function App() {
	return (
		<div className="App">
			<Navbar />
			
			<main>
				<CarProvider>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/about" element={<About />} />
						<Route path="/catalogo" element={<Catalogo />} />
						<Route path="/carrinho" element={<Carrinho />} />
					</Routes>
				</CarProvider>
			</main>
		</div>
	);
}

export default App;
