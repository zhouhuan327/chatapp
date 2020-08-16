import styled, { css } from 'styled-components';
import ParaGraph from 'components/ParaGraph';
import Icon from 'components/Icon';
import Text from 'components/Text';

export const Time = styled(ParaGraph).attrs({ type: 'secondary', size: 'small' })`
  margin: 6px;
  margin-left: 24px;
  word-spacing: 1rem;
`;
export const Tip = styled(Icon)`
  position: absolute;
  bottom: -12px;
  left: 0;
  z-index: 1;
`;
export const Bubble = styled.div`
  padding: 15px 20px;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.1);
  border-radius: 100px;
  position: relative;
  z-index: 10;
`;
export const MessageText = styled(Text)``;
const typeVarients = {
  mine: css`
    ${Bubble} {
      background-color: ${({ theme }) => theme.primaryColor};
    }
    ${Bubble} {
      transform: roateteY(180deg);
      left: unset;
      right: 0;
      path {
        fill: ${({ theme }) => theme.primaryColor};
      }
    }
    ${Time} {
      text-align: right;
      margin-left: 0;
      margin-right: 24px;
    }
    ${MessageText} {
      color: white;
    }
  `,
};

const StyledChatBubble = styled.div`
  display: flex;
  flex-direction: column;
  ${({ type }) => typeVarients[type]}
`;

export default StyledChatBubble;
