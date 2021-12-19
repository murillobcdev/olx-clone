import styled from 'styled-components';

export const PageArea = styled.div`
display:flex;
margin-top:20px;

.loading-spinner{
  height:100%;
  width:100%;
}

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
  .infoAd{
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

export const OthersArea = styled.div`
h2{
  font-size:20px;
}
.list {
  display:flex;
  flex-wrap: wrap;
  
   .aditem{
    width:25%;
   }
}

  `;

export const BreadCrumb = styled.div`
  font-size:13px;
  margin-top:20px;

  a{
    display:inline-block;
    margin:0px 5px;
    text-decoration:underline;
    color:#000;
  }
  `;