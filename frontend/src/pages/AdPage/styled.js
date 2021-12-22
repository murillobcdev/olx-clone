import styled from 'styled-components';

export const PageArea = styled.div`

display:flex;
margin-top:20px;

.loading-spinner{
  height:100%;
  width:100%;
}

.productCaption{
  display:flex;
  flex-flow:column;
  align-items:center;
  background-color:rgba(255, 255, 255, 0.0);
}

.productCaption p{
  text-align:center;
  background-color:#670696;
  color:#FFF;
  display:inline;
  text-transform:capitalize;
  padding:8px;
  border-radius:5px;
}

.contactRow{
  border:1px solid #670696;
  border-radius:5px;
  background-color:#670696;
  color:#FFF;
}

.price{
  border:1px solid #FFF;
}


`;

export const OthersArea = styled.div`

p{
  background-color:#670696;
  color:#FFF;
  padding:15px;
  border-radius:8px;
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

  `;
