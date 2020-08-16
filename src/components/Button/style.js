import styled, {css} from 'styled-components';

const shapeVariants = {
    circle: css`
        width: ${({size})=> size};
        height: ${({size})=> size};
        border-radius: 50%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
    `,
    rect: css`
        padding: 12px 18px;
        border-radius: 6px;
    `
}
const typeVariants = {
    primary: css`
        background-color: ${({theme}) => theme.primaryColor};
        color:white;
    `
}

const StyledButton = styled.button`
    border: none;
    outline: none;
    cursor: pointer;
    box-shadow: 0px 6px 12px rgba(0,0,0,0.1);
    ${({shape}) => shapeVariants[shape]};
    ${({type}) => typeVariants[type]};
    ${({bgColor}) => `background-color: ${bgColor}`}

    transform: scale(1);
    transition: 0.4s ease;
    &:hover {
        transform: scale(1.1);
        box-shadow: 0px 6px 16px rgba(0,0,0,0.12);
    }
`;

export default StyledButton;