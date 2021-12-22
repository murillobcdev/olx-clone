import React, { useState, useEffect } from 'react';
import { PageArea, OthersArea } from './styled';
import { useParams } from 'react-router-dom';
import useApi from '../../helpers/MBSApi';
import AdItem from '../../components/partials/AdItem';
import Spinner from 'react-bootstrap/Spinner'
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Carousel from 'react-bootstrap/Carousel';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

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

    const getImage = (i, k) => {
        let newDefaultImage = 'https://pngimage.net/wp-content/uploads/2018/05/default-png-3.png';
        let defaultImg = 'http://alunos.b7web.com.br:501/media/undefined';
        if (i == defaultImg) {
            return (
                <Carousel.Item
                    className="d-flex justify-content-center"
                    key={k}
                >
                    <img
                        className="w-60 d-block"
                        src={newDefaultImage}
                        alt=""
                    />
                </Carousel.Item>
            )
        } else {
            return (
                <Carousel.Item
                    className="d-flex justify-content-center"
                    key={k}
                >
                    <img
                        className="w-60 d-block"
                        src={i}
                        alt=""
                    />
                </Carousel.Item>
            )
        }
    }

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
        <>
            <Container>
                <Container>
                    {adInfo.category &&
                        <Breadcrumb>
                            <Breadcrumb.Item>
                                Você está aqui:
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <Link to="/">Home</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <Link to={`/ads?state=${adInfo.stateName}`}>
                                    {adInfo.stateName}
                                </Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <Link to={`/ads?state=${adInfo.stateName}&cat=${adInfo.category.slug}`}>
                                    {adInfo.category.name}
                                </Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                {adInfo.title.length > 20
                                    ? adInfo.title.substring(0, 15)
                                    : adInfo.title
                                }
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    }
                </Container>
                <Container>
                    <PageArea>
                        <Container>
                            <Container>
                                <Carousel variant="dark" fade>
                                    {loading &&
                                        <div className="loading-spinner d-flex justify-content-center align-items-center">
                                            <Spinner animation="border" variant="dark" />
                                        </div>
                                    }
                                    {
                                        adInfo.images &&
                                        adInfo.images.map((img, k) =>
                                            getImage(img, k)
                                        )
                                    }
                                </Carousel>
                                <Container className="productCaption p-3">
                                    {loading &&
                                        <div className="loading-spinner d-flex justify-content-center align-items-center">
                                            <Spinner animation="border" variant="dark" />
                                        </div>
                                    }
                                    {adInfo.title &&
                                        <p className="h2">
                                            {adInfo.title.length > 20
                                                ? adInfo.title.substring(0, 35)
                                                : adInfo.title
                                            }
                                        </p>
                                    }
                                    {adInfo.description &&
                                        <p className="h5">
                                            {adInfo.description}
                                        </p>
                                    }
                                    {adInfo.dateCreated &&
                                        <p className="h6">
                                            Criado em {formatDate(adInfo.dateCreated)}
                                        </p>
                                    }
                                    {adInfo.views &&
                                        <p className="h6">
                                            Visualizações: {adInfo.views}
                                        </p>
                                    }
                                </Container>
                            </Container>
                            <Container>
                                <Row className="contactRow align-items-center p-1 my-2">
                                    <Col className="text-center">
                                        {loading &&
                                            <div className="loading-spinner d-flex justify-content-center align-items-center">
                                                <Spinner animation="border" variant="dark" />
                                            </div>
                                        }
                                        {adInfo.priceNegotiable &&
                                            <div className="price">
                                                "Preço negociável"
                                            </div>
                                        }
                                        {!adInfo.priceNegotiable && adInfo.price &&
                                            <div className="price">
                                                Preço: <span>R$ {adInfo.price}</span>
                                            </div>
                                        }
                                    </Col>
                                    <Col>
                                        {adInfo.userInfo &&
                                            <Container className="d-flex flex-column text-center">
                                                <span>Criado por: <strong>{adInfo.userInfo.name}</strong></span>
                                                <small>E-mail: <strong>{adInfo.userInfo.email}</strong></small>
                                                <small>Estado: <strong>{adInfo.stateName}</strong></small>
                                            </Container>
                                        }
                                    </Col>
                                    <Col className="text-center">
                                        {adInfo.userInfo &&
                                            <a
                                                href={`mailto:${adInfo.userInfo.email}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn btn-outline-light"
                                            >
                                                Fale com o vendedor
                                            </a>
                                        }
                                    </Col>
                                </Row>
                            </Container>
                        </Container>
                    </PageArea>
                </Container>
                <Container>
                    <OthersArea className="my-2">
                        <p className="h2 text-center">Outros anúncios do vendedor</p>
                        {adInfo.others &&
                            <>
                                <Row>
                                    {adInfo.others.map((i) =>
                                        <Col md={3} className="py-1 px-1">
                                            <AdItem data={i} />
                                        </Col>
                                    )}
                                </Row>
                            </>
                        }
                    </OthersArea>
                </Container>
            </Container >
        </>
    );
}

export default Page;