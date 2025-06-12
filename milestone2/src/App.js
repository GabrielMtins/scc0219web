import logo from './logo.svg';
import './palette.css';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { CarProvider } from './contexts/CarContext';
import { LoginProvider } from './contexts/LoginContext';

import Home from './pages/Home';
import About from './pages/About';
import Catalogo from './pages/Catalogo';
import Carrinho from './pages/Carrinho';
import Login from './pages/Login';
import Recover from './pages/Recover';
import SingUp from './pages/SingUp';
import Admin from './pages/Admin';
import CheckoutPage from './pages/CheckoutPage';
import ProfilePage from './pages/Profile';
import ProductPage from './pages/ProductPage';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Routes, Route } from 'react-router-dom';

function App() {
	return (
		<div className="App">
			<CarProvider>
				<LoginProvider>
	
				<Navbar />
	
				<main className='main-content'>
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/about" element={<About />} />
							<Route path="/catalogo" element={<Catalogo />} />
							<Route path="/carrinho" element={<Carrinho />} />
							<Route path="/login" element={<Login />} />
							<Route path="/recover" element={<Recover />} />
							<Route path="/singUp" element={<SingUp />} />
							<Route path="/admin" element={<Admin />} />
							<Route path="/profile" element={<ProfilePage />} />
							<Route path="/checkout" element={<CheckoutPage />} />
							<Route path="/productpage" element={<ProductPage />} />
						</Routes>
				</main>
	
				<ToastContainer
					position="bottom-right"
					autoClose={2500}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
				/>
	
				<Footer />
	
				</LoginProvider>
			</CarProvider>
		</div>
	);
}

export default App;
