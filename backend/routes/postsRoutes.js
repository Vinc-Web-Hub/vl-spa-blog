import express from 'express';
import Post from '../models/Post.js';
import mongoose from 'mongoose'

const router = express.Router();

// GET /api/posts - Retrieve all posts
router.get('/', async (req, res) => {
  try {
    const { domain } = req.query;
    let filter = {};
    if (domain) {
      filter.domain = domain;
    }
    const posts = await Post.find(filter);
    res.json(posts);
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// GET a single post by ID
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)  // uses _id by default
    if (!post) return res.status(404).json({ error: 'Post not found' })
    res.json(post)
  } catch (err) {
    console.error('Error fetching post:', err)
    res.status(500).json({ error: 'Failed to fetch post' })
  }
})

// POST /api/posts - Create a new post
router.post('/', async (req, res) => {
  try {
    const { id, title, date, content, domain } = req.body;
    const newPost = new Post({ id, title, date, content, domain });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    console.error('Error creating post:', err);
    res.status(500).json({ error: 'Failed to create post' });
  }
});

export default router;
