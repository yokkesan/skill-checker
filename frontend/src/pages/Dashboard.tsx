import { useEffect, useState } from 'react';

import '../styles/main.scss';
import AppLayout from '../components/layout/AppLayout';
import Header from '../components/dashboard/Header';
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
                const token =
                    localStorage.getItem(
                        'token'
                    );

                const response =
                    await fetch(
                        `${import.meta.env.VITE_API_URL}/repositories`,
                        {
                            headers: {
                                Authorization:
                                    `Bearer ${token}`,

                                Accept:
                                    'application/json',
                            },
                        }
                    );

                const data =
                    await response.json();

                setRepositories(
                    data.repositories
                );

                const mergedContributions:
                    Record<string, number> = {};

                data.repositories.forEach(
                    (repository: Repository) => {

                        Object.entries(
                            repository.contributions ?? {}
                        ).forEach(
                            ([date, count]) => {

                                mergedContributions[date] =
                                    (mergedContributions[date] ?? 0)
                                    + Number(count);

                            }
                        );
                    }
                );

                setContributions(
                    mergedContributions
                );

            } catch (error) {
                console.error(error);
            }
        };

    const syncRepositories =
        async () => {

            const token =
                localStorage.getItem(
                    'token'
                );

            const response =
                await fetch(
                    `${import.meta.env.VITE_API_URL}/repositories/sync`,
                    {
                        method: 'POST',

                        headers: {
                            Authorization:
                                `Bearer ${token}`,

                            Accept:
                                'application/json',
                        },
                    }
                );

            if (!response.ok) {
                alert('同期に失敗しました。');
                return;
            }

            await fetchRepositories();

            alert('同期しました。');
        };

    useEffect(() => {
        fetchRepositories();
    }, []);

    return (
        <AppLayout>
            <>
                <Header />

                <div className="dashboard">
                    <div className="dashboard__heading">
                        <h1 className="dashboard__title">
                            Dashboard
                        </h1>

                        <button
                            type="button"
                            className="dashboard__sync-button"
                            onClick={syncRepositories}
                        >
                            GitHubと同期
                        </button>
                    </div>

                    <div className="dashboard__top">
                        <SkillScoreCard
                            repositories={repositories}
                        />

                        <GithubStatsCard
                            repositories={repositories}
                        />
                    </div>

                    <ContributionChart
                        contributions={contributions}
                    />

                    <RepositoryForm
                        onSuccess={fetchRepositories}
                    />

                    <RepositoryList
                        repositories={repositories}
                    />
                </div>
            </>
        </AppLayout>
    );
}

export default Dashboard;