import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../palette.css';
import './Navbar.css';

function Navbar() {
	return (
		<div class="top-bar">
			<Link to="/" class="logo"> Livraria Pedro II </Link>

			<nav class="nav-links">
				<NavLink to="/catalogo"> Catálogo </NavLink>
				<NavLink to="/carrinho"> Carrinho </NavLink>
				<NavLink to="/sobre"> Sobre </NavLink>
			</nav>
		</div>
	);
}

export default Navbar;

