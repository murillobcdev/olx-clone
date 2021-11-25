import styled from 'styled-components';

export const PageArea = styled.div`

height:calc(100vh - 120px);

    form{
        display:flex;
        flex-flow:column;
        align-items:center;
        background-color:#FFF;
        border-radius:3px;
        padding:10px;
        box-shadow:0px 0px 3px #999;

        .area{
            display:flex;
            align-items:center;
            justify-content:center;
            padding:10px;
            max-width:500px;
        }
        .area--title{
            width:120px;
            text-align:right;
            padding-right:20px;
            font-weight:400;
            font-size:15px;
        }
        .area--input{
            flex:1;
            display:flex;

            input:not([type='checkbox']){
                width:100%;
                font-size:15px;
                padding:5px;
                border:1px solid #CCC;
                border-radius:3px;
                outline:0;
                transition:all ease 0.3s;

                &:focus{
                    border:1px solid #670696;
                }

            }
            .checkbox{
                float:left;
            }
            button{
                background-color:#670696;
                border:0;
                color:white;
                outline:0;
                padding:5px 10px;
                border-radius:5px;
                cursor:pointer;

                &:hover{
                    background-color:#B400FF;
                }
            }
        }
    }

`;