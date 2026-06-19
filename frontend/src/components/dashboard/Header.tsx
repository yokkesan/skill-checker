import { Link } from 'react-router-dom';

function Header() {
    const user = JSON.parse(
        localStorage.getItem('user') ?? 'null'
    );

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

                {user ? (
                    <>
                        <div className="header__avatar">
                            {user.name
                                ?.substring(0, 2)
                                .toUpperCase()}
                        </div>

                        <span className="header__username">
                            {user.name}
                        </span>
                    </>
                ) : (
                    <Link
                        to="/login"
                        className="header__login"
                    >
                        Login
                    </Link>
                )}
            </div>
        </header>
    );
}

export default Header;