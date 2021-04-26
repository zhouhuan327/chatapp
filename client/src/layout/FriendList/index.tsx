import React, { memo, useCallback, useEffect, useState } from "react";
import { Modal, List, Button, message, Tag } from "antd";
import StyledFriendList, { Friends } from "./style";
import FilterList from "../../components/FilterList";
import FriendCard from "components/FriendCard";
import { animated } from "react-spring";
import face1 from "assets/images/avatar.jpeg";
import { useAnimeList } from "hooks/useAnime";
import {
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { addFriend, getFriends, getUserDetail, getUsers } from "../../api";
import { Search } from "components/Input";
import styled from "styled-components";
import produce from "immer";
import { scrollbar } from "../../utils/mixin";
import { detail, profileVisible } from "../../store";
import { getFileUrl } from "../../utils";
interface searchList extends UserInfo {
  isFriend?: boolean;
}
const FriendList = () => {
  const anime = useAnimeList(10);
  // 列表里的用户名
  const [param, setParam] = useState<string>("");
  const [friendList, setFriendList] = useState<UserInfo[]>([]);
  const fetch = useCallback(
    (name?) => {
      getFriends({ name: name || param }).then(res => {
        setFriendList(res.data || []);
      });
    },
    [param],
  );
  useEffect(() => {
    fetch();
  }, [fetch]);
  // 添加好友modal显示隐藏
  const [addModal, setAddModal] = useState<boolean>(false);
  // 添加好友里的列表
  const [searchList, setSearchList] = useState<searchList[]>([]);
  const handleSearch = useCallback(
    async value => {
      const res: RespType<UserInfo[]> = await getUsers({ name: value });
      const users: searchList[] = res.data;
      users.forEach(item => {
        item.isFriend = !!friendList.find(friend => friend.id === item.id);
      });
      setSearchList(users);
    },
    [friendList],
  );
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
        // 更新好友列表
        fetch("");
      } finally {
        setLoadingList(state => {
          const nextState = [...state];
          nextState[index] = false;
          return nextState;
        });
      }
    },
    [fetch],
  );
  const setVisible = useSetRecoilState(profileVisible);
  const setDetail = useSetRecoilState(detail);
  const handleClickCard = async (id: number) => {
    setVisible(true);

    const res = await getUserDetail({ id });
    setDetail(res.data);
  };
  console.log(process.env);
  return (
    <StyledFriendList>
      <FilterList
        actionLabel="添加好友"
        onActionClick={() => setAddModal(true)}
        onSearch={value => setParam(value)}
      >
        <Friends>
          {friendList.map((item, index) => (
            <animated.div key={index} style={anime[index]}>
              <FriendCard
                avatarSrc={item.avatarSrc}
                name={item.username}
                intro={item.intro}
                onClick={() => handleClickCard(item.id)}
              />
            </animated.div>
          ))}
        </Friends>
      </FilterList>
      <Modal
        title={"添加好友"}
        onCancel={() => setAddModal(false)}
        visible={addModal}
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
  max-height: 400px;
  overflow-y: scroll;
  ${scrollbar}
`;
export default memo(FriendList);
