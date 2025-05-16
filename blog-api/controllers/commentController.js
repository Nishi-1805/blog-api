const { Comment, User, Post } = require('../models');

// Create a new comment
exports.createComment = async (req, res) => {
  try {
    const { content, post_id } = req.body;

    // Ensure post exists
    const post = await Post.findByPk(post_id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Create the comment
    const newComment = await Comment.create({
      content,
      post_id,
      author_id: req.user.id, 
    });

    return res.status(201).json(newComment);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error creating comment' });
  }
};

// Get all comments for a specific post
exports.getCommentsByPost = async (req, res) => {
  try {
    const { post_id } = req.query;

    if (!post_id) {
      return res.status(400).json({ message: 'Post ID is required' });
    }

    const comments = await Comment.findAll({
      where: { post_id },
      include: [{ model: User, attributes: ['id', 'username'] }], 
    });

    if (comments.length === 0) {
      return res.status(404).json({ message: 'No comments found for this post' });
    }

    return res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error retrieving comments' });
  }
};

// Get a single comment by ID
exports.getCommentById = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await Comment.findByPk(id, {
      include: [{ model: User, attributes: ['id', 'username'] }], 
    });

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    return res.status(200).json(comment);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error retrieving comment' });
  }
};

// Update a comment
exports.updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    // Find the comment by ID
    const comment = await Comment.findByPk(id);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Check if the user is the author of the comment
    if (comment.author_id !== req.user.id) {
      return res.status(403).json({ message: 'You are not authorized to update this comment' });
    }

    // Update the comment
    comment.content = content;
    await comment.save();

    return res.status(200).json(comment);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error updating comment' });
  }
};

// Delete a comment
exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const userRole = req.user.role;

    const comment = await Comment.findByPk(id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Admin or the comment author can delete
    if (comment.author_id !== userId && userRole !== 'admin') {
      return res.status(403).json({ message: 'You are not authorized to delete this comment' });
    }

    await comment.destroy();
    return res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error deleting comment' });
  }
};