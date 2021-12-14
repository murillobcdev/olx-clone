import styled from 'styled-components';

export const SearchArea = styled.div`
background-color:#AC7FDB;
border-bottom:#CCC;
padding:20px 0;

.searchBox{
    background-color:#670696;
    padding:20px 15px;
    display:flex;
    justify-content:center;
    align-items:center;
    border-radius:5px;
    box-shadow: 1px 1px 1px 0.3px rgba (0,0,0, 0.2);

    form{
        flex:1;
        display:flex;
        justify-content:center;

        input, select{
            height:40px;
            border:0;
            border-radius:5px;
            outline:0;
            font-size:15px;
            color:#000;
            margin-right:30px;
            padding:10px;
        }
        input{
            flex:1;
            padding:0 10px;
        }
        select{
            width:100px;
        }
        button{
            background-color:#C228DB;
            border-radius:5px;
            outline:none;
            border:0px;
            padding:10px;
            color:#FFF;
            cursor:pointer;

            &:hover{
            background-color:#DB42C4;
            }
        }
    }
}

.categoryList{
    display:flex;
    flex-wrap:wrap;
    margin-top:20px;

    .categoryItem{
        width:25%;
        display:flex;
        align-items:center;
        justify-content:center;
        color:#FFF;
        text-decoration:none;
        height:50px;
        margin-bottom:10px;
        background-color:#670696;
        padding:35px;
        border-radius:3px;
        transition:all ease 0.3s;

        &:hover{
            background-color:#DB42C4;
        }
        img{
            width:45px;
            height:45px;
            margin-right:10px;
        }
    }
}
`;
export const PageArea = styled.div`
h2{
    font-size:20px;
}
.list{
    display:flex;
    flex-wrap:wrap;

    .aditem{
        width:25%;
        text-align:center;
    }
}
.seeAllLink{
    color:#000;
    text-decoration:none;
    font-weight:bold;
    display:inline-block;
}
`;