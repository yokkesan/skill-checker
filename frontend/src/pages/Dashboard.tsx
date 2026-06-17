import { useEffect, useState } from 'react';

import '../styles/main.scss';

import SkillScoreCard from '../components/dashboard/SkillScoreCard';
import GithubStatsCard from '../components/dashboard/GithubStatsCard';
import ContributionChart from '../components/dashboard/ContributionChart';
import RepositoryList from '../components/dashboard/RepositoryList';
import RepositoryForm from '../components/dashboard/RepositoryForm';

import type { Repository } from '../types/repository';

function Dashboard() {
    const [repositories, setRepositories] =
        useState<Repository[]>([]);

    const [contributions, setContributions] =
    useState<Record<string, number>>({});

    const fetchRepositories =
        async () => {
            try {
                const response =
                    await fetch(
                        `${import.meta.env.VITE_API_URL}/repositories`
                    );

                const data =
                    await response.json();

                setRepositories( data.repositories );

                setContributions( data.contributions );
            } catch (error) {
                console.error(error);
            }
        };

    useEffect(() => {
        fetchRepositories();
    }, []);

    return (
        <div className="dashboard">
            <h1 className="dashboard__title">
                Dashboard
            </h1>

            <div className="dashboard__top">
                <SkillScoreCard repositories={ repositories } />

                <GithubStatsCard repositories={ repositories } />
            </div>

            <ContributionChart contributions={ contributions } />

            <RepositoryForm onSuccess={ fetchRepositories } />

            <RepositoryList repositories={ repositories } />
        </div>
    );
}

export default Dashboard;