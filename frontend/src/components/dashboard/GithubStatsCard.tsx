import type { Repository }
    from '../../types/repository';

type Props = {
    repositories:
        Repository[];
};

function GithubStatsCard({
    repositories,
}: Props) {

    const repositoryCount =
        repositories.length;

    const totalStars =
        repositories.reduce(
            (
                total,
                repository
            ) =>
                total +
                (
                    repository
                        .stargazers_count
                    ?? 0
                ),
            0
        );

    const totalForks =
        repositories.reduce(
            (
                total,
                repository
            ) =>
                total +
                (
                    repository
                        .forks_count
                    ?? 0
                ),
            0
        );

    const languageCount =
        new Set(
            repositories
                .map(
                    (
                        repository
                    ) =>
                        repository
                            .language
                )
                .filter(Boolean)
        ).size;

    return (
        <section className="dashboard-card dashboard-card--github">
            <h2 className="dashboard-card__title">
                GitHub Stats
            </h2>

            <div className="github-stats">
                <div className="github-stats__item">
                    <span className="github-stats__label">
                        Repositories
                    </span>

                    <span className="github-stats__value">
                        {repositoryCount}
                    </span>
                </div>

                <div className="github-stats__item">
                    <span className="github-stats__label">
                        Stars
                    </span>

                    <span className="github-stats__value">
                        {totalStars}
                    </span>
                </div>

                <div className="github-stats__item">
                    <span className="github-stats__label">
                        Forks
                    </span>

                    <span className="github-stats__value">
                        {totalForks}
                    </span>
                </div>

                <div className="github-stats__item">
                    <span className="github-stats__label">
                        Languages
                    </span>

                    <span className="github-stats__value">
                        {languageCount}
                    </span>
                </div>
            </div>
        </section>
        );
}

export default GithubStatsCard;