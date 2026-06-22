import type { Repository } from '../../types/repository';

type Props = {
    repositories: Repository[];
};

function RepositoryList({
    repositories,
}: Props) {
    return (
        <section className="dashboard-card dashboard__repository">
            <h2 className="dashboard-card__title">
                Repository List
            </h2>

            <div className="repository-table">
                <div className="repository-table__header">
                    <div>リポジトリ名</div>
                    <div>ブランチ</div>
                    <div>最終解析</div>
                    <div>スコア</div>
                    <div>ステータス</div>
                    <div>操作</div>
                </div>

                {repositories.map((repository) => (
                    <div
                        key={repository.id}
                        className="repository-table__row"
                    >
                        <div className="repository-table__repository">
                            <div className="repository-table__icon">
                                📁
                            </div>

                            <div>
                                <div className="repository-table__name">
                                    {repository.repository_name}
                                </div>

                                <div className="repository-table__tech">
                                    {repository.technologies.join(' / ')}
                                </div>
                            </div>
                        </div>

                        <div>
                            <span className="repository-table__branch">
                                {repository.branch_name}
                            </span>
                        </div>

                        <div>
                            {repository.analyzed_at}
                        </div>

                        <div className="repository-table__score">
                            {repository.score}
                        </div>

                        <div>
                            <span className="repository-table__status">
                                {repository.status}
                            </span>
                        </div>

                        <div className="repository-table__actions">
                            <a
                                href={repository.github_url}
                                target="_blank"
                                rel="noreferrer"
                            >
                                ↗
                            </a>

                            <button type="button">
                                ⋮
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default RepositoryList;