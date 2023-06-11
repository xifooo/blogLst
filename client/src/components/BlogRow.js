const BlogRow = prop => {
  const likesNumStyle = {
    color: "red"
  }
  return (
    <li>
      <h3>
        {prop.blog.title}   
        <button onClick={prop.delBlog}> #DELETE# </button> | 
        <span style={likesNumStyle}> {prop.blog.likes} </span>
        <button onClick={prop.addOneLike}> @LIKE@ </button>
        
      </h3>
      <p> {prop.blog.author} {prop.blog.url} </p>
      <hr />
    </li>
  )
}

export default BlogRow