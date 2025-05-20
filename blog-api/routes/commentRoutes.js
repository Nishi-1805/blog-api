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

router.post('/', authenticateToken, validateCreateComment, handleValidationErrors, commentController.createComment);

router.get('/', validateGetCommentsByPost, handleValidationErrors, commentController.getCommentsByPost);

router.get('/:id', validateIdParam, handleValidationErrors, commentController.getCommentById);

router.put('/:id', authenticateToken, validateUpdateComment, handleValidationErrors, commentController.updateComment);

router.delete('/:id', authenticateToken, validateIdParam, handleValidationErrors, commentController.deleteComment);

module.exports = router;
