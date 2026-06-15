import { useEffect, useState } from 'react';
import type { Repository } from '../../types/repository';

function RepositoryList() {
    const [repositories, setRepositories] =
        useState<Repository[]>([]);

    useEffect(() => {
        fetch(
            `${import.meta.env.VITE_API_URL}/repositories`
        )
            .then((response) => response.json())
            .then((data) => {
                console.log(data);

                setRepositories(
                    data.repositories
                );
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <section className="dashboard-card dashboard__repository">
            <h2 className="dashboard-card__title">
                Repository List
            </h2>

            {repositories.map((repository) => (
                <div
                    key={repository.id}
                    className="repository-card"
                >
                    <h3 className="repository-card__title">
                        {repository.repository_name}
                    </h3>

                    <p>
                        {repository.github_url}
                    </p>

                    <p>
                        branch:
                        {' '}
                        {repository.branch_name}
                    </p>

                    <p>
                        status:
                        {' '}
                        {repository.status}
                    </p>

                    <button>
                        詳細を見る
                    </button>
                </div>
            ))}

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