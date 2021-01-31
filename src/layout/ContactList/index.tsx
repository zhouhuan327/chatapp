import React, { memo } from "react";
import StyledContactList, { Contacts } from "./style";
import FilterList from "../../components/FilterList";
import ContactCard from "components/ContactCard";
import { animated } from "react-spring";
import face1 from "assets/images/avatar.jpeg";
import useAnimeList from "hooks/useAnimesList";
function ContactList({ ...rest }) {
  const anime = useAnimeList(10);
  return (
    <StyledContactList {...rest}>
      <FilterList
        actionLabel="添加好友"
        option={["按姓名排序", "按添加顺序排序"]}
      >
        <Contacts>
          {new Array(10).fill(0).map((item, index) => (
            <animated.div key={index} style={anime[index]}>
              <ContactCard avatarSrc={face1} name="周杰伦" intro="wu" />
            </animated.div>
          ))}
        </Contacts>
      </FilterList>
    </StyledContactList>
  );
}

export default memo(ContactList);
