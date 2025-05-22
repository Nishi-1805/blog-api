const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authenticateToken = require('../middlewares/authMiddleware');
const { validatePostCreation, validatePostUpdate } = require('../middlewares/validation/postValidation');
const handleValidationErrors = require('../middlewares/validation/handleValidation');
const authorizeRoles = require('../middlewares/roleMiddleware');

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Blog post management
 */

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Create a new blog post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *                 example: My First Blog
 *               content:
 *                 type: string
 *                 example: This is the content of the post.
 *     responses:
 *       201:
 *         description: Post created successfully
 */
router.post(
  '/',
  authenticateToken,
  authorizeRoles('admin', 'user'),
  validatePostCreation,
  handleValidationErrors,
  postController.createPost
);

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Retrieve all blog posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: List of blog posts
 */
router.get('/', postController.getAllPosts);

/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     summary: Retrieve a single blog post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the post
 *     responses:
 *       200:
 *         description: Post found
 *       404:
 *         description: Post not found
 */
router.get('/:id', postController.getPostById);

/**
 * @swagger
 * /api/posts/{id}:
 *   put:
 *     summary: Update a blog post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Post updated successfully
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: Post not found
 */
router.put(
  '/:id',
  authenticateToken,
  validatePostUpdate,
  handleValidationErrors,
  postController.updatePost
);

/**
 * @swagger
 * /api/posts/{id}:
 *   delete:
 *     summary: Delete a blog post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: Post not found
 */
router.delete('/:id', authenticateToken, authorizeRoles('admin', 'user'), postController.deletePost);

module.exports = router;
