module.exports = (sequelize, type) => {
  return sequelize.define('RecordItem', {
    id: {
      primaryKey: true,
      type: type.INTEGER,
      autoIncrement: true,
    },
    record_id: {
      type: type.UUID,
      allowNull: false,
    },
    time: {
      type: type.INTEGER,
      allowNull: false
    },
    action: {
      type: type.STRING,
      allowNull: false
    },
    result: {
      type: type.STRING,
      allowNull: false
    }
  }, {
    timestamps: false
  });
}
