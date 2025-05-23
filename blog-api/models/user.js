module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'user'
     }
  }, {
    underscored: true,
  });

  User.associate = (models) => {
  //  User.hasMany(models.Post, { foreignKey: 'author_id' });
  //  User.hasMany(models.Comment, { foreignKey: 'author_id' });
    User.hasMany(models.Post, { foreignKey: 'author_id', onDelete: 'CASCADE' });
    User.hasMany(models.Comment, { foreignKey: 'author_id', onDelete: 'CASCADE' });  

};

  return User;
};
