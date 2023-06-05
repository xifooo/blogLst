const BlogRow = ({ blog }) => {
  return (<li> {blog.title} ::: {blog.author} </li>)
}

export default BlogRow