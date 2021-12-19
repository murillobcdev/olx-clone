import React from 'react';
import { HeaderArea } from './styled';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';

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
            {/* <div className="container">
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
                                    <Link to="/user/me" className="">
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
            </div> */}
            <Navbar expand="lg">
                <Container>
                    <Navbar.Brand href="/">
                        <img alt="logo MBS" className="mbs-logo" src="https://i.imgur.com/AV0gElN.png" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="mbsmenu"/>
                    <Navbar.Collapse id="mbsmenu" className="container-fluid justify-content-end">
                        <Nav className="align-items-center">
                            {logged &&
                                <>
                                    <Nav.Link>
                                        <Link to="/user/me" className="btn">
                                            Minha Conta
                                        </Link>
                                    </Nav.Link>
                                    <Nav.Link>
                                        <a className="btn" onClick={handleLogout}>Sair</a>
                                    </Nav.Link>
                                    <Nav.Link>
                                        <Link to="/post-an-ad" className="btn btn-outline-dark post">
                                            Poste um anúncio!
                                        </Link>
                                    </Nav.Link>
                                    <Nav.Link>
                                        <Link to="/about" className="btn btn-outline-dark">
                                            Sobre
                                        </Link>
                                    </Nav.Link>
                                </>
                            }
                            {!logged &&
                                <>
                                    <Nav.Link>
                                        <Link to="/signin" className="btn">
                                            Login
                                        </Link>
                                    </Nav.Link>
                                    <Nav.Link>
                                        <Link to="/signup" className="btn">
                                            Cadastrar
                                        </Link>
                                    </Nav.Link>
                                    <Nav.Link>
                                        <Link to="/signin" className="btn btn-outline-dark post">
                                            Anuncie aqui!
                                        </Link>
                                    </Nav.Link>
                                    <Nav.Link>
                                        <Link to="/about" className="btn btn-outline-dark">
                                            Sobre
                                        </Link>
                                    </Nav.Link>
                                </>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </HeaderArea>
    );
}

export default Header;