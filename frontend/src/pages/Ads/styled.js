import styled from 'styled-components';

export const PageArea = styled.div`

height:100%;

.ativo{
    background-color:#670696;
    color:#FFF;
}

.results{
    h2{
        margin-top:0;
        font-size:18px;
    }
    .listWarning {
        padding:30px;
        text-align:center;
    }

    .aditem{
        width:100%;
        text-align:center;
        background-color:#f5f5f5;
        padding:10px;
    
        a{
            text-decoration:none;
            color:#000;
            text-wrap
        }
    
        &:hover{
            background-color:#8c36b5;
    
            a, p{
                color:#FFF;
            }
        }
    }

}
`;