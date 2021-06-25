import React, { memo, useCallback, useState } from "react";
import StyledGroupList, { Groups } from "./style";
import FilterList from "../../components/FilterList";
import FriendCard from "/@/components/FriendCard";
import { animated } from "react-spring";
import { useAnimeList } from "/@/hooks/useAnime";
import { atom, selector, useRecoilValue, useSetRecoilState } from "recoil";
import { getGroupDetail, getGroups, getUserDetail, joinGroup, searchGroups } from "../../api";
import { Search } from "../../components/Input";
import { Button, List, Modal, Tag, message } from "antd";
import { detail, profileVisible } from "../../store";
import styled from "styled-components";
import { scrollbar } from "../../utils/mixin";
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
  // 添加群modal显示隐藏
  const [addModal, setAddModal] = useState<boolean>(false);
  // 添加好友里的列表
  const [searchList, setSearchList] = useState<GroupInfo[]>([]);
  const handleSearch = useCallback(async value => {
    const res: RespType<GroupInfo[]> = await searchGroups({ name: value });
    const groups: any = res.data;
    groups.forEach(item => {
      item.isMember = !!groupList.find(friend => friend.id === item.id);
    });
    setSearchList(res.data);
  }, []);
  const handleJoinGroup = async groupId => {
    await joinGroup({ groupId });
    message.success("加入成功");
  };
  const setVisible = useSetRecoilState(profileVisible);
  const setDetail = useSetRecoilState(detail);
  const handleClickCard = async (id: number) => {
    setVisible(true);

    const res = await getGroupDetail({ id });
    setDetail(res.data);
  };
  return (
    <StyledGroupList>
      <FilterList actionLabel="加入群聊" onActionClick={() => setAddModal(true)}>
        <Groups>
          {groupList.map((item, index) => (
            <animated.div key={index} style={anime[index]}>
              <FriendCard
                avatarSrc={item.avatarSrc}
                name={item.groupName}
                intro={item.intro}
                onClick={() => handleClickCard(item.id)}
              />
            </animated.div>
          ))}
        </Groups>
      </FilterList>
      <Modal
        title={"加入群聊"}
        onCancel={() => setAddModal(false)}
        visible={addModal}
        footer={null}
      >
        <Search placeholder={"请输入群名称"} onSearch={handleSearch} />
        <ScList
          itemLayout="horizontal"
          dataSource={searchList}
          renderItem={(item: any, index) => (
            <List.Item
              actions={[
                <Button onClick={() => handleJoinGroup(item.id)} type="link">
                  加入
                </Button>,
              ]}
            >
              <List.Item.Meta
                title={
                  <span>
                    {item?.groupName}{" "}
                    {item.isMember && (
                      <Tag style={{ marginLeft: 10 }} color="cyan">
                        已加入
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
    </StyledGroupList>
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
export default memo(GroupList);
