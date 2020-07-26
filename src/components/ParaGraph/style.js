import styled, { css } from "styled-components";
import SytledText from "components/Text/style";

const StyledParaGraph = styled(SytledText)`
    ${({ ellipsis }) =>
        ellipsis &&
        css`
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
        `}
`;

export default StyledParaGraph;
