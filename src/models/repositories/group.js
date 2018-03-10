import {Group} from 'models/models'

export function getGroupsFromArray(ids) {
  return Group.find({'_id': { $in: ids}}).lean()
}
