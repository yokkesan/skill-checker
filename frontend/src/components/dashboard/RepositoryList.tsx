import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { Repository } from '../../types/repository';

import RepositoryIcon from '../icons/RepositoryIcon';
import ExternalLinkIcon from '../icons/ExternalLinkIcon';
import MoreVerticalIcon from '../icons/MoreVerticalIcon';

type Props = {
    repositories: Repository[];
};

function RepositoryList({
    repositories,
}: Props) {
    const [openMenuId, setOpenMenuId] =
        useState<number | null>(null);

    const navigate = useNavigate();

    return (
        <section className="dashboard-card dashboard__repository">
            <h2 className="dashboard-card__title">
                Repository List
            </h2>

            <div className="repository-table">
                <div className="repository-table__header">
                    <div>リポジトリ名</div>
                    <div>ブランチ</div>
                    <div>最終解析</div>
                    <div>スコア</div>
                    <div>ステータス</div>
                    <div>操作</div>
                </div>

                {repositories.map((repository) => (
                    <div
                        key={repository.id}
                        className="repository-table__row"
                        onClick={() =>
                            navigate(
                                `/repositories/${repository.id}`
                            )
                        }
                    >
                        <div className="repository-table__repository">
                            <div className="repository-table__icon">
                                <RepositoryIcon />
                            </div>

                            <div>
                                <div className="repository-table__name">
                                    {repository.repository_name}
                                </div>

                                <div className="repository-table__tech">
                                    {repository.technologies.join(' / ')}
                                </div>
                            </div>
                        </div>

                        <div>
                            <span className="repository-table__branch">
                                {repository.branch_name}
                            </span>
                        </div>

                        <div>
                            {repository.analyzed_at}
                        </div>

                        <div className="repository-table__score">
                            {repository.score}
                        </div>

                        <div>
                            <span className="repository-table__status">
                                {repository.status}
                            </span>
                        </div>

                        <div className="repository-table__actions">
                            <a
                                href={repository.github_url}
                                target="_blank"
                                rel="noreferrer"
                                onClick={(e) =>
                                    e.stopPropagation()
                                }
                            >
                                <ExternalLinkIcon />
                            </a>

                            <div className="repository-table__menu">
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();

                                        setOpenMenuId(
                                            openMenuId === repository.id
                                                ? null
                                                : repository.id
                                        );
                                    }}
                                >
                                    <MoreVerticalIcon />
                                </button>

                                {openMenuId === repository.id && (
                                    <div className="repository-table__dropdown">
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();

                                                navigate(
                                                    `/repositories/${repository.id}`
                                                );
                                            }}
                                        >
                                            詳細を見る
                                        </button>

                                        <button
                                            type="button"
                                            onClick={async (e) => {
                                                e.stopPropagation();

                                                const confirmed =
                                                    window.confirm(
                                                        'このリポジトリを削除しますか？'
                                                    );

                                                if (!confirmed) {
                                                    return;
                                                }

                                                const response =
                                                    await fetch(
                                                        `${import.meta.env.VITE_API_URL}/repositories/${repository.id}`,
                                                        {
                                                            method: 'DELETE',
                                                        }
                                                    );

                                                if (!response.ok) {
                                                    alert(
                                                        '削除に失敗しました。'
                                                    );
                                                    return;
                                                }

                                                setOpenMenuId(null);

                                                alert(
                                                    '削除しました。'
                                                );
                                            }}
                                        >
                                            削除
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default RepositoryList;