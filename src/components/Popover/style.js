import styled from 'styled-components';
export const Content = styled.div`
  position: absolute;
  border-radius: 21px;
  box-shadow: 0px 8px 40px rgba(0, 0, 0, 0.12);
  background-color: ${({ theme }) => theme.bakcground};
  padding: 12px 30px;
  bottom: calc(100% + 12px);
  ${({ offset }) => offset && `transform: translate(${offset.x || 0},${offset.y | 0})`};
  ${({ visible }) => !visible && `display:none`}
`;
export const Triangle = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 6px 6px 0 6px;
  border-color: ${({ theme }) => theme.bakcground} transparent transparent transparent;
  left: calc(50% - 6px);
  bottom: calc(100% + 12px - 5px);
  ${({ offset }) => offset && `transform: translateY(${offset.y | 0})`};
  ${({ visible }) => !visible && `display:none`}
`;
export const Target = styled.div``;
const StyledPopover = styled.div`
  display: flex;
  position: relative;
`;

export default StyledPopover;
