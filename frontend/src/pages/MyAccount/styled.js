import styled from 'styled-components';

export const PageArea = styled.div`

display:flex;
justify-content:center;

.userInfo, .user{
    display:flex;
    flex-flow:column;
    align-items:center;
}
.avatar img{
    width:100px;
    height:100px;
    border-radius:50%;
    object-fit:cover;
}
.userInfosAndEdit{
    display:flex;
}
.actualInfos, .editInfos{
    flex:1;
}
.actualInfos h1, .editInfos h1{
    text-align:center;
    font-size:18px;
}
.actualInfos{
    background-color:#670696;
    padding:20px;
    border-radius:8px;
    color:#FFF;
    margin:15px 15px;
}
.editInfos{
    background-color:#fc4103;
    padding:20px;
    border-radius:8px;
    color:#FFF;
    margin:15px 15px;
}
.tdLabel{
    font-weight:bold;
    padding-right:15px;
}

.showAds{
    width:100%;

    .userAds{
        flex-wrap:wrap;
        display:flex;
    
        .aditem{
            width:33%;
            text-align:center;
        }
    }
}



`;