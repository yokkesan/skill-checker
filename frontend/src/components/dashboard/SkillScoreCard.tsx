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

            <div className="score-card">
                <div className="score-ring">
                    <div className="score-ring__inner">
                        {averageScore}
                    </div>
                </div>

                <div className="score-card__content">
                    <p className="score-card__label">
                        総合偏差値
                    </p>

                    <div className="score-bar">
                        <div
                            className="score-bar__fill"
                            style={{
                                width: `${averageScore}%`,
                            }}
                        />
                    </div>

                    <div className="score-bar__scale">
                        <span>0</span>
                        <span>50</span>
                        <span>100</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SkillScoreCard;