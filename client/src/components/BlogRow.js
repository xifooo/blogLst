const BlogRow = prop => {
  return (
    <li> 
      {prop.blog.title} ::: {prop.blog.author} 
      <button onClick={prop.addOneLike}> @LIKE@ </button>
      <button onClick={prop.delBlog}> #DELETE# </button>
    </li>
  )
}

export default BlogRow