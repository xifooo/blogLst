const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.length()
}

const theMostBlog = (blogs) => {
  let A = blogs.map(item => item.likes)
  return Math.floor(A.reduce(function (a, b) { return a + b ** 100 }, 0))
}

const theMostBlogMergingSort = (blogs) => {
  function merge(L, R, A, i, j, a, b) {
    if (a < b) {
      if ( (j<=0) || (i>0 && L[i-1]>R[j-1])) {
        A[b-1] = L[i-1]
        i -= 1
      } else {
        A[b-1] = R[j-1]
        j = j-1
      }
      merge(L, R, A, i, j, a, b-1)
    }
  }
  function merge_sorting(A, a=0, b=undefined) {
    if (b === undefined) { b = A.length }
    if (1 < b - a) {
      // c = ~~((a+b+1)/2)
      let c = Math.floor((a+b+1)/2)
      merge_sorting(A, a, c)
      merge_sorting(A, c, b)
      let L = A.slice(a, c)
      let R = A.slice(c, b)
      merge(L, R, A, i=L.length, j=R.length, a, b)
    }
  }

  let A = blogs.map(item => item.likes)
  merge_sorting(A)
  return A[A.length-1]
}


module.exports = {
  dummy,
  totalLikes,
  theMostBlog
}