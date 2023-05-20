const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '..', '.env') })
// console.log({ path: path.join(__dirname, '..', '.env') })

const PORT = process.env.PORT || 3003
// const MONGODB_URI = process.env.MONGODB_URI
const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI


module.exports = {
  MONGODB_URI, 
  PORT
}