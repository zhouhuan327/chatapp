
import styled, { css } from 'styled-components';
import { circle } from 'utils/mixin';

const variants = {
    dot: css`
        position:relative;
        padding:5px;
        &::after{
            display:${({ show }) => (show ? "block" : "none")};
            content:'';
            position:absolute;
            top:0;
            right:0;
            ${({ theme }) => circle(theme.red, "6px")}
        }

    `,
    default: css`
        ${({ theme }) => circle(theme.red, "26px")};
        display:flex;
        align-items:center;
        justify-content:center;
        box-shadow:0px 18px 40px 0px rgba(0,0,0,0.04),
            0px 6px 12px 0px rgba(0,0,0,0.08);
        ${({ showZero, count }) => (!showZero && count === 0 && `visibility:hidden`)}
    `
}
export const Count = styled.div`
    font-size:${({ theme }) => theme.normal};
    color:white;
`
const StyledBadge = styled.div`
    display:inline-block;
    ${({ variant }) => variants[variant]}
`;

export default StyledBadge;