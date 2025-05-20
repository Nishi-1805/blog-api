const request = require('supertest');
const app = require('../../app'); 
const sequelize = require('../../config/database');
const { User, Post } = require('../../models'); 


describe('Posts API Integration Tests', () => {
  let token;
  let postId;

  const testUser = {
    username: 'posttester',
    email: 'posttester@example.com',
    password: 'testpassword',
  };

  const postPayload = {
    title: 'Test Post Title',
    content: 'This is the test post content.',
  };

  beforeAll(async () => {
     const setupDatabase = require('../setup');
await setupDatabase();

    await Post.destroy({ where: { } });
    await User.destroy({ where: { email: testUser.email } });

    await request(app).post('/api/auth/register').send(testUser);

    const loginRes = await request(app).post('/api/auth/login').send({
      email: testUser.email,
      password: testUser.password,
    });
    token = loginRes.body.token;
  });

  afterAll(async () => {
    await Post.destroy({ where: { } });
    await User.destroy({ where: { email: testUser.email } });
    await sequelize.close();
  });

  describe('POST /api/posts', () => {
    it('should create a new post', async () => {
      const res = await request(app)
        .post('/api/posts')
        .set('Authorization', `Bearer ${token}`)
        .send(postPayload);

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('message', 'Post created successfully');
      expect(res.body).toHaveProperty('post');
      expect(res.body.post).toHaveProperty('title', postPayload.title);
      expect(res.body.post).toHaveProperty('content', postPayload.content);

      postId = res.body.post.id; 
    });

    it('should fail to create post without token', async () => {
      const res = await request(app)
        .post('/api/posts')
        .send(postPayload);

      expect(res.statusCode).toBe(401);
    });
  });

  describe('GET /api/posts', () => {
    it('should get all posts', async () => {
      const res = await request(app).get('/api/posts');

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('GET /api/posts/:id', () => {
    it('should get a single post by id', async () => {
      const res = await request(app).get(`/api/posts/${postId}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('id', postId);
      expect(res.body).toHaveProperty('title', postPayload.title);
    });

    it('should return 404 for non-existing post', async () => {
      const res = await request(app).get('/api/posts/999999');

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('message', 'Post not found');
    });
  });

  describe('PUT /api/posts/:id', () => {
    it('should update an existing post', async () => {
      const updatedData = {
        title: 'Updated Post Title',
        content: 'Updated content here',
      };

      const res = await request(app)
        .put(`/api/posts/${postId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(updatedData);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('message', 'Post updated successfully');
      expect(res.body.post).toHaveProperty('title', updatedData.title);
      expect(res.body.post).toHaveProperty('content', updatedData.content);
    });

    it('should return 403 if user is not authorized to update the post', async () => {
      const otherUser = {
        username: 'otheruser',
        email: 'otheruser@example.com',
        password: 'password456',
      };
      await request(app).post('/api/auth/register').send(otherUser);

      const loginRes = await request(app).post('/api/auth/login').send({
        email: otherUser.email,
        password: otherUser.password,
      });
      const otherUserToken = loginRes.body.token;

      const res = await request(app)
        .put(`/api/posts/${postId}`)
        .set('Authorization', `Bearer ${otherUserToken}`)
        .send({ title: 'Malicious Update' });

      expect(res.statusCode).toBe(403);
      expect(res.body).toHaveProperty('message', 'You are not authorized to update this post');

      await User.destroy({ where: { email: otherUser.email } });
    });

    it('should return 404 if post does not exist', async () => {
      const res = await request(app)
        .put('/api/posts/999999')
        .set('Authorization', `Bearer ${token}`)
        .send({ title: 'Non-existent' });

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('message', 'Post not found');
    });
  });

  describe('DELETE /api/posts/:id', () => {
    it('should delete a post successfully', async () => {
      const res = await request(app)
        .delete(`/api/posts/${postId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('message', 'Post deleted successfully.');
    });

    it('should return 404 when deleting non-existing post', async () => {
      const res = await request(app)
        .delete(`/api/posts/${postId}`) 
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('message', 'Post not found.');
    });

    it('should return 403 if user is not authorized to delete the post', async () => {
      const postRes = await request(app)
        .post('/api/posts')
        .set('Authorization', `Bearer ${token}`)
        .send(postPayload);

      const newPostId = postRes.body.post.id;

      const otherUser = {
        username: 'unauthorizedUser',
        email: 'unauth@example.com',
        password: 'password789',
      };
      await request(app).post('/api/auth/register').send(otherUser);
      const loginRes = await request(app).post('/api/auth/login').send({
        email: otherUser.email,
        password: otherUser.password,
      });
      const otherUserToken = loginRes.body.token;

      const res = await request(app)
        .delete(`/api/posts/${newPostId}`)
        .set('Authorization', `Bearer ${otherUserToken}`);

      expect(res.statusCode).toBe(403);
      expect(res.body).toHaveProperty('message', 'You are not authorized to delete this post.');

      // Cleanup
      await User.destroy({ where: { email: otherUser.email } });
      await Post.destroy({ where: { id: newPostId } });
    });
  });
});
