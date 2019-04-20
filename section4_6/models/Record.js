module.exports = (sequelize, type) => {
  return sequelize.define('Record', {
    id: {
      primaryKey: true,
      type: type.INTEGER,
      autoIncrement: true,
    },
    record_id: {
      type: type.UUID,
      allowNull: false,
      unique: true,
      defaultValue: type.UUIDV4,
    },
    create_at: {
      type: type.DATE,
      allowNull: false,
      defaultValue: type.NOW,
    },
    update_at: {
      type: type.DATE,
    },
  }, {
    timestamps: false
  });
}