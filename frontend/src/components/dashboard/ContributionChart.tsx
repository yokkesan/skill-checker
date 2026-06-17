type Props = {
    contributions: Record<string, number>;
};

function ContributionChart({
    contributions,
}: Props) {

    const days = [];

    for (let i = 89; i >= 0; i--) {
        const date = new Date();

        date.setDate(
            date.getDate() - i
        );

        const dateString =
            date.toISOString().split('T')[0];

        days.push({
            date: dateString,
            count:
                contributions[dateString] ?? 0,
        });
    }

    return (
        <section className="dashboard-card dashboard__contribution">
            <h2 className="dashboard-card__title">
                Contribution
            </h2>

            <div className="contribution-chart">
                {days.map((day) => {
                    const level =
                        Math.min(
                            day.count,
                            4
                        );

                    return (
                        <div
                            key={day.date}
                            className={`contribution-chart__cell contribution-chart__cell--level-${level}`}
                            title={`${day.date}: ${day.count} commits`}
                        />
                    );
                })}
            </div>
        </section>
    );
}

export default ContributionChart;