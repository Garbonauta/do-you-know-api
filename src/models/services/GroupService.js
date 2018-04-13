import GroupRepository from 'models/repositories/GroupRepository'

class GroupService {
  constructor({ groupRepository }) {
    this.groupRepository = groupRepository
  }
  getGroups = async ({ id }) => {
    let search = { visibility: true }
    if (id) {
      search = Object.assign(search, { _id: { $in: id.split(',') } })
    }
    return await this.groupRepository.getGroupsWithCriteria(search)
  }
}

const groupRepository = new GroupRepository()
export const GroupServiceFactory = () => new GroupService({ groupRepository })
