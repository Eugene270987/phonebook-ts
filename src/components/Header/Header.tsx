import './Header.scss'
import {Link} from "react-router-dom";

function Header () {
    return (
        <nav>
            <ul className="menu__list">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/ContactForm">FormPage</Link></li>
                <li><Link to="/ContactList">ContactPage</Link></li>
            </ul>
        </nav>
    )
}

export default Header;