import { css } from 'styled-components';
export const circle = (color, size = '8px') => css`
  width: ${size};
  height: ${size};
  border-radius: 50%;
  background-color: ${color};
`;

export const activeBar = ({ barWidth = '6px', shadowWidth = '18px' } = {}) => css`
  position: relative;
  &::after,
  &::before {
    display: block;
    content: '';
    position: absolute;
    height: 100%;
    left: 0;
    transition: 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }
  &::before {
    width: ${barWidth};
    background: linear-gradient(
      180deg,
      rgba(142, 197, 242, 1) 0%,
      rgba(79, 157, 222, 1) 100%
    );
  }
  &::after {
    width: ${shadowWidth};
    background: linear-gradient(
      270deg,
      rgba(41, 47, 76, 1) 0%,
      rgba(142, 197, 242, 1) 100%
    );
    opacity: 0.6;
  }
`;
export const card = (raidus = '6px', padding = '20px') => css`
  padding: ${padding};
  background: ${({ theme }) => theme.background};
  box-shadow: 0px 18px 40px 0px rgba(0, 0, 0, 0.04);
  border-radius: ${raidus};
  cursor: pointer;
`;

export const scrollbar = () => css`
  ::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 8px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }
  ::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #d4d6d7;
    :hover {
      background: #00050875;
    }
  }
  ::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background: #ededed;
  }
`;
