import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  author: 'MDM TEST',
  title: 'EM DI EM',
  url: 'www.emdeeme',
  likes: 10,
  user: {
    id: '679d18cd8327479f69626dc6',
    name: 'maxi della maggiore',
    username: 'mdm69'
  }
}

test('Only renders title and author by default', () => {

  const { container } = render(<Blog blog={blog} updateLikes={() => vi.fn()} deleteBlog={() => vi.fn()} />)


  const div = container.querySelector('.blog-details')
  expect(div).toHaveStyle('display: none')
  const defaultDiv = container.querySelector('.blog-summary')
  expect(defaultDiv).toHaveStyle('display: block')
})

test('Clicking the button to show details, shows url and likes', async () => {

  const { container } = render(<Blog blog={blog} updateLikes={() => vi.fn()} deleteBlog={() => vi.fn()} />)

  const user = userEvent.setup()
  const button = screen.getByText('View')
  await user.click(button)

  const div = container.querySelector('.blog-details')
  expect(div).toHaveStyle('display: block')
  const defaultDiv = container.querySelector('.blog-summary')
  expect(defaultDiv).toHaveStyle('display: none')

  expect(screen.queryByTestId('blog-url')).toBeVisible()
  expect(screen.queryByTestId('blog-likes')).toBeVisible()

})

test('Clicking the like button twice calls event handler twice', async () => {
  const mockHandler = vi.fn()

  render(
    <Blog blog={blog} updateLikes={mockHandler} />
  )

  const user = userEvent.setup()
  const button = screen.getByText('Like')
  await user.click(button)
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
