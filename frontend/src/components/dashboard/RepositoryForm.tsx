import { useState } from 'react';

type Props = {
    onSuccess: () => void;
};

function RepositoryForm({
    onSuccess,
}: Props) {
    const [githubUrl, setGithubUrl] =
        useState('');

    const handleSubmit = async (
        event: React.FormEvent
    ) => {
        event.preventDefault();

        try {
            const response =
                await fetch(
                    `${import.meta.env.VITE_API_URL}/repositories`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type':
                                'application/json',
                        },
                        body: JSON.stringify({
                            github_url:
                                githubUrl,

                            repository_name:
                                githubUrl
                                    .split('/')
                                    .pop(),

                            branch_name:
                                'main',
                        }),
                    }
                );

            const data =
                await response.json();

            console.log(data);

            setGithubUrl('');

            onSuccess();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <section className="dashboard-card">
            <h2 className="dashboard-card__title">
                Repository Register
            </h2>

            <form onSubmit={ handleSubmit } className="repository-form" >
                <input
                    type="text"
                    placeholder="https://github.com/user/repository"
                    value={githubUrl}
                    onChange={(event) =>
                        setGithubUrl(
                            event.target
                                .value
                        )
                    }
                    className="repository-form__input"
                />

                <button type="submit" className="repository-form__button" > 登録 </button>
            </form>
        </section>
    );
}

export default RepositoryForm;