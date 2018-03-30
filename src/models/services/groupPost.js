import { insertGroupPost, getGroupPosts as getGroupPostsDb } from 'models/repositories/groupPost'
import { insertUserGroupPost } from 'models/services/user'

export async function getGroupPosts (groupId) {
  try {
    return await getGroupPostsDb(groupId)
  } catch (error) {
    throw(error)
  }
}

export async function postUserGroupPost (userId, groupId, payload) {
  try {
    const post = await insertGroupPost(groupId, payload);
    await insertUserGroupPost(userId, {groupId, postId: post._id});
    return post;
  } catch (error) {
    throw(error);
  }
}
