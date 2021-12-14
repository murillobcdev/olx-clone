import React from 'react';
import { Item } from './styled';
import { Link } from 'react-router-dom';

export default (props) => {
    let price = '';

    if (props.data.priceNegotiable) {
        price = "Preço negociável";
    } else {
        price = `R$ ${props.data.price}`
    }

    const handleClick = () => {
        window.location.href = `/ad/${props.data.id}`;
    }

    return (
        <Item className="aditem">
            <Link to={`/ad/${props.data.id}`} onClick={handleClick}>
                <div className="item-image">
                    {
                        props.data.images &&

                        props.data.images
                            .slice(0, 2)
                            .filter(e => e !== undefined)
                            .map((image, index) =>
                                <>
                                    <img key={index} src={`http://alunos.b7web.com.br:501/media/${image.url}`} alt="" />
                                    {console.log(image)}
                                </>
                            )
                    }
                    <img src={props.data.image} alt="" />
                </div>
                <div className="item-name">
                    {props.data.title}
                </div>
                <div className="item-price">
                    {price}
                </div>
            </Link>
        </Item>
    );
}