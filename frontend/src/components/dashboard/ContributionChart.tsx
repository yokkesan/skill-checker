import type { Repository }
    from '../../types/repository';

type Props = {
    repositories:
        Repository[];
};

function ContributionChart({
    repositories,
}: Props) {

    const contributionMap =
        repositories.reduce<
            Record<string, number>
        >(
            (
                result,
                repository
            ) => {

                if (
                    ! repository.updated_at
                ) {
                    return result;
                }

                const date =
                    repository.updated_at
                        .slice(0, 10);

                result[date] =
                    (
                        result[date]
                        ?? 0
                    ) + 1;

                return result;
            },
            {}
        );

    const days =
        Array.from({
            length: 120
        }).map((_, index) => {

            const date =
                new Date();

            date.setDate(
                date.getDate()
                - (
                    119 - index
                )
            );

            return date
                .toISOString()
                .slice(0, 10);
        });

    return (
        <section className="dashboard-card dashboard__contribution">
            <h2 className="dashboard-card__title">
                Contribution
            </h2>

            <div className="contribution-chart">
                {
                    days.map((day) => {

                        const count =
                            contributionMap[
                                day
                            ] ?? 0;

                        const level =
                            Math.min(
                                count,
                                4
                            );

                        return (
                            <div
                                key={day}
                                className={
                                    `contribution-chart__cell contribution-chart__cell--level-${level}`
                                }
                                title={
                                    `${day}: ${count}`
                                }
                            />
                        );
                    })
                }
            </div>
        </section>
    );
}

export default ContributionChart;