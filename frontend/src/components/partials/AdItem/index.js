import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';

export default (props) => {

    let price = '';

    if (props.data.priceNegotiable) {
        price = "Preço negociável";
    } else {
        price = `R$ ${props.data.price}`
    }

    return (
        <Card className="aditem">
            <Link to={`/ad/${props.data.id}`}>
                {
                    props.data.images &&
                    props.data.images
                        .slice(0, 2)
                        .filter(e => e !== undefined)
                        .map((image, index) =>
                            <>
                                <Card.Img key={index} src={`http://alunos.b7web.com.br:501/media/${image.url}`} alt="" />
                            </>
                        )
                }
                <Card.Img src={props.data.image} className="my-2" />
                <Card.Title>
                    {props.data.title.length > 20
                        ? `${props.data.title.substring(0, 10)} ...leia mais`
                        : props.data.title
                    }
                </Card.Title>
                <Card.Text>{price}</Card.Text>
            </Link>
        </Card>
    );
}