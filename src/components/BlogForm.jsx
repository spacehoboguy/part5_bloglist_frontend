import { useState } from "react"

const BlogForm = ({ createBlog }) => {
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')

    const addNewBlog = (e) => {
        e.preventDefault()

        createBlog({
            title: newTitle,
            author: newAuthor,
            url: newUrl,
        })
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
    }
    return (
        <>
            <h2>new blog</h2>
            <form onSubmit={addNewBlog}>
                <div>
                    title: <input
                        type="text"
                        name='Title'
                        value={newTitle}
                        onChange={({ target }) => setNewTitle(target.value)}
                    />
                </div>
                <div>
                    author: <input
                        type="text"
                        name='Author'
                        value={newAuthor}
                        onChange={({ target }) => setNewAuthor(target.value)}
                    />
                </div>
                <div>
                    url: <input
                        type="text"
                        name='url'
                        value={newUrl}
                        onChange={({ target }) => setNewUrl(target.value)}
                    />
                </div>
                <button type='submit'>Create</button>
            </form>
        </>
    )
}

export default BlogForm