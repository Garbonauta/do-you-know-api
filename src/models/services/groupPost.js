import { insertGroupPost } from 'models/repositories/groupPost'

export async function postGroupPost (groupId, post) {
  return await insertGroupPost(groupId, post)
}
