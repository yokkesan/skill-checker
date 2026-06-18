import type { Repository }
    from '../../types/repository';

type Props = {
    repositories:
        Repository[];
};

function SkillScoreCard({
    repositories,
}: Props) {

    const averageScore =
        repositories.length > 0
            ? Math.round(
                repositories.reduce(
                    (
                        total,
                        repository
                    ) =>
                        total +
                        (
                            repository.score
                            ?? 0
                        ),
                    0
                ) /
                repositories.length
            )
            : 0;

    return (
        <section className="dashboard-card dashboard-card--score">
            <h2 className="dashboard-card__title">
                Skill Score
            </h2>

            <p className="score-card__label">
                総合偏差値
            </p>

            <h3 className="score-card__value">
                {averageScore}
            </h3>
        </section>
    );
}

export default SkillScoreCard;