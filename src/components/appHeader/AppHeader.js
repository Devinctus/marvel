import { Link, NavLink } from 'react-router-dom';

import './appHeader.scss';

const AppHeader = () => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <Link exact to="/">
                    <span>Marvel</span> information portal
                </Link>
                </h1>
            <nav className="app__menu">
                <ul>
                    <li>
                        <NavLink exact to="/" activeClassName="active-page">Characters</NavLink>
                    </li>
                    /
                    <li>
                        <NavLink exact to="/comics/" activeClassName="active-page">Comics</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default AppHeader;