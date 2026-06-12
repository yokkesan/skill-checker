import '../styles/pages/_dashboard.scss';

import SkillScoreCard from '../components/dashboard/SkillScoreCard';
import GithubStatsCard from '../components/dashboard/GithubStatsCard';
import ContributionChart from '../components/dashboard/ContributionChart';
import RepositoryList from '../components/dashboard/RepositoryList';

function Dashboard() {
    return (
        <div className="dashboard">
            <h1 className="dashboard__title">
                Dashboard
            </h1>

            <div className="dashboard__top">
                <SkillScoreCard />

                <GithubStatsCard />
            </div>

            <ContributionChart />

            <RepositoryList />
        </div>
    );
}

export default Dashboard;