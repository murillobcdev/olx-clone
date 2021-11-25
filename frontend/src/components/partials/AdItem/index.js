import React from 'react';
import { Item } from './styled';
import { Link } from 'react-router-dom';

export default (props) => {
    let price = '';

    if(props.data.priceNegotiable){
        price = "Preço negociável";
    } else {
        price = `R$ ${props.data.price}`
    }

    return (
        <Item className="aditem">
            <Link to={`/ad/${props.data.id}`}>
                <div className="item-image">
                    <img src={props.data.image} alt="" />
                </div>
                <div className="item-name">{props.data.title}</div>
                <div className="item-price">{price}</div>
            </Link>
        </Item>
    );
}