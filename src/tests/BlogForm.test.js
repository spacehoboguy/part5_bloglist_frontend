import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import BlogForm from '../components/BlogForm'
import userEvent from '@testing-library/user-event'

describe('<BlogForm/>', () => {
test('should pass correct details, when event handlers are called', async () => { 
    const createBlog = jest.fn()
    const user = userEvent.setup()

    render(<BlogForm createBlog={createBlog} />)

    const titleInput = screen.getByPlaceholderText('add title...')
    await user.type(titleInput, 'testTitle')
    const authorInput = screen.getByPlaceholderText('add author...')
    await user.type(authorInput, 'testAuthor')
    const urlInput = screen.getByPlaceholderText('add url...')
    await user.type(urlInput, 'testUrl')

    const saveButton = screen.getByText('Create')
    await user.click(saveButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0]).toStrictEqual({'title':'testTitle', 'author':'testAuthor', 'url':'testUrl'})
 })
})