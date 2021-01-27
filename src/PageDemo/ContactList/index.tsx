import React from "react";
import StyledContactList, { Contacts } from "./style";
import FilterList from "../FilterList";
import ContactCard from "components/ContactCard";
import { animated } from "react-spring";
import useAnimesList from "hooks/useAnimesList";
function ContactList({ ...rest }) {
  const animes = useAnimesList(10);
  return (
    <StyledContactList {...rest}>
      <FilterList
        actionLabel="添加好友"
        option={["按姓名排序", "按添加顺序排序"]}
      >
        <Contacts>
          {new Array(10).fill(0).map((item, index) => (
            <animated.div key={index} style={animes[index]}>
              <ContactCard />
            </animated.div>
          ))}
        </Contacts>
      </FilterList>
    </StyledContactList>
  );
}

export default ContactList;
