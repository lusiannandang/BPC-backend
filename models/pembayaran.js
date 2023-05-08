const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // mengimport instance Sequelize yang telah dikonfigurasi
const User = require('./user'); // mengimport model User

const Pembayaran = sequelize.define('Pembayaran', {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  jumlah: DataTypes.INTEGER,
  image: DataTypes.STRING,
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  tanggal: {
    type: DataTypes.DATE,
    allowNull: false
  },
  bulan: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: new Date().getMonth() + 1 // Nilai awal = bulan saat ini
  },
  tahun: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: new Date().getFullYear() // Nilai awal = tahun saat ini
  },
  userId:{
    type: DataTypes.INTEGER
  }
});


// Asosiasi Pembayaran milik User
module.exports = Pembayaran;
