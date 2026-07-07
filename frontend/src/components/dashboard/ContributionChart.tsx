import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, } from 'recharts';

type Props = {
    contributions: Record<string, number>;
};

function ContributionChart({
    contributions,
}: Props) {
    const monthlyData = Object.entries(
    contributions
).reduce(
    (result, [date, count]) => {
        const month = date.slice(0, 7);

        result[month] =
            (result[month] ?? 0)
            + Number(count);

        return result;
    },
    {} as Record<string, number>
);

    const chartData = [];

    for (let i = 5; i >= 0; i--) {
        const date = new Date();

        date.setMonth(
            date.getMonth() - i
        );

        const key =
            `${date.getFullYear()}-${String(
                date.getMonth() + 1
            ).padStart(2, '0')}`;

        chartData.push({
            month:
                `${String(
                    date.getMonth() + 1
                ).padStart(2, '0')}月`,
            commits:
                monthlyData[key] ?? 0,
        });
    }

    const totalCommits =
        chartData.reduce(
            (total, item) =>
                total + item.commits,
            0
        );

    const activeMonths =
        chartData.filter(
            (item) => item.commits > 0
        ).length;

    const averageCommits =
    activeMonths > 0
        ? Math.round(
            totalCommits /
            activeMonths
        )
        : 0;

    const maxCommits =
        Math.max(
            ...chartData.map(
                (item) => item.commits
            ),
            0
        );

    return (
        <section className="dashboard-card dashboard__contribution">
            <h2 className="dashboard-card__title">
                Contribution
            </h2>

            <div className="contribution-layout">
                <div className="contribution-main">
                    <div className="contribution-content">
                        <div className="contribution-chart">
                            <ResponsiveContainer
                                width="100%"
                                height={260}
                            >
                                <LineChart data={chartData} >
                                    <CartesianGrid strokeDasharray="3 3" />

                                    <XAxis dataKey="month" />

                                    <YAxis allowDecimals={false} />

                                    <Tooltip />

                                    <Line type="monotone" dataKey="commits" stroke="#22c55e" strokeWidth={3} dot />
                                </LineChart>
                            </ResponsiveContainer>
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
                            アクティブ月数
                        </span>

                        <strong>
                            {activeMonths}
                        </strong>
                    </div>

                    <div className="contribution-summary__item">
                        <span>
                            月平均コミット
                        </span>

                        <strong>
                            {averageCommits}
                        </strong>
                    </div>

                    <div className="contribution-summary__item">
                        <span>
                            最大コミット数
                        </span>

                        <strong>
                            {maxCommits}
                        </strong>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default ContributionChart;