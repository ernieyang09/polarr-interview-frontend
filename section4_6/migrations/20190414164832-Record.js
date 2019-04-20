'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Records', {
    id: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      autoIncrement: true,
    },
    record_id: {
      type: Sequelize.UUID,
      allowNull: false,
      unique: true,
      defaultValue: Sequelize.UUIDV4,
    },
    create_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,

    },
    update_at: {
      type: Sequelize.DATE,
    },
  }),
  down: queryInterface => queryInterface.dropTable('Records'),
};
