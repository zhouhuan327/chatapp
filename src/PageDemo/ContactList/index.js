import React from "react";
import PropTypes from "prop-types";
import StyledContactList, { Contacts } from "./style.js";
import FilterList from "../FilterList/index.js";
import ContactCard from "components/ContactCard/index.js";
function ContactList({ children, ...rest }) {
  return (
    <StyledContactList {...rest}>
      <FilterList
        actionLabel="添加好友"
        option={["按姓名排序", "按添加顺序排序"]}
      >
        <Contacts>
          {new Array(10).fill(0).map((item, index) => (
            <ContactCard key={index} />
          ))}
        </Contacts>
      </FilterList>
    </StyledContactList>
  );
}

ContactList.propTypes = {
  children: PropTypes.any,
};

export default ContactList;
