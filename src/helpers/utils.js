export function getAuthInfoFromJWT({
  auth: {
    artifacts,
    credentials: {
      payload: { sub },
    },
  },
}) {
  return sub
}

export async function setCollectionOwner(posts) {
  return await Promise.all(
    posts.map(async post => {
      post.owner = await getSimpleOwner.call(this, post)
      return post
    })
  )
}

export async function getSimpleOwner(post) {
  const owner = await this.userService.getSimpleUserInfo(post.owner)
  return owner[0]
}
