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
                <p> Repositories： {repositoryCount} </p>

                <p> Stars： {totalStars} </p>

                <p> Forks： {totalForks} </p>

                <p> Languages： {languageCount} </p>
            </div>
        </section>
    );
}

export default GithubStatsCard;