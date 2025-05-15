const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const authenticateToken = require('../middlewares/authMiddleware');

// Create a new comment
router.post('/', authenticateToken, commentController.createComment);

// Get all comments for a post
router.get('/', commentController.getCommentsByPost);

// Get a single comment
router.get('/:id', commentController.getCommentById);

// Update a comment
router.put('/:id', authenticateToken, commentController.updateComment);

// Delete a comment
router.delete('/:id', authenticateToken, commentController.deleteComment);

module.exports = router;
