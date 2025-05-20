const db = require('../models');

module.exports = async () => {
  await db.sequelize.drop();
  await db.sequelize.query('DROP TYPE IF EXISTS "enum_Users_role" CASCADE;');
  await db.sequelize.sync({ force: true });
};
