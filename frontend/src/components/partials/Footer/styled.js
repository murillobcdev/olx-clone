import styled from 'styled-components';

export const FooterArea = styled.div`
    padding-top:10px;
    background-color:#AC7FDB;
    display:flex;
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
    .creditos p{
        text-center;
        color:#000;
    }
`;