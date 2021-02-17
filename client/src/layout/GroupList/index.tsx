import React, { memo } from "react";
import StyledGroupList, { Groups } from "./style";
import FilterList from "../../components/FilterList";
import FriendCard from "components/FriendCard";
import { animated } from "react-spring";
import useAnimeList from "hooks/useAnimesList";
import face1 from "../../assets/images/avatar.jpeg";
import { atom, selector, useRecoilValue } from "recoil";
import { getGroups } from "../../api";
const groupSearch = atom({
  key: "groupSearch",
  default: "",
});
const groups = selector({
  key: "groups",
  get: async ({ get }) => {
    const param = get(groupSearch);
    const res = await getGroups(param);
    if (res?.code === 200) {
      return res.data;
    }
    return [];
  },
});
const GroupList = () => {
  const anime = useAnimeList(6);
  const groupList = useRecoilValue(groups);
  return (
    <StyledGroupList>
      <FilterList option={["按时间排序", "按名称排序"]} actionLabel="添加文件">
        <Groups>
          {groupList.map((item, index) => (
            <animated.div key={index} style={anime[index]}>
              <FriendCard
                avatarSrc={face1}
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
