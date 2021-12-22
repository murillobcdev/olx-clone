import React, { useState, useEffect } from 'react';
import { PageArea, SearchArea } from './styled';
import useApi from '../../helpers/MBSApi';
import { Link } from 'react-router-dom';
import AdItem from '../../components/partials/AdItem';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



const Page = () => {

    const api = useApi();

    const [stateList, setStateList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [adList, setAdList] = useState([]);

    useEffect(() => {
        const getStates = async () => {
            const slist = await api.getStates();
            setStateList(slist);
        }
        getStates();
    }, []);

    useEffect(() => {
        const getCategories = async () => {
            const cats = await api.getCategories();
            setCategories(cats);
        }
        getCategories();
    }, []);

    useEffect(() => {
        const getRecentAds = async () => {
            const json = await api.getAds({
                sort: 'desc',
                limit: 8
            });
            setAdList(json.ads);
        }
        getRecentAds();
    }, []);

    return (
        <>
            <SearchArea>
                <Container>
                    <Form
                        method="GET"
                        action="/ads"
                    >
                        <Row className="flex-row justify-content-center align-items-center m-3">
                            <InputGroup>
                                <Col>
                                    <Form.Control
                                        name="q"
                                        placeholder="Pesquise algo :D"
                                    />
                                </Col>
                                <Col sm={3}>
                                    <Form.Select
                                        name="state"
                                    >
                                        {stateList.map((i, k) =>
                                            <option key={k} value={i.id}>{i.name}</option>
                                        )}
                                    </Form.Select>
                                </Col>
                            </InputGroup>
                        </Row>
                        <Row className="justify-content-center mb-3">
                            <Col md={2} xs={5}>
                                <button className="btn btn-outline-light post container-fluid">
                                    Pesquisar
                                </button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
                <Container className="mt-2 d-flex justify-content-center">
                    <Row className="mb-1">
                        {categories.map((i, k) =>
                            <Col className="categoryItems m-1">
                                <Link
                                    key={k}
                                    to={`/ads?cat=${i.slug}`}
                                    className="d-flex align-items-center"
                                >
                                    <img src={i.img} alt="categoria" className="mx-1" />
                                    <span className="w-100 text-center">{i.name}</span>
                                </Link>
                            </Col>
                        )}
                    </Row>
                </Container>
            </SearchArea>
            <Container>
                <PageArea>
                    <p className="h4 my-3 text-center">Anúncios mais recentes</p>
                    <Row>
                        {adList.map((i, k) =>
                            <Col md={3} key={k} className="py-1 px-1">
                                <AdItem data={i} />
                            </Col>
                        )}
                    </Row>
                    <Container className="d-flex flex-column justify-content-center my-2">
                        <Link to="/ads" className="btn btn-outline-dark post">
                            Ver todos
                        </Link>
                    </Container>
                </PageArea>
            </Container>
            <Container>
                <PageArea className="text-center my-3">
                    <hr />
                    Pequeno site para comércio local semelhante a OLX. Fiz com <strong>React+Bootstrap</strong> e é meu primeiro projeto grande.
                    <hr />
                </PageArea>
            </Container>
        </>
    );
}

export default Page;