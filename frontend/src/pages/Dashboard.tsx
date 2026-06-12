import '../styles/pages/_dashboard.scss';

function Dashboard() {
    return (
        <div className="dashboard">
            <h1 className="dashboard__title">
                Dashboard
            </h1>

            {/* 上段 */}
            <div className="dashboard__top">
                {/* スキル偏差値 */}
                <section className="dashboard-card dashboard-card--score">
                    <h2 className="dashboard-card__title">
                        Skill Score
                    </h2>

                    <p>総合偏差値</p>
                </section>

                {/* GitHub統計 */}
                <section className="dashboard-card dashboard-card--github">
                    <h2 className="dashboard-card__title">
                        GitHub Stats
                    </h2>

                    <p>PR / Issue / Repository</p>
                </section>
            </div>

            {/* Contribution */}
            <section className="dashboard-card dashboard__contribution">
                <h2 className="dashboard-card__title">
                    Contribution
                </h2>

                <p>GitHub grass area</p>
            </section>

            {/* Repository List */}
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
        </div>
    );
}

export default Dashboard;