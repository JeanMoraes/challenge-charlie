import styled, { keyframes, css } from 'styled-components';

export const DisplayInfo = styled.main`
    display: flex;
    flex: 1;
    align-items: flex-end;
    padding: 0 0 10% 5%;
    color: #FFF;

    .box_info{
        display: flex;
        align-items: center;

        h1{
            font-size: 120px;
            font-weight: 400;
            text-shadow: 0 0 14px rgba(0,0,0,0.5);
            margin-right: 20px;
        }

        h2{
            font-size: 60px;
            font-weight: 300;
            text-shadow: 0 0 14px rgba(0,0,0,0.5);
        }
    }

    @media (max-width: 1024px){
        display: none;
        align-items: center;
        padding: 0;
    }
`;

export const SideBar = styled.div`
    .box-temperature{
        display: flex;
        justify-self: flex-end;
        flex-direction: column;
        height: 100vh;
        padding: 0 25px 0 25px;
        background-color: rgba(255, 255, 255, 0.8);
        box-shadow: 0 0 10px rgba(0,0,0,0.18);
        backdrop-filter: blur(3px);

        form{
            display: flex;
            justify-items: flex-end;         
            align-items: flex-end;

            input{
                display: flex;
                flex: 1;
                height: 50px;
                background: none;
                border-bottom: 1px solid #aaa;
                padding: 25px;
                font-size: 18px;
            }

            button{
                margin-left: 40px;
                padding: 40px;
                background-color: var(--primary-color);
                cursor: pointer;
                transition: opacity 0.5s ease-in;

                &:hover{
                    opacity: 0.8;
                    transition: opacity 0.2s ease-in
                }

                @media (max-width: 480px){
                    padding: 10px;
                }
            }
        }

        .list-info{
                margin-top: 15px;

                fieldset{
                    margin-top: 10px;
                    padding: 10px;
                    border-color: #f4f4f4;

                    legend{
                        font-weight: bold;
                        padding: 0 15px 0 5px;
                    }

                }
        }

        @media (max-width: 1024px){
            width: 100%;
        }

    }

    @media (max-width: 1024px){
            width: 100%;
    }
`;

export const SubmitButton = styled.button.attrs( props => ({
    type: 'submit',
    disabled: props.loading,
}))`
    margin-left: 40px;
    padding: 40px;
    background-color: var(--primary-color);
    cursor: pointer;
    transition: opacity 0.5s ease-in;

    &:hover{
        opacity: 0.8;
        transition: opacity 0.2s ease-in
    }

    ${props => props.loading && 
    css`
        svg{
            animation: ${animate} 2s linear infinite;
        }
    `
}
`;

//animation of button
const animate = keyframes`
    from{
        transform: rotate(0deg);
    }
    to{
        transform: rotate(360deg);
    }
`;

export default styled;
