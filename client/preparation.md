# 状态管理
## 各组件使用的状态
1. App
   1. blogs
   2. user
   3. errorMessage
2. BlogForm
   1. newBlog
3. BlogRow
   1. visibility
4. LoginForm
   1. username
   2. password
5. Togglable
   1. visible
## 管理方案
redux-toolkit, react-redux, react 内置的 useState
1. 全局使用的 state 在 redux store 中统一管理，如 blogs, user，errorMessage
2. Togglable 组件改成一个 custom hook
3. 局部使用的、不影响全局 state 的 state 可独立使用， 如 username, password, newBlog


# exercise 7.9 - 7.21 要求的功能
1. 更换状态管理方案为 Redux store
2. 在 Redux store 中存储用户登录的信息
3. blog 的增、删、改
4. user 的详情、user添加的全部博客的详情（点击可访问）
5. 设计 View 布局
6. 添加 Navibar
7. 实现对博客文章发表评论的功能。评论应该是匿名的

# 7.25
- UserDetail raised an error: Uncaught TypeError: Cannot read properties of undefined (reading 'username')
- LoginForm couldn't redirect to /blogs after clicking login button