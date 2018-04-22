import { Comment } from 'models/models'
import mongoose from 'mongoose'

class CommentRepository {
  insertComment({
    postId,
    postOwner,
    groupId,
    text,
    owner,
    createdAt,
    score,
    votes,
  }) {
    const comment = new Comment({
      postId,
      postOwner,
      groupId,
      text,
      owner,
      createdAt: new Date(createdAt),
      score,
      votes,
    })
    return comment.save()
  }
}

export default CommentRepository
