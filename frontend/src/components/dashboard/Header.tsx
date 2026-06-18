function Header() {
    return (
        <header className="header">
            <div className="header__logo">
                Skill Checker
            </div>

            <nav className="header__nav">
                <span>
                    Dashboard
                </span>
            </nav>

            <div className="header__user">
                Guest User
            </div>
        </header>
    );
}

export default Header;