import { useEffect, useState, } from 'react';
import { useParams } from 'react-router-dom';
import type { Repository, } from '../types/repository';
import AppLayout from '../components/layout/AppLayout';


function RepositoryDetail() {
    const { id } = useParams();

    const [repository, setRepository] = useState<Repository | null>(null);

    const [analysisResult, setAnalysisResult] =
        useState<string | null>(null);

    const handleAnalyze = async () => {

        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/repositories/${id}/analyze`,
            { method: 'POST' }
        );

        const data = await response.json();

        setAnalysisResult(
            data.language
        );

        // 追加
        const repositoryResponse = await fetch(
            `${import.meta.env.VITE_API_URL}/repositories/${id}`
        );

        const repositoryData =
            await repositoryResponse.json();

        setRepository(
            repositoryData.repository
        );
    };

    useEffect(() => {
        fetch(
            `${import.meta.env.VITE_API_URL}/repositories/${id}`
        )
            .then((response) =>
                response.json()
            )
            .then((data) =>
                setRepository(
                    data.repository
                )
            );
    }, [id]);

    if (!repository) {
        return <div>Loading...</div>;
    }

    return (
        <AppLayout>
            <div className="repository-detail">
                <section className="dashboard-card">
                    <div className="repository-detail__hero">
                        <div>
                            <h1>
                                {repository.repository_name}
                            </h1>

                            <div className="repository-detail__meta">
                                <span className="repository-detail__badge">
                                    {repository.branch_name}
                                </span>

                                <span className="repository-detail__badge">
                                    {repository.status}
                                </span>
                            </div>

                            <a
                                href={repository.github_url}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {repository.github_url}
                            </a>
                        </div>

                        <div>
                            <p>最終更新</p>

                            <p>
                                {repository.updated_at}
                            </p>
                        </div>
                    </div>
                </section>

                <div className="repository-detail__stats">
                    <section className="dashboard-card">
                        <h2 className="dashboard-card__title">
                            Score
                        </h2>

                        <p className="score-card__value">
                            {repository.score}
                        </p>
                    </section>

                    <section className="dashboard-card">
                        <h2 className="dashboard-card__title">
                            Status
                        </h2>

                        <p>
                            {repository.status}
                        </p>
                    </section>
                </div>

                <section className="dashboard-card">
                    <h2 className="dashboard-card__title">
                        Repository Information
                    </h2>

                    <div className="repository-detail__info">
                        <div>
                            <strong>Languages</strong>

                            <div className="repository-detail__technologies">
                                {repository.technologies?.map(
                                    (technology) => (
                                        <span
                                            key={technology}
                                            className="repository-detail__technology"
                                        >
                                            {technology}
                                        </span>
                                    )
                                )}
                            </div>
                        </div>

                        <div>
                            <strong>Stars</strong>

                            <p>
                                {repository.stars}
                            </p>
                        </div>

                        <div>
                            <strong>Forks</strong>

                            <p>
                                {repository.forks}
                            </p>
                        </div>
                    </div>
                </section>

                <section className="dashboard-card">
                    <div className="repository-detail__analysis">
                        <div>
                            <h2 className="dashboard-card__title">
                                Analysis
                            </h2>

                            <p>
                                リポジトリのスキルを解析して、
                                スコアと詳細な評価を取得します。
                            </p>
                        </div>

                        <button
                            type="button"
                            className="repository-detail__analyze"
                            onClick={handleAnalyze}
                        >解析開始
                        </button>
                    </div>
                </section>

                <section className="dashboard-card">
                    <h2 className="dashboard-card__title">
                        Analysis Result
                    </h2>

                    {analysisResult ? (
                        <div> <p> Language : {analysisResult} </p> </div>
                    ) : (
                        <div className="repository-detail__empty">
                            まだ解析が実行されていません
                        </div>
                    )}
                </section>
            </div>
        </AppLayout>
    );
}

export default RepositoryDetail;