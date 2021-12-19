import React, { useState, useEffect } from 'react';
import { PageArea, OthersArea, BreadCrumb } from './styled';
import { PageContainer } from '../../components/MainComponents';
import { useParams } from 'react-router-dom';
import useApi from '../../helpers/MBSApi';
import { Slide } from "react-slideshow-image";
import AdItem from '../../components/partials/AdItem';
import "react-slideshow-image/dist/styles.css";
import Spinner from 'react-bootstrap/Spinner'
import { Link } from 'react-router-dom';

const Page = () => {

    const api = useApi();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [adInfo, setAdInfo] = useState([]);


    useEffect(() => {
        const getAdInfo = async (id) => {

            const json = await api.getAd(id, true);

            setAdInfo(json);
            setLoading(false);
        }
        getAdInfo(id);
    }, [id]);

    const formatDate = (date) => {
        let cDate = new Date(date);
        let months = [
            'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
        ];
        let cDay = cDate.getDate();
        let cMonth = cDate.getMonth();
        let cYear = cDate.getFullYear();

        return `${cDay} de ${months[cMonth]} de ${cYear}`;
    }

    return (
        <PageContainer>
            {adInfo.category &&
                <BreadCrumb>
                    Você está aqui:
                    <Link to="/">Home</Link>
                    /
                    <Link to={`/ads?state=${adInfo.stateName}`}>{adInfo.stateName}</Link>
                    /
                    <Link to={`/ads?state=${adInfo.stateName}&cat=${adInfo.category.slug}`}>{adInfo.category.name}</Link>
                    /
                    {adInfo.title}
                </BreadCrumb>
            }
            <PageArea>
                <div className="leftSide">
                    <div className="box">
                        <div className="adImage">
                            {loading &&
                                <div className="loading-spinner d-flex justify-content-center align-items-center">
                                    <Spinner animation="border" variant="dark" />
                                </div>
                            }
                            {adInfo.images &&
                                <Slide>
                                    {adInfo.images.map((img, k) =>
                                        <div key={k} className="each-slide">
                                            <img src={img} alt="" />
                                        </div>
                                    )}
                                </Slide>
                            }
                        </div>
                        <div className="infoAd">
                            <div className="adName">
                                {loading &&
                                    <div className="loading-spinner d-flex justify-content-center align-items-center">
                                        <Spinner animation="border" variant="dark" />
                                    </div>
                                }
                                {adInfo.title &&
                                    <h2>{adInfo.title}</h2>
                                }
                                {adInfo.dateCreated &&
                                    <small>Criado em {formatDate(adInfo.dateCreated)}</small>
                                }
                            </div>
                            <div className="adDesc">
                                {loading &&
                                    <div className="loading-spinner d-flex justify-content-center align-items-center">
                                        <Spinner animation="border" variant="dark" />
                                    </div>
                                }
                                {adInfo.description}
                                <hr />
                                {adInfo.views &&
                                    <small>Visualizações: {adInfo.views}</small>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rightSide">
                    <div className="box -padding">
                        {loading &&
                            <div className="loading-spinner d-flex justify-content-center align-items-center">
                                <Spinner animation="border" variant="dark" />
                            </div>
                        }
                        {adInfo.priceNegotiable &&
                            "Preço negociável"
                        }
                        {!adInfo.priceNegotiable && adInfo.price &&
                            <div className="price">
                                Preço: <span>R$ {adInfo.price}</span>
                            </div>
                        }
                    </div>
                    {loading &&
                        <div className="loading-spinner d-flex justify-content-center align-items-center">
                            <Spinner animation="border" variant="dark" />
                        </div>
                    }
                    {adInfo.userInfo &&
                        <>
                            <a href={`mailto:${adInfo.userInfo.email}`} target="_blank" rel="noopener noreferrer" className="contactSeller" >Fale com o vendedor</a>
                            <div className="createdBy box -padding">
                                <span>Criado por: <strong>{adInfo.userInfo.name}</strong></span>
                                <small>E-mail: {adInfo.userInfo.email}</small>
                                <small>Estado: {adInfo.stateName}</small>
                            </div>
                        </>
                    }
                </div>
            </PageArea>
            <OthersArea>
                {adInfo.others &&
                    <>
                        <h2>Outras ofertas do vendedor</h2>
                        <div className="list">
                            {adInfo.others.map((i, k) =>
                                <AdItem key={k} data={i} />
                            )}
                        </div>
                    </>
                }
            </OthersArea>
        </PageContainer>
    );
}

export default Page;