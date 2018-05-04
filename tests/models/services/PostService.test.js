import PostService, { PostServiceFactory } from 'models/services/PostService'
import PostRepository from 'models/repositories/PostRepository'
import UserService, { UserServiceFactory } from 'models/services/UserService'
jest.mock('models/repositories/PostRepository')
jest.mock('models/services/UserService')

UserServiceFactory.mockImplementation(
  () => new UserService({ userRepository: 'hi' })
)

beforeEach(() => {
  PostRepository.mockClear()
  UserService.mockClear()
})

it('Validate Factory Function Calls Constructor', () => {
  const postService = new PostServiceFactory()
  expect(PostRepository).toHaveBeenCalledTimes(1)
  expect(postService.postRepository).toBeInstanceOf(PostRepository)
  expect(postService.userService).toBeInstanceOf(UserService)
})

it('PostRepository has been called', () => {
  const postService = new PostServiceFactory()
  const postId = 123
  postService.getPost(postId)

  const mockPostRepository = PostRepository.mock.instances[0]
  expect(mockPostRepository.getPost).toHaveBeenCalledWith(postId)
  expect(mockPostRepository.getPost).toHaveBeenCalledTimes(1)
})
