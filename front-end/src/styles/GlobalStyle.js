import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

    *{
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
        font-family: Roboto, sans-serif;
    }

    #root{
        width: 100vw;
        height: 100vh;

        --primary-color: #d66c05;
    }

    input, button{
        border: 0
    }

    .App{
        display: flex;
        width: 100vw;
        height: 100vh;
        background-size: cover;
        justify-content: space-between;

    }


`;