import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../../styles/pages/_login.scss';

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (
        event: React.FormEvent
    ) => {
        event.preventDefault();

        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/login`,
            {
                method: 'POST',
                headers: {
                    'Content-Type':
                        'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            }
        );

        const data =
            await response.json();

        if (response.ok) {
            localStorage.setItem(
                'token',
                data.token
            );

            localStorage.setItem(
                'user',
                JSON.stringify(
                    data.user
                )
            );

            navigate('/');
        }
    };

    return (
        <div className="dashboard">
            <div className="login">
                <div className="dashboard-card login-card">
                    <h1 className="dashboard-card__title">
                        Login
                    </h1>

                    <form
                        onSubmit={
                            handleSubmit
                        }
                    >
                        <div className="login-form__group">
                            <label>
                                Email
                            </label>

                            <input
                                type="email"
                                value={email}
                                onChange={(event) =>
                                    setEmail(
                                        event.target
                                            .value
                                    )
                                }
                            />
                        </div>

                        <div className="login-form__group">
                            <label>
                                Password
                            </label>

                            <input
                                type="password"
                                value={password}
                                onChange={(event) =>
                                    setPassword(
                                        event.target
                                            .value
                                    )
                                }
                            />
                        </div>

                        <button
                            type="submit"
                            className="login-form__button"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;