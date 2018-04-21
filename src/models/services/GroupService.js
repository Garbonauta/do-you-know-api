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

export const GroupServiceFactory = () => {
  const groupRepository = new GroupRepository()
  return new GroupService({ groupRepository })
}
