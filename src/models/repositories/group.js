import {Group} from 'models/models'

export function getGroupsWithCriteria(search) {
  return Group.find(search, '_id name pictureUrl owner moderators').lean()
}
