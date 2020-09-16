import React from "react";
import PropTypes from "prop-types";
import StyledFilterList from "./style.js";
import Input from "components/Input/index.js";
import Filter from "components/Filter/index";
import Select from "components/Select";
import Option from "components/Option";
import Button from "components/Button";
import Icon from "components/Icon";
import { ReactComponent as Plus } from "assets/icons/plus.svg";
const { Filters, Action } = Filter;
function FilterList({ filterLabel, actionLabel, option, children, ...rest }) {
  return (
    <StyledFilterList {...rest}>
      <Input.Search />
      <Filter>
        {option && (
          <Filters label={filterLabel}>
            <Select>
              {option.map((item, index) => (
                <Option key={index}>{item}</Option>
              ))}
            </Select>
          </Filters>
        )}
        {actionLabel && (
          <Action label={actionLabel}>
            <Button>
              <Icon icon={Plus} width={12} height={12} />
            </Button>
          </Action>
        )}
      </Filter>
      {children}
    </StyledFilterList>
  );
}

FilterList.propTypes = {
  children: PropTypes.any,
  filterLabel: PropTypes.string,
  actionLabel: PropTypes.string,
  option: PropTypes.array,
};

export default FilterList;
