function Header() {
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
                <div className="header_gitlogo"> <img src="/giticon.svg" alt="GitHub" /> </div>
                <div className="header__avatar">
                    YK
                </div>

                <span className="header__username">
                    yokkesan
                </span>
            </div>
        </header>
    );
}

export default Header;