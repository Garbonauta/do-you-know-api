import {Group} from 'models/models'

export function getGroupsWithCriteria(search) {
  return Group.find(search).lean()
}
