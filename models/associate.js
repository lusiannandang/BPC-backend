const User = require("./user");
const Kelas = require("./kelas");
const Pembayaran = require("./pembayaran");
const Pengumuman = require("./pengumuman");

User.belongsTo(Kelas);
Kelas.hasMany(User, {as: 'user'});

User.hasMany(Pembayaran, { as: 'pembayaran' });
Pembayaran.belongsTo(User, { as: 'user' });

module.exports = { User, Pembayaran, Kelas, Pengumuman };
