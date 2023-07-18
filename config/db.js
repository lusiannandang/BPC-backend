const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('skripsi', 'nandang', 'lusian123', {
  host: 'localhost', 
  dialect: 'postgres', 
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Koneksi ke database berhasil!');
  })
  .catch((err) => {
    console.error('Gagal terhubung ke database:', err);
  });

module.exports = sequelize;
