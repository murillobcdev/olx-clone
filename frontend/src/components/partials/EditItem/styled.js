import styled from 'styled-components';

export const Item = styled.div`

a{
    display:block;
    text-decoration:none;
    border:1px solid #FFF;
    border-bottom:0px;
    color:#000;
    background-color:var(--bs-gray-200);
    transition:all ease .3s;
    border-radius:5px;

        &:hover{
            background-color:#C98DCB;
            color:#000;
        }
        
    .item-image img{
        width:100%;
        border-radius:5px;
    }
    .item-name{
        font-weight:bold;
        text-transform: capitalize;
    }
    .item-price{
        
    }
}
button{
    margin-left:250px;
    margin-top:-15px;
    margin-bottom:15px;
}


`;