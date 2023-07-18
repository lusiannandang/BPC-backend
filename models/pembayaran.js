const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // mengimport instance Sequelize yang telah dikonfigurasi

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
    defaultValue: new Date().getMonth() + 1
  },
  tahun: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: new Date().getFullYear() 
  },
  userId:{
    type: DataTypes.INTEGER
  }
});


module.exports = Pembayaran;
