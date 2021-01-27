import styled, { css } from "styled-components";

const typeVariants = {
  primary: css`
    color: ${({ theme }) => theme.grayDark};
  `,
  secondary: css`
    color: ${({ theme }) => theme.gray};
    opacity: 0.8;
  `,
  danger: css`
    color: ${({ theme }) => theme.red};
  `,
};
const sizeVariants = {
  normal: css`
    ${({ theme }) => theme.normal};
  `,
  medium: css`
    ${({ theme }) => theme.medium};
  `,
  xlarge: css`
    ${({ theme }) => theme.xlarge};
  `,
  xxlarge: css`
    ${({ theme }) => theme.xxlarge};
  `,
  small: css`
    ${({ theme }) => theme.small};
  `,
  xsmall: css`
    ${({ theme }) => theme.xsmall};
  `,
  xxsmall: css`
    ${({ theme }) => theme.xxsmall};
  `,
};
const StyledText = styled.span<any>`
  font-size: ${({ size }) => sizeVariants[size] || sizeVariants.normal};
  ${({ type }) => typeVariants[type] || typeVariants.primary};
  ${({ bold }) => bold && `font-weight: 500`};
`;

export default StyledText;
