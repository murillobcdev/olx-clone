import React from 'react';
import { Post } from './styled';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
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
        <Navbar
            expand="lg"
            sticky="top"
            bg="light"
        >
            {/* <HeaderArea className="container-fluid"> */}
            <Container className="d-flex">
                <Navbar.Brand href="/">
                    <img
                        alt="logo MBS"
                        width="100"
                        className="mbs-logo"
                        src="https://i.imgur.com/AV0gElN.png" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="mbsmenu" />
                <Navbar.Collapse id="mbsmenu" className="justify-content-end">
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
                                    <Post>
                                        <Link to="/post-an-ad" className="btn btn-outline-dark post">
                                            Anuncie aqui!
                                        </Link>
                                    </Post>
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
                                    <Post>
                                        <Link to="/signin" className="btn btn-outline-dark post">
                                            Anuncie aqui!
                                        </Link>
                                    </Post>
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
            {/* </HeaderArea> */}
        </Navbar>
    );
}

export default Header;