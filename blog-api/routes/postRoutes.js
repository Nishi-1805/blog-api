const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authenticateToken = require('../middlewares/authMiddleware');
const { validatePostCreation, validatePostUpdate } = require('../middlewares/validation/postValidation');
const handleValidationErrors = require('../middlewares/validation/handleValidation');
const authorizeRoles = require('../middlewares/roleMiddleware');

router.post(
  '/',
  authenticateToken,
  authorizeRoles('admin', 'user'),
  validatePostCreation,
  handleValidationErrors,
  postController.createPost
);

router.get('/', postController.getAllPosts);

router.get('/:id', postController.getPostById);

router.put(
  '/:id',
  authenticateToken,
  validatePostUpdate,
  handleValidationErrors,
  postController.updatePost
);

router.delete('/:id', authenticateToken,authorizeRoles('admin', 'user'), postController.deletePost);

module.exports = router;
