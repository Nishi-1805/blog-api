const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authenticateToken = require('../middlewares/authMiddleware');

// Create a post
router.post('/posts',authenticateToken, postController.createPost);

// Get all posts
router.get('/posts', postController.getAllPosts);

// Get a single post
router.get('/posts/:id', postController.getPostById);

// Update a post
router.put('/posts/:id',authenticateToken, postController.updatePost);

// Delete a post
router.delete('/posts/:id',authenticateToken, postController.deletePost);

module.exports = router;
