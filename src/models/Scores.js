const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  
  sequelize.define('Scores', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, 
      allowNull: false,
      primaryKey: true
    },
    front_nine: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    back_nine: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    handicap: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false
    },
    matricula: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

};
