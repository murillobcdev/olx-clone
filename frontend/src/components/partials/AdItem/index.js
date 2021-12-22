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

    const getImage = (i) => {
        let newDefaultImage = 'https://pngimage.net/wp-content/uploads/2018/05/default-png-3.png';
        let defaultImg = 'http://alunos.b7web.com.br:501/media/default.jpg';
        if (i == defaultImg) {
            return (
                <Card.Img
                    src={newDefaultImage}
                    className="my-2"
                />
            );
        } else {
            return (
                <Card.Img
                    src={i}
                    className="my-2"
                />
            )
        }
    }

    return (
        <Card className="aditem">
            <Link to={`/ad/${props.data.id}`}>
                {
                    getImage(props.data.image)
                }
                <Card.Body>
                    <Card.Title>
                        {props.data.title.length > 20
                            ? `${props.data.title.substring(0, 10)} ...leia mais`
                            : props.data.title
                        }
                    </Card.Title>
                    <Card.Text>
                        {price}
                    </Card.Text>
                </Card.Body>
            </Link>
        </Card>
    );
}