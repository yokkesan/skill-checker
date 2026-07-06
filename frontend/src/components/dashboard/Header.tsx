import { useState } from 'react';
import { Link, useNavigate, useLocation, } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();
    const location = useLocation();

    const [isMenuOpen, setIsMenuOpen] =
        useState(false);

    const user = JSON.parse(
        localStorage.getItem('user') ?? 'null'
    );

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        setIsMenuOpen(false);

        navigate('/login');
    };

    const pageTitle =
    location.pathname === '/'
        ? 'Dashboard'
        : location.pathname === '/login'
        ? 'Login'
        : location.pathname === '/register'
        ? 'Register'
        : location.pathname.startsWith('/repositories/')
        ? 'Repository Detail'
        : '';

    return (
        <header className="header">
            <div className="header__left">
                <div className="header__logo">
                    {'</>'}
                </div>

                <div
                    className="header__brand"
                    onClick={() => navigate('/')}
                    style={{ cursor: 'pointer' }}
                >
                    Skill Checker
                </div>
            </div>

            <div className="header__center"> {pageTitle} </div>

            <div className="header__right">
                <div className="header_gitlogo">
                    <img
                        src="/giticon.svg"
                        alt="GitHub"
                    />
                </div>

                <div className="header__user">
                    <div
                        className="header__avatar"
                        onClick={() =>
                            setIsMenuOpen(
                                !isMenuOpen
                            )
                        }
                    >
                        {user
                            ? user.name
                                .substring(0, 2)
                                .toUpperCase()
                            : '?'}
                    </div>

                    {user && (
                        <span className="header__username">
                            {user.name}
                        </span>
                    )}

                    {isMenuOpen && (
                        <div className="header__menu">
                            {user ? (
                                <button
                                    className="header__menu-item"
                                    onClick={
                                        handleLogout
                                    }
                                >
                                    Logout
                                </button>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        className="header__menu-item"
                                        onClick={() =>
                                            setIsMenuOpen(
                                                false
                                            )
                                        }
                                    >
                                        Login
                                    </Link>

                                    <Link
                                        to="/register"
                                        className="header__menu-item"
                                        onClick={() =>
                                            setIsMenuOpen(
                                                false
                                            )
                                        }
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;