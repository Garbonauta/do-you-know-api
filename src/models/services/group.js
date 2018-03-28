import {getGroupsWithCriteria} from 'models/repositories/group'

export async function getGroups({id}) {
  let search = {visibility: true};
  if(id) {
    search = Object.assign(search, {'_id': { $in: id.split(',')}});
  }
  return await getGroupsWithCriteria(search)
}
