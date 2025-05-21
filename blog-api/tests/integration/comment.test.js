const request = require('supertest');
const app = require('../../app'); 
const {sequelize, User, Post, Comment} = require('../../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const setupDatabase = require('../setup');

let token;
let testUser;
let testPost;
let testComment;

beforeAll(async () => {
await setupDatabase();

  const hashedPassword = await bcrypt.hash('password123', 10);
  testUser = await User.create({
    username: 'testuser',
    email: 'testuser@example.com',
    password: hashedPassword, 
    role: 'user'
  });

  token = jwt.sign({ id: testUser.id, role: testUser.role }, process.env.JWT_SECRET || 'secretkey');

  testPost = await Post.create({
    title: 'Test Post',
    content: 'Test post content',
    author_id: testUser.id,
  });
});

afterAll(async () => {
   await Comment.destroy({ where: {} });
  await Post.destroy({ where: {} });
  await User.destroy({ where: {} });
  await sequelize.close();
});

describe('Comments API Integration Tests', () => {

  test('POST /api/comments - create a new comment', async () => {
    const res = await request(app)
      .post('/api/comments')
      .set('Authorization', `Bearer ${token}`)
      .send({
        content: 'This is a test comment',
        post_id: testPost.id,
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('content', 'This is a test comment');
    expect(res.body).toHaveProperty('post_id', testPost.id);
    expect(res.body).toHaveProperty('author_id', testUser.id); 

    testComment = res.body; 
  });

  test('GET /api/comments?post_id= - get all comments for a post', async () => {
    const res = await request(app)
      .get(`/api/comments?post_id=${testPost.id}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty('content', 'This is a test comment');
  });

  test('GET /api/comments/:id - get a single comment', async () => {
    const res = await request(app)
      .get(`/api/comments/${testComment.id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('content', testComment.content);
  });

  test('PUT /api/comments/:id - update a comment', async () => {
    const res = await request(app)
      .put(`/api/comments/${testComment.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ content: 'Updated comment content' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('content', 'Updated comment content');
  });

  test('DELETE /api/comments/:id - delete a comment', async () => {
    const res = await request(app)
      .delete(`/api/comments/${testComment.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Comment deleted successfully');
  });

  test('GET /api/comments/:id - get deleted comment should return 404', async () => {
    const res = await request(app)
      .get(`/api/comments/${testComment.id}`);

    expect(res.statusCode).toBe(404);
  });
});
