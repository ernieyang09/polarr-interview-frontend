'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('RecordItems', {
    id: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      autoIncrement: true,
    },
    record_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'Records',
        key: 'record_id',
      }
    },
    time: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    action: {
      type: Sequelize.STRING,
      allowNull: false
    },
    result: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }),
  down: queryInterface => queryInterface.dropTable('RecordItems'),
};
