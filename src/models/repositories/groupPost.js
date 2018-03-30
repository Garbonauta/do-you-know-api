import { GroupPost, Post } from 'models/models'
import mongoose from 'mongoose'

export async function insertGroupPost(groupId, {postText}) {
  let groupPost = await GroupPost.findById(groupId);

  const post = new Post({
    _id: mongoose.Types.ObjectId(),
    text: postText
  });

  if(!groupPost) {
    groupPost = new GroupPost({
      _id: mongoose.Types.ObjectId(),
      posts: [post]
    });
  } else {
    groupPost.posts.push(post)
  }

  await groupPost.save();

  return post.toObject();
}
