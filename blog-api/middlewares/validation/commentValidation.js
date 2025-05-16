const { body, query, param } = require('express-validator');

exports.validateCreateComment = [
  body('content')
    .notEmpty().withMessage('Content is required')
    .isLength({ min: 1, max: 500 }).withMessage('Content must be between 1 and 500 characters'),
  body('post_id')
    .notEmpty().withMessage('Post ID is required')
    .isInt().withMessage('Post ID must be a valid integer'),
];

exports.validateUpdateComment = [
  param('id')
    .notEmpty().withMessage('Comment ID is required')
    .isInt().withMessage('Comment ID must be an integer'),
  body('content')
    .notEmpty().withMessage('Content is required')
    .isLength({ min: 1, max: 500 }).withMessage('Content must be between 1 and 500 characters'),
];

exports.validateGetCommentsByPost = [
  query('post_id')
    .notEmpty().withMessage('Post ID is required in query')
    .isInt().withMessage('Post ID must be an integer'),
];

exports.validateIdParam = [
  param('id')
    .notEmpty().withMessage('ID is required')
    .isInt().withMessage('ID must be an integer'),
];
