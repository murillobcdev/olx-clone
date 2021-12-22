import React, { useState, useEffect } from 'react';
import { PageArea } from './styled';
import useApi from '../../helpers/MBSApi';
import { useLocation, useHistory } from 'react-router-dom';
import AdItem from '../../components/partials/AdItem';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Pagination from 'react-bootstrap/Pagination'

let timer;

const Page = () => {

    const api = useApi();
    const history = useHistory();

    const useQueryString = () => {
        return new URLSearchParams(useLocation().search);
    }

    const query = useQueryString();

    const [q, setQ] = useState(
        query.get('q') != null ? query.get('q') : ''
    );

    const [cat, setCat] = useState(
        query.get('cat') != null ? query.get('cat') : ''
    );

    const [state, setState] = useState(
        query.get('state') != null ? query.get('state') : ''
    );

    const [stateList, setStateList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [adList, setAdList] = useState([]);
    const [adsTotal, setAdsTotal] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [resultOpacity, setResultOpacity] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [warningMessage, setWarningMessage] = useState('Carregando..');
    const [loading, setLoading] = useState(true);

    //offcanvas controlador
    const [show, setShow] = useState(false);


    const getAdsList = async () => {
        setLoading(true);

        let offset = (currentPage - 1) * 9;

        const json = await api.getAds({
            sort: 'desc',
            limit: 9,
            q, cat, state,
            offset
        });

        setAdList(json.ads);
        setAdsTotal(json.total);
        setResultOpacity(1);
        setLoading(false);
    }

    useEffect(() => {
        setResultOpacity(0.3);
        getAdsList();
    }, [currentPage]);

    useEffect(() => {
        if (adList.length > 0) {
            setPageCount(
                Math.ceil(adsTotal / adList.length)
            );
        } else {
            setPageCount(0);
        }
    }, [adsTotal]);

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
        let queryString = [];
        if (q) {
            queryString.push(`q=${q}`);
        }
        if (cat) {
            queryString.push(`cat=${cat}`);
        }
        if (state) {
            queryString.push(`state=${state}`);
        }

        history.replace({
            search: `?${queryString.join('&')}`
        });

        if (timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(getAdsList, 2000);
        setResultOpacity(0.3);
        setCurrentPage(1);
    }, [q, cat, state]);

    let pagination = [];
    for (let i = 1; i <= pageCount; i++) {
        pagination.push(i);
    }

    function handleShow() {
        setShow(true);
    }

    function handleClose() {
        setShow(false);
    }

    function handlePaginationNext() {
        if (currentPage === pagination.length) {
            setCurrentPage(currentPage)
        } else {
            let page = currentPage;
            page++;
            setCurrentPage(page);
        }
    }

    function handlePaginationPrev() {
        if (currentPage === 1) {
            setCurrentPage(currentPage)
        } else {
            let page = currentPage;
            page--;
            setCurrentPage(page);
        }
    }

    return (
        <>
            <Container>
                <PageArea>
                    <button onClick={handleShow} className='btn btn-lg btn-outline-warning ativo my-3'>
                        Filtros
                    </button>
                    <Offcanvas scroll={true} show={show} onHide={handleClose} style={{ width: 245 }} >
                        <Offcanvas.Header closeButton></Offcanvas.Header>
                        <Offcanvas.Body>
                            <Form
                                method='GET'
                            >
                                <Form.Group>
                                    <Form.Label>
                                        O que você procura?
                                        <Form.Control
                                            type='text'
                                            name='q'
                                            value={q}
                                            onChange={e => setQ(e.target.value)}
                                        />
                                    </Form.Label>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>
                                        Estado
                                        <Form.Select
                                            name='state'
                                            value={state}
                                            onChange={e => setState(e.target.value)}
                                        >
                                            {stateList.map((i, k) =>
                                                <option key={k} value={i.name}>{i.name}</option>
                                            )}
                                        </Form.Select>
                                    </Form.Label>
                                </Form.Group>
                                <Form.Group>
                                    <ListGroup as='ul'>
                                        <ListGroup.Item
                                            as='li'
                                            className={cat === '' ? 'd-flex justify-content-between align-items-start active ' : 'd-flex justify-content-between align-items-start'}
                                            action
                                            onClick={() => setCat('')}
                                        >
                                            <div className="niceIcon">ツ</div>
                                            <span>Todas</span>
                                        </ListGroup.Item>
                                        {categories.map((i, k) =>
                                            <ListGroup.Item
                                                as='li'
                                                onClick={() => setCat(i.slug)}
                                                key={k}
                                                className={cat === i.slug ? 'd-flex justify-content-between align-items-start active ' : 'd-flex justify-content-between align-items-start'}
                                                action
                                            >
                                                <img src={i.img} alt=""></img>
                                                <span>{i.name}</span>
                                            </ListGroup.Item>
                                        )}
                                    </ListGroup>
                                </Form.Group>
                            </Form>
                        </Offcanvas.Body>
                    </Offcanvas>
                    <Container className="results">

                        <p className="h4 my-3 text-center">Resultados</p>

                        <Pagination className="d-flex justify-content-center my-3">

                            <Pagination.First onClick={() => setCurrentPage(1)} />
                            <Pagination.Prev onClick={handlePaginationPrev} />

                            {
                                pagination.slice(0, 3).map((i, k) =>
                                    <Pagination.Item
                                        onClick={() => setCurrentPage(i)}
                                        key={k}
                                        className={i === currentPage ? 'active' : ''}
                                    >
                                        {i}

                                    </Pagination.Item>
                                )}
                            <Pagination.Ellipsis />
                            {
                                currentPage > 3 &&
                                <Pagination.Item active>{currentPage}</Pagination.Item>
                            }
                            <Pagination.Next onClick={handlePaginationNext} />
                            <Pagination.Last onClick={() => setCurrentPage(pagination.length)} />
                        </Pagination>

                        {loading && adList.length === 0 &&
                            <div className="listWarning">
                                {warningMessage}
                            </div>
                        }

                        {!loading && adList.length === 0 &&
                            <div className="listWarning">
                                Não encontramos resultados.
                            </div>
                        }

                        <Row className='list' style={{ opacity: resultOpacity }}>
                            {adList.map((i, k) =>
                                <Col key={k} md={2} className="py-1 px-1">
                                    <AdItem data={i} />
                                </Col>
                            )}
                        </Row>
                        
                    </Container>
                </PageArea>
            </Container>
        </>
    );
}
export default Page;