import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../../styles/pages/_login.scss';

function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (
        event: React.FormEvent
    ) => {
        event.preventDefault();

        const response = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                password,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            alert('ユーザー登録が完了しました');

            navigate('/login');
        } else {
            alert(
                data.message ??
                '登録に失敗しました'
            );
        }
    };

    return (
        <div className="dashboard">
            <div className="login">
                <div className="dashboard-card login-card">
                    <h1 className="dashboard-card__title">
                        Register
                    </h1>

                    <form onSubmit={handleSubmit}>
                        <div className="login-form__group">
                            <label>Name</label>

                            <input
                                type="text"
                                value={name}
                                onChange={(event) =>
                                    setName(
                                        event.target.value
                                    )
                                }
                            />
                        </div>

                        <div className="login-form__group">
                            <label>Email</label>

                            <input
                                type="email"
                                value={email}
                                onChange={(event) =>
                                    setEmail(
                                        event.target.value
                                    )
                                }
                            />
                        </div>

                        <div className="login-form__group">
                            <label>Password</label>

                            <input
                                type="password"
                                value={password}
                                onChange={(event) =>
                                    setPassword(
                                        event.target.value
                                    )
                                }
                            />
                        </div>

                        <button
                            type="submit"
                            className="login-form__button"
                        >
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;