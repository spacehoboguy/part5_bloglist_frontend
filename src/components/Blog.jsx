import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLikePost, handleDeleteBlog, user }) => {
  const [infoVisible, setInfoVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  if (infoVisible === true) {
    return (
      <div style={blogStyle} className='blogContent'>
        <p>{blog.title}</p>
        <p><i>{blog.author}</i></p>
        <p>Likes:{blog.likes}
          <button onClick={handleLikePost}>like</button>
        </p>
        <p>{blog.url}</p>
        <p>
          {blog.user ? blog.user.name : <i>No user</i>}
        </p>

        {user.username === blog.user.username && <button onClick={() => handleDeleteBlog()}>Delete</button>}
        <button onClick={() => setInfoVisible(false)}>hide</button>
      </div>
    )
  } else if (infoVisible === false) {
    return (
      <div style={blogStyle} className='blogContent'>
        <p>{blog.title}</p>
        <p><i>{blog.author}</i></p>
        <button onClick={() => setInfoVisible(true)}>view</button>
      </div>
    )
  }
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  handleDeleteBlog: PropTypes.func.isRequired,
  handleLikePost: PropTypes.func.isRequired
}

export default Blog