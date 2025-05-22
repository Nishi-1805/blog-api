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

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Blog comment management
 */

/**
 * @swagger
 * /api/comments:
 *   post:
 *     summary: Create a new comment on a blog post
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - post_id
 *               - content
 *             properties:
 *               post_id:
 *                 type: integer
 *                 example: 1
 *               content:
 *                 type: string
 *                 example: This is a comment
 *     responses:
 *       201:
 *         description: Comment created successfully
 */
router.post('/', authenticateToken, validateCreateComment, handleValidationErrors, commentController.createComment);

/**
 * @swagger
 * /api/comments:
 *   get:
 *     summary: Get comments for a post (via post_id query param)
 *     tags: [Comments]
 *     parameters:
 *       - in: query
 *         name: post_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the post to fetch comments for
 *     responses:
 *       200:
 *         description: List of comments for the post
 */
router.get('/', validateGetCommentsByPost, handleValidationErrors, commentController.getCommentsByPost);

/**
 * @swagger
 * /api/comments/{id}:
 *   get:
 *     summary: Get a single comment by ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the comment
 *     responses:
 *       200:
 *         description: Comment found
 *       404:
 *         description: Comment not found
 */
router.get('/:id', validateIdParam, handleValidationErrors, commentController.getCommentById);

/**
 * @swagger
 * /api/comments/{id}:
 *   put:
 *     summary: Update a comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the comment to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: Comment not found
 */
router.put('/:id', authenticateToken, validateUpdateComment, handleValidationErrors, commentController.updateComment);

/**
 * @swagger
 * /api/comments/{id}:
 *   delete:
 *     summary: Delete a comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the comment to delete
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: Comment not found
 */
router.delete('/:id', authenticateToken, validateIdParam, handleValidationErrors, commentController.deleteComment);

module.exports = router;
