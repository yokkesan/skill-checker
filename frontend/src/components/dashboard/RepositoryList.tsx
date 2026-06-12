function RepositoryList() {
    return (
        <section className="dashboard-card dashboard__repository">
            <h2 className="dashboard-card__title">
                Repository List
            </h2>

            <div className="repository-card">
                <h3 className="repository-card__title">
                    skill-checker
                </h3>

                <p>Laravel / React / TypeScript</p>

                <p>偏差値 82</p>

                <button>
                    詳細を見る
                </button>
            </div>

            <div className="repository-card">
                <h3 className="repository-card__title">
                    tora-tere
                </h3>

                <p>Rails / React</p>

                <p>偏差値 74</p>

                <button>
                    詳細を見る
                </button>
            </div>
        </section>
    );
}

export default RepositoryList;