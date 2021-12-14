import styled from 'styled-components';

export const Item = styled.div`

a{
    display:block;
    text-decoration:none;
    margin:10px;
    border:1px solid #FFF;
    color:#000;
    padding:10px;
    background-color:var(--bs-gray-200);
    transition:all ease .3s;
    border-radius:5px;

    &:hover{
        border:1px solid #AE2BB2;
        background-color:#C98DCB;
        color:#000;
    }

    .item-image img{
        width:100%;
        border-radius:5px;
    }

    .item-name{
        font-weight:bold;
        
    }

    .item-price{
        
    }
}

`;