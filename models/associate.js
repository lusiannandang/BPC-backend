const User = require("./user");
const Kelas = require("./kelas");
const Pembayaran = require("./pembayaran");
const Pengumuman = require("./pengumuman");

User.hasMany(Kelas, { foreignKey: "userId" });
User.hasMany(Pembayaran, { foreignKey: "userId" });


Pembayaran.belongsTo(User, { foreignKey: "userId" });
Kelas.belongsTo(User, { foreignKey: "userId" });

module.exports = { User, Pembayaran, Kelas, Pengumuman };
