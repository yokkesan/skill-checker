import type { Repository } from '../../types/repository';

type Props = {
    repositories:
        Repository[];
};

function RepositoryList({
    repositories,
}: Props) {
    return (
        <section className="dashboard-card dashboard__repository">
            <h2 className="dashboard-card__title">
                Repository List
            </h2>

            {repositories.map((repository) => (
                <div key={repository.id} className="repository-card" >
                    <h3 className="repository-card__title">{repository.repository_name}</h3>

                    <p> { repository.github_url } </p>

                    <p> branch: {' '} { repository.branch_name } </p>
                    <p> status: {' '} { repository.status } </p>

                    <button> 詳細を見る </button>
                </div>
            ))}
        </section>
    );
}

export default RepositoryList;