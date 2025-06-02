import { Link } from 'react-router-dom';

import "./Footer.css"

const Footer = () => {
	return (
		<div className="site-footer">
			<div className="footer-content">
				<div className="footer-logo">
					<h3>Livraria Pedro II</h3>
					<p>&copy; 2025 - Todos os direitos reservados</p>
				</div>

				<div className="footer-links">
					<Link to="/about">Sobre nós</Link>
					<Link to="/about">Política de Privacidade</Link>
					<Link to="/about">Termos de Uso</Link>
					<Link to="/about">Contato</Link>
				</div>
			</div>
		</div>
	);

}

export default Footer;
