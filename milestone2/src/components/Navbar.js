import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../palette.css';
import './Navbar.css';

function Navbar() {
	return (
		<div className="top-bar">
			<Link to="/" className="logo"> Livraria Pedro II </Link>

			<nav className="nav-links">
				<NavLink to="/profile"> Profile </NavLink>
				<NavLink to="/login"> Login </NavLink>
				<NavLink to="/catalogo"> Catálogo </NavLink>
				<NavLink to="/carrinho"> Carrinho </NavLink>
				<NavLink to="/about"> Sobre </NavLink>
			</nav>
		</div>
	);
}

export default Navbar;
