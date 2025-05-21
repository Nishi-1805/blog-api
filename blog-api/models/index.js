'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const sequelize = require('../config/database');
//const process = require('process');
const basename = path.basename(__filename);
//const env = process.env.NODE_ENV || 'development';
//const config = require(__dirname + '/../config/config.json')[env];
const db = {};

//let sequelize;
//if (config.use_env_variable) {
//  sequelize = new Sequelize(process.env[config.use_env_variable], config);
//} else {
//  sequelize = new Sequelize(config.database, config.username, config.password, config);
//}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

//  const { User, Post, Comment } = db;

// User has many Posts
//User.hasMany(Post, { foreignKey: 'author_id', onDelete: 'CASCADE' });
//Post.belongsTo(User, { foreignKey: 'author_id' });

// User has many Comments
//User.hasMany(Comment, { foreignKey: 'author_id', onDelete: 'CASCADE' });
//Comment.belongsTo(User, { foreignKey: 'author_id' });

// Post has many Comments
//Post.hasMany(Comment, { foreignKey: 'post_id', onDelete: 'CASCADE' });
//Comment.belongsTo(Post, { foreignKey: 'post_id' });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
