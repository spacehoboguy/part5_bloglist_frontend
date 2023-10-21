import React from 'react'
import '@testing-library/jest-dom'
import { screen, render } from '@testing-library/react'
import Blog from '../components/Blog'
import userEvent from '@testing-library/user-event'

describe('<Blog/>', () => {
    test('only title and author show initially', () => {
        const blog = {
            title: 'title is showing',
            author: 'blog author is showing',
            url: 'blog url is not shown',
            likes: 3
        }

        const { container } = render(<Blog blog={blog} />)

        const element = container.querySelector('.blogContent')
        expect(element).not.toHaveTextContent(
            'blog url is not shown'
        )
        expect(element).not.toHaveTextContent(
            '3'
        )
    })

    test('url and likes are shown when "show" is clicked', async () => {
        const blog = {
            title: 'title is showing',
            author: 'blog author is showing',
            url: 'blog url is shown',
            likes: 3,
            user: {
                username: 'admin'
            }
        }
        const blogUser = {
            username: "admin",
            name: "admin user",
            id: "651e97b04a9dfdcb745aa87a"
        }
        const { container } = render(<Blog blog={blog} user={blogUser} />)
        const user = userEvent.setup()
        const showButton = screen.getByText('view')

        await user.click(showButton)

        const element = container.querySelector('.blogContent')

        expect(element).toHaveTextContent(
            'blog url is shown'
        )
        expect(element).toHaveTextContent(
            'Likes:'
        )
    })

    test('', () => {

    })
})