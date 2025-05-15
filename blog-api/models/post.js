module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false }
  });

  Post.associate = (models) => {
    Post.belongsTo(models.User, { foreignKey: 'author_id' });
    Post.hasMany(models.Comment, { foreignKey: 'post_id' });
  };

  return Post;
};
