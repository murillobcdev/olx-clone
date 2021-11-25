import React from 'react';
import { HeaderArea } from './styled';
import { Link } from 'react-router-dom';

//importar funçao isLogged da pasta helpers/authHandler
import { isLogged, doLogout } from '../../../helpers/authHandler';

const Header = () => {

    let logged = isLogged();

    const handleLogout = () => {
        doLogout();
        window.location.href = '/signin'; //metodo mais seguro de logout pois recarrega a pagina inteira
    }

    return (
        <HeaderArea>
            <div className="container">
                <div className="logo">
                    <Link to="/">
                        <img alt="logo MBS" className="mbs-logo" src="https://i.imgur.com/AV0gElN.png" />
                    </Link>
                </div>
                <nav>
                    <ul>
                        {logged &&
                            <>
                                <li>
                                    <Link to="/my-account" className="">
                                        Minha Conta
                                    </Link>
                                </li>
                                <li>
                                    <button onClick={handleLogout}>Sair</button>
                                </li>
                                <li>
                                    <Link to="/post-an-ad" className="button">
                                        Poste um anúncio!
                                    </Link>
                                </li>
                            </>
                        }
                        {!logged &&
                            <>
                                <li>
                                    <Link to="/signin">
                                        Login
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/signup">
                                        Cadastrar
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/signin" className="button">
                                        Poste um anúncio!
                                    </Link>
                                </li>
                            </>
                        }
                    </ul>
                </nav>
            </div>
        </HeaderArea>
    );
}

export default Header;