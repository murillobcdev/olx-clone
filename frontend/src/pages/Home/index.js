import React, { useState, useEffect } from 'react';
import { PageArea, SearchArea } from './styled';
import { PageContainer } from '../../components/MainComponents';
import useApi from '../../helpers/MBSApi';
import { Link } from 'react-router-dom';
import AdItem from '../../components/partials/AdItem';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
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
                {/* <PageContainer>
                    <div className="searchBox">
                        <form method="GET" action="/ads">
                            <input type="text" name="q" placeholder="O que você procura?" />
                            
                            <select value={stateLocal} onChange={e => setStateLocal(e.target.value)}>
                                <option></option>
                                {stateList.map((i, k) =>
                                    <option key={k} value={i._id}>{i.name}</option>
                                )}
                            </select>

                            <button>Pesquisar</button>
                        </form>
                    </div>
                    <div className="categoryList">
                        {categories.map((i, k) =>
                            <Link key={k} to={`/ads?cat=${i.slug}`} className="categoryItem">
                                <img src={i.img} alt="" />
                                <span>{i.name}</span>
                            </Link>
                        )}
                    </div>
                </PageContainer> */}

                <Container>
                    <Form
                        method="GET"
                        action="/ads"
                    >
                        <Row className="flex-row justify-content-center align-items-center">
                            <Col xs={7}>
                                <Form.Control
                                    name="q"
                                    placeholder="O que você procura?"
                                />
                            </Col>
                            <Col>
                                <Form.Select
                                    name="state"
                                    // value={stateLocal}
                                    // onChange={e => setStateLocal(e.target.value)}
                                >
                                    {stateList.map((i, k) =>
                                        <option key={k} value={i.id}>{i.name}</option>
                                    )}
                                </Form.Select>
                            </Col>
                            <Col >
                                <button className="btn btn-outline-dark post container-fluid">
                                    Pesquisar
                                </button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
                <Container>
                    <div className="categoryList">
                        {categories.map((i, k) =>
                            <Link key={k} to={`/ads?cat=${i.slug}`} className="categoryItem">
                                <img src={i.img} alt="" />
                                <span>{i.name}</span>
                            </Link>
                        )}
                    </div>
                </Container>
            </SearchArea>
            <PageContainer>
                <PageArea>
                    <h2>Anúncios Recentes</h2>
                    <div className="list">
                        {adList.map((i, k) =>
                            <AdItem key={k} data={i} />
                        )}
                    </div>
                    <Link to="/ads" className="seeAllLink">
                        Ver todos
                    </Link>
                    <hr />
                    <div>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas gravida ut nunc sed accumsan.
                        Nam sed odio bibendum, porta nulla ac, convallis velit.
                    </div>
                    <hr />
                </PageArea>
            </PageContainer>
        </>
    );
}

export default Page;