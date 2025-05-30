import logo from './logo.svg';
import './palette.css';
import './App.css';

import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/Login';
import Recover from './pages/Recover';
import SingUp from './pages/SingUp';
import Admin from './pages/Admin';
import Checkout from './pages/CheckoutPage';

import Navbar from './components/Navbar'
import Footer from './components/Footer';
import { Routes, Route } from 'react-router-dom';

function App() {
	return (
		<div className="App">
			<Navbar />
			
			<main className='main'>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<About />} />
					<Route path="/login" element={<Login />} />
					<Route path="/recover" element={<Recover />} />
					<Route path="/singUp" element={<SingUp />} />
					<Route path="/admin" element={<Admin />} />
					<Route path="/checkout" element={<Checkout />} />
				</Routes>
			</main>

			<Footer />
		</div>
	);
}

export default App;