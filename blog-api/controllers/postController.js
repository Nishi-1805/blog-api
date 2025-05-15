const { Post, User, Comment } = require('../models');

exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const author_id = req.user.id; // Assuming you're using JWT for authentication

    // Create a new post
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

    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
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
  try {
    const postId = req.params.id;
    
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    await post.destroy();
    console.log("Deleted post");
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error('Delete Post Error:', err);
    res.status(500).json({ message: 'Failed to delete post', error: err.message });
  }
};
