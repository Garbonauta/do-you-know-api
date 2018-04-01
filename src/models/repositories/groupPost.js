import { GroupPost, Post } from 'models/models'
import mongoose from 'mongoose'

export async function getGroupPosts(groupId) {
  const posts = await GroupPost.findById(groupId, 'posts._id posts.text posts.owner posts.createdAt')
    .populate('posts.owner', 'info.fullName info.link info.pictures.small');
  return posts.toObject();
}

export async function insertGroupPost(groupId, {postText, owner, createdAt}) {
  let groupPost = await GroupPost.findById(groupId);

  const post = new Post({
    _id: mongoose.Types.ObjectId(),
    text: postText,
    owner,
    createdAt: new Date(createdAt)
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
