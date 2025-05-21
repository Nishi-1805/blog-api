const { Post, User, Comment } = require('../models');

exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const author_id = req.user.id; 

    const newPost = await Post.create({ title, content, author_id });

    res.status(201).json({ message: 'Post created successfully', post: newPost });
  } catch (err) {
    console.error('Create Post Error:', err);
    res.status(500).json({ message: 'Failed to create post', error: err.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [{ model: User, attributes: ['username', 'email'] }, { model: Comment }]
    });

    res.status(200).json(posts);
  } catch (err) {
    console.error('Get All Posts Error:', err);
    res.status(500).json({ message: 'Failed to retrieve posts', error: err.message });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findByPk(postId, {
      include: [{ model: User, attributes: ['username', 'email'] }, { model: Comment }]
    });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json(post);
  } catch (err) {
    console.error('Get Post By ID Error:', err);
    res.status(500).json({ message: 'Failed to retrieve post', error: err.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { title, content } = req.body;
    const userId = req.user.id;
    const userRole = req.user.role;

    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.author_id !== userId) {
      return res.status(403).json({ message: 'You are not authorized to update this post' });
    }

    post.title = title || post.title;
    post.content = content || post.content;
    await post.save();

    res.status(200).json({ message: 'Post updated successfully', post });
  } catch (err) {
    console.error('Update Post Error:', err);
    res.status(500).json({ message: 'Failed to update post', error: err.message });
  }
};

exports.deletePost = async (req, res) => {
  const postId = req.params.id;
  const userId = req.user.id;
  const userRole = req.user.role;

  try {
    const post = await Post.findByPk(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found.' });
    }

    if (userRole === 'admin' || post.author_id === userId) {
      await post.destroy();
      return res.status(200).json({ message: 'Post deleted successfully.' });
    }

    return res.status(403).json({ message: 'You are not authorized to delete this post.' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error.' });
  }
};