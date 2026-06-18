type Props = {
    contributions: Record<string, number>;
};

function ContributionChart({
    contributions,
}: Props) {

    const days = [];

    for (let i = 150; i >= 0; i--) {
        const date = new Date();

        date.setDate(
            date.getDate() - i
        );

        const dateString =
            date.toISOString().split('T')[0];

        days.push({
            date: dateString,
            count: contributions[dateString] ?? 0,
        });
    }

    const totalCommits =
        days.reduce(
            (total, day) =>
                total + day.count,
            0
        );

    const activeDays =
        days.filter(
            (day) => day.count > 0
        ).length;

    const months = days.reduce(
        (result, day, index) => {

            const date =
                new Date(day.date);

            const month =
                `${date.getMonth() + 1}月`;

            const key =
                `${date.getFullYear()}-${date.getMonth() + 1}`;

            const weekIndex =
                Math.floor(index / 7);

            const exists =
                result.some(
                    (item) =>
                        item.key === key
                );

            if (!exists) {
                result.push({
                    key,
                    month,
                    index: weekIndex,
                });
            }

            return result;

        },
        [] as {
            key: string;
            month: string;
            index: number;
        }[]
    );

    return (
        <section className="dashboard-card dashboard__contribution">
            <h2 className="dashboard-card__title">
                Contribution
            </h2>

            <div className="contribution-layout">

                <div className="contribution-main">

                    <div className="contribution-months">
                        {months.map((month) => (
                            <span
                                key={month.key}
                                style={{
                                    left:
                                        `${month.index * 18}px`,
                                }}
                            >
                                {month.month}
                            </span>
                        ))}
                    </div>

                    <div className="contribution-content">

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

                    </div>

                </div>

                <div className="contribution-summary">

                    <div className="contribution-summary__item">
                        <span>
                            総コミット数
                        </span>

                        <strong>
                            {totalCommits}
                        </strong>
                    </div>

                    <div className="contribution-summary__item">
                        <span>
                            アクティブ日数
                        </span>

                        <strong>
                            {activeDays}
                        </strong>
                    </div>

                </div>

            </div>

        </section>
    );
}

export default ContributionChart;