import { Link } from 'react-router-dom';

import "./Footer.css"

const Footer = () => {
    return(
        <div className="site-footer">
            <div className="footer-content">
                <div className="footer-logo">
                    <h3>Livraria Pedro II</h3>
                    <p>&copy; 2025 - Todos os direitos reservados</p>
                </div>

                <div className="footer-links">
                    <Link to="/about">Sobre nós</Link>
                    <a href="#">Política de Privacidade</a>
                    <a href="#">Termos de Uso</a>
                    <a href="#">Contato</a>
                </div>
            </div>
        </div>
    );

}

export default Footer;