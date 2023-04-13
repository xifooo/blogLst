function merge(L, R, A, i, j, a, b) {
  if (a < b) {
    // if (i>0 && L[i-1]>R[j-1]) {
    if ( (j<=0) || (i>0 && L[i-1]>R[j-1]) ) {
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

let A = [253, 263, 4, 38, 121, 165, 219, 372, 317, 268, 78]
console.log("排序前", A)
merge_sorting(A)
console.log("排序后",A)

// function sum (a, b) {
//   return a + b ** 100
// }
// let sums = A.reduce(sum, 0)
// console.log(Math.floor(sums**(1/100)))