import React from 'react';
import { PageArea } from './styled';
import { PageContainer, PageTitle, ErrorMessage } from '../../components/MainComponents';
import useApi from '../../helpers/MBSApi';
import { useState } from 'react';
import { doLogin } from '../../helpers/authHandler';

// import { Link } from 'react-router-dom';

const Page = () => {

    const api = useApi();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberPass, setRememberPass] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true);
        setError('');

        const json = await api.login(email, password);

        if (json.error) {
            setError(json.error);
        } else {
            doLogin(json.token, rememberPass);
            window.location.href = '/';
        }
        setDisabled(false);
    }


    return (
        <PageContainer>
            <PageTitle>
                Login
            </PageTitle>
            <PageArea>

                {error &&
                    <ErrorMessage>{error}</ErrorMessage>
                }


                <form onSubmit={handleSubmit}>
                    <label className="area">
                        <div className="area--title">
                            E-mail:
                        </div>
                        <div className="area--input">
                            <input
                                type="email"
                                disabled={disabled}
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">
                            Senha:
                        </div>
                        <div className="area--input">
                            <input
                                type="password"
                                disabled={disabled}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required

                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">
                            Lembrar senha?
                        </div>
                        <div className="area--input">
                            <input className="checkbox"
                                type="checkbox"
                                disabled={disabled}
                                value={rememberPass}
                                onClick={e => setRememberPass(!rememberPass)}
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">

                        </div>
                        <div className="area--input">
                            <button disabled={disabled} >Login</button>
                        </div>
                    </label>
                </form>
            </PageArea>
        </PageContainer>
    );
}

export default Page;