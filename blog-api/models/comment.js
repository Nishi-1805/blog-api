module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    content: { type: DataTypes.TEXT, allowNull: false }
   }, {
    underscored: true,
  });

  Comment.associate = (models) => {
    Comment.belongsTo(models.User, { foreignKey: 'author_id', onDelete: 'CASCADE' });
    Comment.belongsTo(models.Post, { foreignKey: 'post_id', onDelete: 'CASCADE' });
   
    // Comment.belongsTo(models.User, { foreignKey: 'author_id' });
   // Comment.belongsTo(models.Post, { foreignKey: 'post_id' });
  };

  return Comment;
};
