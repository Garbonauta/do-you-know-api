import {getGroupsWithCriteria} from 'models/repositories/group'

export async function getGroups({id}) {
  let search = {};
  if(id) {
    search = {'_id': { $in: id.split(',')}};
  }
  return await getGroupsWithCriteria(search)
}
