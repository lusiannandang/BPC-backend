const { Sequelize } = require('sequelize');

// Konfigurasi koneksi database
const sequelize = new Sequelize('skripsi', 'nandang', 'lusian123', {
  host: 'localhost', // alamat host database
  dialect: 'postgres', // jenis database yang digunakan
  // opsi lainnya
});

// Tes koneksi ke database
sequelize
  .authenticate()
  .then(() => {
    console.log('Koneksi ke database berhasil!');
  })
  .catch((err) => {
    console.error('Gagal terhubung ke database:', err);
  });

module.exports = sequelize;
