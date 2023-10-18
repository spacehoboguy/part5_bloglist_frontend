import { useState } from "react"
//5.8 find out why user is displayed after the page is refreshed but not initally
const Blog = ({ blog, handleLikePost }) => {
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
      <div style={blogStyle}>
        <p>{blog.title}</p>
        <p><i>{blog.author}</i></p>
        <p>Likes: {blog.likes}
          <button onClick={handleLikePost}>Like</button>
        </p>
        <p>{blog.url}</p>
        <p>
        {blog.user?blog.user.name: <i>No user</i>}
        </p>
        <button onClick={() => setInfoVisible(false)}>hide</button>
      </div>
    )
  } else if (infoVisible === false) {
    return (
      <div style={blogStyle}>
        <p>{blog.title}</p>
        <p><i>{blog.author}</i></p>
        <button onClick={() => setInfoVisible(true)}>view</button>
      </div>
    )
  }

}

export default Blog