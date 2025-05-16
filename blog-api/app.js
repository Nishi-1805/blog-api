const express = require('express');
const app = express();
require('dotenv').config();
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');

const db = require('./models'); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log('Incoming Headers:', req.headers['content-type']);
  console.log('Incoming Body:', req.body);
  next();
});

app.use('/api/auth', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

app.get('/', (req, res) => {
  res.send('Blog API is running');
});

sequelize.sync({ alter: false }).then(() => {
  console.log('Database connected and tables created');
}).catch((err) => {
  console.error('Error syncing database:', err);
});

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server running on port ${process.env.SERVER_PORT}`);
});
