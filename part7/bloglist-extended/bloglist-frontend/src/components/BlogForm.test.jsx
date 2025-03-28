import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('BlogForm updates parent state and calls with right details on submit', async () => {
    const createBlog = vi.fn()
    const user = userEvent.setup()

    render(<BlogForm createBlog={createBlog} />)

    const inputs = screen.getAllByRole('textbox')
    const titleInput = inputs[0]
    const authorInput = inputs[1]
    const urlInput = inputs[2]

    const sendButton = screen.getByText('Save')

    await user.type(titleInput, 'test title')
    await user.type(authorInput, 'test author')
    await user.type(urlInput, 'www.test.com')
    await user.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('test title')
    expect(createBlog.mock.calls[0][0].author).toBe('test author')
    expect(createBlog.mock.calls[0][0].url).toBe('www.test.com')

})