const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // mengimport instance Sequelize yang telah dikonfigurasi

const Pengumuman = sequelize.define("Pengumuman", {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  judul: DataTypes.STRING,
  isi: DataTypes.TEXT,
  image: DataTypes.STRING,
});

module.exports = Pengumuman;
