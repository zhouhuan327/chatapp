import React, { memo } from "react";
import StyledGroupList, { Groups } from "./style";
import FilterList from "../../components/FilterList";
import FriendCard from "components/FriendCard";
import { animated } from "react-spring";
import { useAnimeList } from "hooks/useAnime";
import face1 from "../../assets/images/avatar.jpeg";
import { atom, selector, useRecoilValue } from "recoil";
import { getGroups } from "../../api";
const searchState = atom({
  key: "groupSearchState",
  default: "",
});
const groupsState = selector({
  key: "groupsState",
  get: async ({ get }) => {
    const param = get(searchState);
    const res = await getGroups(param);
    if (res?.code === 200) {
      return res.data;
    }
    return [];
  },
});
const GroupList = () => {
  const anime = useAnimeList(6);
  const groupList = useRecoilValue(groupsState);
  return (
    <StyledGroupList>
      <FilterList actionLabel="添加群聊">
        <Groups>
          {groupList.map((item, index) => (
            <animated.div key={index} style={anime[index]}>
              <FriendCard
                avatarSrc={item.avatarSrc}
                name={item.groupName}
                intro={item.intro}
              />
            </animated.div>
          ))}
        </Groups>
      </FilterList>
    </StyledGroupList>
  );
};

export default memo(GroupList);
