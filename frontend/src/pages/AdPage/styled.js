import styled from 'styled-components';

export const Fake = styled.div`
  background-color:#DDD;
  height:${props => props.height || 20}px;
`;

export const PageArea = styled.div`
display:flex;
margin-top:20px;

.-padding{
  padding:10px;
}

.box{
  background-color:#FFF;
  border-radius:5px;
  box-shadow:0px 0px 4px #999;
  margin-bottom:20px; 
}

.leftSide{
  flex:1;
  margin-right:20px;

  .box{
    display:flex;
  
  }

  .adImage{
    width:320px;
    height:320px;
    margin-right:20px;

    .each-slide img{
      display:flex;
      align-items:center;
      justify-content:center;
      background-size:cover;
      height:320px;
    }
  }
  .adInfo{
    flex:1;
    margin-right:20px;

    .adName{
      margin-bottom:20px;


      h2{
        margin:0px;
        margin-top:20px;

      }
      small{
        color:#BBB;

      }

    }
    .adDesc{

      small{
        color:#BBB;
      }
    }
  }
}
.rightSide{
  width:250px;

  .price span{
    color:#BF2AD5;
    display:block;
    font-size:25px;
    font-weight:bold;
  }
  .contactSeller{
    background-color:#BF2AD5;
    color:#FFF;
    height:30ox;
    border-radius:5px;
    box-shadow:0px 0px 4px #999;
    display:flex;
    justify-content:center;
    align-items:center;
    text-decoration:none;
    margin-bottom:20px;
    padding:8px;
  }
  .createdBy strong{
    text-transform:capitalize;
  }
  .createdBy small{
    display:block;
    color:#999;
    margin-top:10px;
  }
}

  
  `;