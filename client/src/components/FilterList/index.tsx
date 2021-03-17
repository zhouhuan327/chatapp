import React from "react";
import Input from "components/Input";
import Select from "components/Select";
import Option from "components/Option";
import Button from "components/Button";
import Text from "components/Text";
import Icon from "components/Icon";
import styled from "styled-components";
import { ReactComponent as Plus } from "assets/icons/plus.svg";
interface FilterListProps {
  filterLabel?: string;
  actionLabel?: string;
  option?: Array<any>;
}
const FilterList: React.FC<FilterListProps> = ({
  filterLabel = "列表排序",
  actionLabel,
  option,
  children,
  ...rest
}) => {
  return (
    <StyledFilterList {...rest}>
      <Input.Search />
      <StyledFilter>
        {option && (
          <div>
            <Text type="secondary">{filterLabel}:</Text>
            <Select>
              {option.map((item, index) => (
                <Option key={index}>{item}</Option>
              ))}
            </Select>
          </div>
        )}
        {actionLabel && (
          <div>
            <Text type="secondary">{actionLabel}</Text>
            <Button size="20px">
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
  justify-content: space-between;
  margin: 10px 0;
  span {
    padding: 0 10px;
  }
  button {
    margin-right: 10px;
  }
`;

export default FilterList;
