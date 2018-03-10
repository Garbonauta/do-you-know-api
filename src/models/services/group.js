import {getGroupsFromArray} from 'models/repositories/group'

export async function getGroups(ids) {
  return await getGroupsFromArray(ids)
}
