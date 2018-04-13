import { Group } from 'models/models'

class GroupRepository {
  getGroupsWithCriteria = search => {
    return Group.find(search, '_id name pictureUrl owner moderators')
      .populate('owner moderators', '_id info.fullName info.link')
      .lean()
  }
}

export default GroupRepository
