import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();

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

    return (
        <header className="header">
            <div className="header__left">
                <div className="header__logo">
                    {'</>'}
                </div>

                <span className="header__brand">
                    Skill Checker
                </span>
            </div>

            <div className="header__center">
                Dashboard
            </div>

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