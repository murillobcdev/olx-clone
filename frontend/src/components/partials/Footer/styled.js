import styled from 'styled-components';

export const FooterArea = styled.footer`
    cursor:pointer;
    padding:10px;


    background-color:#AC7FDB;

    display:flex;
    flex-flow:column;
    justify-content:center;
    align-items:center;

    color:#FFF;
    font-size:13px;

    bottom:0;
    left:0;
    right:0;
    
    .list{
        list-style:none;
        display:flex;
        align-items:center;
        justify-content:space-between;
        margin:0;
        padding:0;
    }
    .list img{
        width:25px;
        height:25px;
    }
    text{
        text-center;
        color:#000;
    }
`;