const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // mengimport instance Sequelize yang telah dikonfigurasi

const Kelas = sequelize.define('Kelas', {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  nama: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId:{
    type: DataTypes.INTEGER
  }
});

module.exports = Kelas;
