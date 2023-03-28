'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Booking.belongsTo(models.Spot, {foreignKey: 'spotId'});
      Booking.belongsTo(models.User, {foreignKey: 'userId'});
    }
  }
  Booking.init({
    spotId: {
      type: DataTypes.INTEGER,
      // allowNull: false
      },
    userId: {
      type: DataTypes.INTEGER,
      // allowNull: false
      },
    startDate: {
      type: DataTypes.DATE,
      validate:{
        isAfter: '2023-03-30',
        isBefore: '2025-01-01'
      }
      },
    endDate: {
      type: DataTypes.DATE,
      validate:{

      }
      }
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};
