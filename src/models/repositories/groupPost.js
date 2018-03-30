import { GroupPost, Post } from 'models/models'
import mongoose from 'mongoose'

export async function insertGroupPost(groupId, {postText, owner}) {
  let groupPost = await GroupPost.findById(groupId);

  const post = new Post({
    _id: mongoose.Types.ObjectId(),
    text: postText,
    owner,
  });

  if(!groupPost) {
    groupPost = new GroupPost({
      _id: groupId,
      posts: [post]
    });
  } else {
    groupPost.posts.push(post)
  }

  await groupPost.save();

  return post.toObject();
}
