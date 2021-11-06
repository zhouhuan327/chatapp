import React from "react";
import { Search } from "/@/components/Input";
import Button from "/@/components/Button";
import Text from "/@/components/Text";
import Icon from "/@/components/Icon";
import styled from "styled-components";
import { ReactComponent as Plus } from "/@/assets/icons/plus.svg";
interface FilterListProps {
  filterLabel?: string;
  actionLabel?: string;
  onActionClick?: () => void;
  // 点击搜索
  onSearch?: (value: string) => void;
}

const FilterList: React.FC<FilterListProps> = ({
  actionLabel,
  onSearch,
  onActionClick,
  children,
  ...rest
}) => {
  return (
    <StyledFilterList {...rest}>
      <Search onSearch={onSearch} />
      <StyledFilter>
        {actionLabel && (
          <div>
            <Text type="secondary">{actionLabel}</Text>
            <Button size="20px" onClick={onActionClick}>
              <Icon icon={Plus} width={12} height={12} />
            </Button>
          </div>
        )}
      </StyledFilter>
      {children}
    </StyledFilterList>
  );
};
const StyledFilterList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 18px;
  padding-right: 0;
  height: 100vh;
`;
const StyledFilter = styled.div`
  display: flex;
  justify-content: end;
  margin: 10px 0;
  span {
    padding: 0 10px;
  }
  button {
    margin-right: 10px;
  }
`;

export default FilterList;
