// models/copy.js
module.exports = (sequelize, type) => {
    const Copy = sequelize.define('copies', {
      id: { type: type.INTEGER, primaryKey: true, autoIncrement: true },
      number: type.INTEGER,
      format: {
        type: type.ENUM('DVD', 'Blu-ray', 'Digital', 'VHS', 'Other'),
        allowNull: false,
        defaultValue: 'DVD'
      },
      movie_id: type.INTEGER,
      status: {
        type: type.ENUM('Available', 'Rented', 'Reserved', 'Damaged', 'Lost'),
        allowNull: false,
        defaultValue: 'Available'
      }
    });
  
    return Copy;
  };
  