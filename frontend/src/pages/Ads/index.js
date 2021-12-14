import React, { useState, useEffect } from 'react';
import { PageArea } from './styled';
import { PageContainer } from '../../components/MainComponents';
import useApi from '../../helpers/MBSApi';
import { useLocation, useHistory } from 'react-router-dom';
import AdItem from '../../components/partials/AdItem';


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

    const [estado, setEstado] = useState(
        query.get('estado') != null ? query.get('estado') : ''
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

    const getAdsList = async () => {
        setLoading(true);

        let offset = (currentPage - 1) * 9;

        const json = await api.getAds({
            sort: 'desc',
            limit: 9,
            q, cat, estado,
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
        if (estado) {
            queryString.push(`state=${estado}`);
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
    }, [q, cat, estado]);

    let pagination = [];
    for (let i = 1; i <= pageCount; i++) {
        pagination.push(i);
    }

    return (
        <>
            <PageContainer>
                <PageArea>
                    <div className='leftSide'>
                        <form method='GET'>
                            <input
                                type='text'
                                name='q'
                                placeholder='O que você procura?'
                                value={q}
                                onChange={e => setQ(e.target.value)}
                            />

                            <div className='filterName'>Estado:</div>
                            <select
                                name='state'
                                value={estado}
                                onChange={e => setEstado(e.target.value)}
                            >
                                <option></option>
                                {stateList.map((i, k) =>
                                    <option key={k} value={i.name}>{i.name}</option>
                                )}

                            </select>
                            <div className='filterName'>Categorias:</div>
                            <ul>
                                <li
                                    className={cat === '' ? 'categoryItem active ' : 'categoryItem'}
                                    onClick={() => setCat('')}>
                                    <div className="img">ツ</div>
                                    <span>Todas</span>
                                </li>
                                {categories.map((i, k) =>
                                    <li
                                        onClick={() => setCat(i.slug)}
                                        key={k}
                                        className={cat === i.slug ? 'categoryItem active ' : 'categoryItem'}
                                    >
                                        <img src={i.img} alt=""></img>
                                        <span>{i.name}</span>
                                    </li>
                                )}
                            </ul>
                        </form>
                    </div>
                    
                    <div className='rightSide'>
                        <h2>Resultados</h2>

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

                        <div className='list' style={{ opacity: resultOpacity }}>
                            {adList.map((i, k) =>
                                <AdItem key={k} data={i} />
                            )}
                        </div>

                        <div className='pagination'>
                            {pagination.map((i, k) =>
                                <div onClick={() => setCurrentPage(i)}
                                    className={i === currentPage ? 'pageItem active' : 'pageItem'}>
                                    {i}
                                </div>
                            )}
                        </div>

                    </div>
                </PageArea>
            </PageContainer>
        </>
    );
}
export default Page;