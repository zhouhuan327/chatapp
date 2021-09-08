import styled, { css } from "styled-components";
import { ButtonProps } from ".";
const shapeVariants = {
  circle: css<ButtonProps>`
    width: ${({ size }) => size};
    height: ${({ size }) => size};
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    &:hover {
      transform: scale(1.1);
      box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.12);
    }
  `,
  rect: css`
    padding: 10px 16px;
    border-radius: 6px;
    &:hover {
      background-color: ${({ theme }) => theme.primaryColorHover};
      box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.12);
    }
  `,
};
const typeVariants = {
  primary: css`
    background-color: ${({ theme }) => theme.primaryColor};
    color: white;
  `,
};

const StyledButton = styled.button<any>`
  border: none;
  outline: none;
  cursor: pointer;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.1);
  ${({ shape }) => shapeVariants[shape]};
  ${({ type }) => typeVariants[type]};
  ${({ bgColor }) => `background-color: ${bgColor}`}

  transform: scale(1);
  transition: 0.4s ease;
`;

export default StyledButton;
