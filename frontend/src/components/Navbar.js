import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useLogin } from '../contexts/LoginContext';
import { useCar } from '../contexts/CarContext';
import '../palette.css';
import './Navbar.css';

function Navbar() {
	const { user, logout } = useLogin();
	const { resetCar, setCurrentUsername } = useCar();

	const my_logout = () => {
		logout();
		setCurrentUsername(null);
	}

	const login_logout = () => {
		if(user == null){
			return (
				<>
					<NavLink to="/login"> Login </NavLink>
				</>
			);
		}
		else{
			return (
				<>
					<NavLink to="/" onClick={my_logout} > Logout </NavLink>
				</>
			);
		}
	};

	return (
		<div className="top-bar">
			<Link to="/" className="logo"> Livraria Pedro II </Link>

			<nav className="nav-links">
				<NavLink to="/profile"> Profile </NavLink>
				{login_logout()}
				<NavLink to="/catalogo"> Catálogo </NavLink>
				<NavLink to="/carrinho"> Carrinho </NavLink>
				<NavLink to="/about"> Sobre </NavLink>
			</nav>
		</div>
	);
}

export default Navbar;
