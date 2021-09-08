import { Test, TestingModule } from "@nestjs/testing";
import { GroupService } from "../../src/modules/group/group.service";
import { Group } from "../../src/modules/group/entity/group.entity";
import { EntityRepository, Repository } from "typeorm";
@EntityRepository(Group)
export class mockRepository extends Repository<Group> {}
describe("groupService", () => {
  let service: GroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [GroupService],
    }).compile();

    service = module.get<GroupService>(GroupService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
  it("can add", async () => {
    const res = await service.addGroup({
      groupName: "群测试23333333",
      groupManagerId: 1,
      intro: "很懒",
    });
    expect(res.groupName).toBe("群测试23333333");
  });
});
