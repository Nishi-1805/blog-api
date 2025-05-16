const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authenticateToken = require('../middlewares/authMiddleware');
const { validatePostCreation, validatePostUpdate } = require('../middlewares/validation/postValidation');
const handleValidationErrors = require('../middlewares/validation/handleValidation');
const authorizeRoles = require('../middlewares/roleMiddleware');

// Create a post
router.post(
  '/',
  authenticateToken,
  authorizeRoles('admin', 'user'),
  validatePostCreation,
  handleValidationErrors,
  postController.createPost
);

// Get all posts
router.get('/', postController.getAllPosts);

// Get a single post
router.get('/:id', postController.getPostById);

// Update a post
router.put(
  '/:id',
  authenticateToken,
  validatePostUpdate,
  handleValidationErrors,
  postController.updatePost
);

// Delete a post
router.delete('/:id', authenticateToken,authorizeRoles('admin', 'user'), postController.deletePost);

module.exports = router;
