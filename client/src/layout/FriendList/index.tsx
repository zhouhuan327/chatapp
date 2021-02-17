import React, { memo, useEffect } from "react";
import StyledFriendList, { Friends } from "./style";
import FilterList from "../../components/FilterList";
import FriendCard from "components/FriendCard";
import { animated } from "react-spring";
import face1 from "assets/images/avatar.jpeg";
import useAnimeList from "hooks/useAnimesList";
import { atom, selector, useRecoilValue } from "recoil";
import { getFriends } from "../../api";
const friendsSearch = atom({
  key: "friendsSearch",
  default: "",
});
const friends = selector({
  key: "friends",
  get: async ({ get }) => {
    const param = get(friendsSearch);
    const res = await getFriends(param);
    if (res?.code === 200) {
      return res.data;
    }
    return [];
  },
});
const FriendList = () => {
  const anime = useAnimeList(10);
  const friendList = useRecoilValue(friends);
  console.log(friendList);
  return (
    <StyledFriendList>
      <FilterList
        actionLabel="添加好友"
        option={["按姓名排序", "按添加顺序排序"]}
      >
        <Friends>
          {friendList.map((item, index) => (
            <animated.div key={index} style={anime[index]}>
              <FriendCard
                avatarSrc={face1}
                name={item.username}
                intro={item.intro}
                status="online"
              />
            </animated.div>
          ))}
        </Friends>
      </FilterList>
    </StyledFriendList>
  );
};

export default memo(FriendList);
