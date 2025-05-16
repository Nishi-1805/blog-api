const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const authenticateToken = require('../middlewares/authMiddleware');
const {
  validateCreateComment,
  validateUpdateComment,
  validateGetCommentsByPost,
  validateIdParam
} = require('../middlewares/validation/commentValidation');
const handleValidationErrors  = require('../middlewares/validation/handleValidation');

// Create a new comment
router.post('/', authenticateToken, validateCreateComment, handleValidationErrors, commentController.createComment);

// Get all comments for a post
router.get('/', validateGetCommentsByPost, handleValidationErrors, commentController.getCommentsByPost);

// Get a single comment
router.get('/:id', validateIdParam, handleValidationErrors, commentController.getCommentById);

// Update a comment
router.put('/:id', authenticateToken, validateUpdateComment, handleValidationErrors, commentController.updateComment);

// Delete a comment
router.delete('/:id', authenticateToken, validateIdParam, handleValidationErrors, commentController.deleteComment);

module.exports = router;
