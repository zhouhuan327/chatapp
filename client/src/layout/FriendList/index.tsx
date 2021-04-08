import React, { memo, useCallback, useState } from "react";
import { Modal, List, Button, message, Tag } from "antd";
import StyledFriendList, { Friends } from "./style";
import FilterList from "../../components/FilterList";
import FriendCard from "components/FriendCard";
import { animated } from "react-spring";
import face1 from "assets/images/avatar.jpeg";
import { useAnimeList } from "hooks/useAnime";
import { atom, selector, useRecoilValue } from "recoil";
import { addFriend, getFriends, getUsers } from "../../api";
import { Search } from "components/Input";
import styled from "styled-components";
import produce from "immer";
const searchState = atom({
  key: "friendsSearchState",
  default: "",
});
const friendsState = selector({
  key: "friendsState",
  get: async ({ get }) => {
    const param = get(searchState);
    const res = await getFriends({ name: param });
    if (res?.code === 200) {
      return res.data;
    }
    return [];
  },
});
interface searchList extends UserInfo {
  isFriend?: boolean;
}
const FriendList = () => {
  const anime = useAnimeList(10);
  const friendList = useRecoilValue(friendsState);
  const [visible, setVisible] = useState<boolean>(false);
  const handleCancel = useCallback(() => {
    setVisible(false);
  }, []);

  const [searchList, setSearchList] = useState<searchList[]>([]);
  const handleSearch = useCallback(async value => {
    const res: RespType<UserInfo[]> = await getUsers({ name: value });
    const users: searchList[] = res.data;
    users.forEach(item => {
      item.isFriend = !!friendList.find(friend => friend.id === item.id);
    });
    setSearchList(users);
  }, []);

  // loading状态列表
  const [loadingList, setLoadingList] = useState<boolean[]>([]);
  const handleAddFriend = useCallback(
    async (friendId: number, index: number) => {
      setLoadingList(state => {
        const nextState = [...state];
        nextState[index] = true;
        return nextState;
      });
      try {
        await addFriend({ friendId });
        message.success("添加成功");
        // 更新搜索结果列表
        setSearchList(state =>
          produce(state, draft => {
            const target = draft.find(i => i.id === friendId);
            if (target) target.isFriend = true;
          }),
        );
      } finally {
        setLoadingList(state => {
          const nextState = [...state];
          nextState[index] = false;
          return nextState;
        });
      }
    },
    [],
  );
  return (
    <StyledFriendList>
      <FilterList
        actionLabel="添加好友"
        option={["按姓名排序", "按添加顺序排序"]}
        onActionClick={() => setVisible(true)}
      >
        <Friends>
          {friendList.map((item, index) => (
            <animated.div key={index} style={anime[index]}>
              <FriendCard
                avatarSrc={face1}
                name={item.username}
                intro={item.intro}
              />
            </animated.div>
          ))}
        </Friends>
      </FilterList>
      <Modal
        title={"添加好友"}
        onCancel={handleCancel}
        visible={visible}
        footer={null}
      >
        <Search placeholder={"请输入用户名"} onSearch={handleSearch} />
        <ScList
          itemLayout="horizontal"
          dataSource={searchList}
          renderItem={(item: any, index) => (
            <List.Item
              actions={[
                <Button
                  onClick={() => handleAddFriend(item.id, index)}
                  loading={loadingList[index] || false}
                  type="link"
                >
                  添加
                </Button>,
              ]}
            >
              <List.Item.Meta
                avatar={item.avatarSrc || ""}
                title={
                  <span>
                    {item?.username}
                    {item.isFriend && (
                      <Tag style={{ marginLeft: 10 }} color="cyan">
                        好友
                      </Tag>
                    )}
                  </span>
                }
                description={item.intro}
              />
            </List.Item>
          )}
        />
      </Modal>
    </StyledFriendList>
  );
};
const ScList = styled(List)`
  .ant-list-items {
    padding-left: 20px;
  }
`;
export default memo(FriendList);
