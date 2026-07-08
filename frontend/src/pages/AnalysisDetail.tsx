import { useLocation, useNavigate, } from 'react-router-dom';

import AppLayout from '../components/layout/AppLayout';
import Header from '../components/dashboard/Header';

function AnalysisDetail() {

    const location = useLocation();

    const navigate = useNavigate();

    const detail = location.state?.detail;

    if (!detail) {
        return (
            <AppLayout>
                <>
                    <Header />

                    <div className="repository-detail__empty">
                        解析データが見つかりません
                    </div>
                </>
            </AppLayout>
        );
    }

    const rate =
        detail.score / detail.maxScore;

    const scoreClass =
        rate >= 0.8
            ? 'analysis-score--good'
            : rate >= 0.6
                ? 'analysis-score--warning'
                : 'analysis-score--danger';

    return (
        <AppLayout>
            <>
                <Header />

                <div className="repository-detail">

                    <section className="dashboard-card">

                        <button
                            type="button"
                            className="repository-detail__analyze"
                            onClick={() => navigate(-1)}
                        >
                            戻る
                        </button>

                    </section>

                    <section className="dashboard-card">

                        <h1 className="dashboard-card__title">
                            {detail.category}
                        </h1>

                        <div
                            className={`analysis-score ${scoreClass}`}
                        >
                            {detail.score} / {detail.maxScore}
                        </div>

                        <p
                            className="analysis-result-card__message"
                            style={{
                                marginTop: '24px',
                            }}
                        >
                            {detail.message}
                        </p>

                    </section>

                    <section className="dashboard-card">

                        <h2 className="dashboard-card__title">
                            詳細コメント
                        </h2>

                        <p> {detail.comment} </p>

                    </section>

                    <section className="dashboard-card">

                        <h2 className="dashboard-card__title">
                            指摘コード
                        </h2>

                        {detail.issues.map((issue) => (
                            <div
                                key={`${issue.file}-${issue.startLine}-${issue.endLine}`}
                                className="analysis-issue"
                            >
                                <p> {issue.file} </p>

                                <p>
                                    {issue.startLine}
                                    {issue.startLine !== issue.endLine
                                        ? ` ～ ${issue.endLine}`
                                        : ''}
                                </p>

                                <pre> {issue.code} </pre>

                                <p> {issue.reason} </p>
                            </div>
                        ))}

                    </section>

                </div>
            </>
        </AppLayout>
    );
}

export default AnalysisDetail;