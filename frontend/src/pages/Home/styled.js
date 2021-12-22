import styled from 'styled-components';

export const SearchArea = styled.div`

background-color:#975bb5;
padding:20px 0 20px 0;

.post{
    background-color:#670696;
    color:#FFF;
}

input, select{
    border:2px solid #670696;
    outline:0;
}

    .categoryItems{
        padding:10px;
        text-decoration:none;
        background-color:#670696;
        transition:all ease 0.3s;
        border-radius:5px;

            &:hover{
                background-color:#8c36b5;
            }

        a{
            color:#FFF;
            text-decoration:none;
        }
    }
}
`;
export const PageArea = styled.div`

p{
    cursor:pointer;
    color:#670696;
}

.post{
    background-color:#670696;
    color:#FFF;
}

.aditem{
    width:100%;
    text-align:center;
    background-color:#f5f5f5;
    padding:8px;

    a{
        text-decoration:none;
        color:#000;
    }

    &:hover{
        background-color:#8c36b5;

        a, p{
            color:#FFF;
        }
    }
}

`;