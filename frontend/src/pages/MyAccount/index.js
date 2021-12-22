import React, { useState, useRef, useEffect } from 'react';
import { PageArea } from './styled';
import { PageContainer } from '../../components/MainComponents';
import useApi from '../../helpers/MBSApi';
import EditItem from '../../components/partials/EditItem';
import Modal from "react-bootstrap/Modal";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';


const Page = () => {
    const api = useApi();
    const [isOpen, setIsOpen] = useState(false);

    // dados do usuario
    const [info, setUserInfo] = useState({});
    const [adList, setAdList] = useState([]);


    //dados para edição dos dados do usuario
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [stateList, setState] = useState([]);
    const [password, setPassword] = useState('');
    const [stateLoc, setStateLoc] = useState('');

    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const getUser = async () => {
            const json = await api.getUser();
            setUserInfo(json);
            setAdList(json.ads);
        }
        getUser();
    }, []);

    useEffect(() => {
        const getStates = async () => {
            const slist = await api.getStates();
            setState(slist);
        }
        getStates();
    }, []);

    const showModal = () => {
        setIsOpen(true)
    }
    const hideModal = () => {
        setIsOpen(false)
    }
    const handleAttInfo = async (e) => {

        e.preventDefault();
        setDisabled(true);
        setError('');

        const json = await api.updateUser(name, email, stateLoc, password);

        if (json.error) {
            setError(json.error);
        } else {
            window.location.href = '/user/me';
        }

        setDisabled(false);
        setIsOpen(false)
    }

    return (
        <>
            <Container>
                <PageArea>
                    <div className="userInfo">
                        <h2 className='title'>Olá, {info.name}</h2>
                        <div className='user'>
                            <div className='avatar'>
                                <img src="https://i.imgur.com/pYxq5za.jpg" alt="" />
                            </div>
                            <div className='userInfosAndEdit'>
                                <div className="actualInfos">
                                    <h1>Informações Atuais</h1>
                                    <table>
                                        <tr>
                                            <td className='tdLabel'>
                                                Nome:
                                            </td>
                                            <td>
                                                {info.name}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='tdLabel'>
                                                Email:
                                            </td>
                                            <td>
                                                {info.email}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='tdLabel'>
                                                Estado:
                                            </td>
                                            <td>
                                                {info.state}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='tdLabel'>
                                                Anuncios:
                                            </td>
                                            <td>
                                                {adList.length}
                                            </td>
                                        </tr>
                                    </table>
                                    <div className="d-flex justify-content-end">
                                        <button type="button" className="btn btn-primary" onClick={showModal}>Editar informações</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Modal show={isOpen} onHide={hideModal}>
                        <Modal.Header>
                            <p className="h4">Edite aqui suas informações</p>
                        </Modal.Header>
                        <form onSubmit={handleAttInfo} >
                            <Modal.Body>
                                <div className="form-group">
                                    <label htmlFor="nome">
                                        Nome:
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="nome"
                                            value={name}
                                            disabled={disabled}
                                            onChange={e => setName(e.target.value)}
                                        >
                                        </input>
                                    </label >
                                </div>
                                <div className="form-group">
                                    <label htmlFor="Email">
                                        E-mail:
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="email"
                                            value={email}
                                            disabled={disabled}
                                            onChange={e => setEmail(e.target.value)}
                                        >
                                        </input>
                                    </label>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="Estado">
                                        Estado:
                                        <select
                                            className="form-control"
                                            value={stateLoc}
                                            disabled={disabled}
                                            onChange={e => setStateLoc(e.target.value)} >
                                            <option></option>
                                            {stateList.map((i, k) =>
                                                <option key={k} value={i._id}>{i.name}</option>
                                            )}
                                        </select>
                                    </label>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">
                                        Nova senha:
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            value={password}
                                            disabled={disabled}
                                            onChange={e => setPassword(e.target.value)}
                                        >
                                        </input>
                                    </label>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <button type="button" className="btn btn-danger" onClick={hideModal}>Cancelar</button>
                                <button type="submit" className="btn btn-success">Salvar</button>
                            </Modal.Footer>
                        </form>
                    </Modal>
                </PageArea>
            </Container>
            <Container>
                <p className="h3">Meus anúncios</p>
                <PageArea>
                    <Row className="g-4">
                        {adList.map((i, k) =>
                            <Col key={k} md={2} className="py-1 px-1">
                                <EditItem data={i} />
                            </Col>
                        )}
                    </Row>
                </PageArea>
            </Container>
        </>
    );
}

export default Page;