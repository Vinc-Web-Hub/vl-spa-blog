import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
  title: String,
  date: String,
  content: String,
  domain: String
})

const Post = mongoose.model('Post', postSchema)
export default Post
