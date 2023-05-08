const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // mengimport instance Sequelize yang telah dikonfigurasi
const Pembayaran = require('./pembayaran'); // mengimport model Pembayaran
const Kelas = require('./kelas'); // mengimport model Kelas

const User = sequelize.define('User', {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  foto: {
    type: DataTypes.STRING,
  },
  alamat: {
    type: DataTypes.STRING,
  },
  tempatLahir: {
    type: DataTypes.STRING,
  },
  tanggalLahir: {
    type: DataTypes.DATE,
  },
  noHp: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.BOOLEAN,
  },
  role: {
    type: DataTypes.STRING,
  },
});

// Asosiasi User memiliki satu Kelas


module.exports = User;
