const models = require('../models');
const User = models.user;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 12;

const loginUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  const checkUserPassword = await bcrypt.compare(req.body.password, user.password);
  if (checkUserPassword == false) {
    res.status(401).json({ error: "email or password mismatch" });
    return;
  }
  if (checkUserPassword == true) {
    const uuid = user.uuid;
    const name = user.name;
    const email = user.email;
    const role = user.role;
    const token = jwt.sign({ userId: user.id }, "secretKey", { expiresIn: "1h" });
    return res.status(200).json({ uuid, name, email, role, token });
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

const registerUser = async (req, res) => {
  const { name,foto, alamat, tempatLahir, tanggalLahir, noHp, email, password, status, role } = req.body;
  const hashPassword = await bcrypt.hash(password, saltRounds);

  try {
    const user = await User.create({
      name: name,
      foto:foto,
      alamat: alamat,
      tempatLahir: tempatLahir,
      tanggalLahir: tanggalLahir,
      noHp: noHp,
      email: email,
      password: hashPassword,
      status: false,
      role: role,
    });
    res.status(201).json(user);
  } catch {
    res.status(422).json({ message: "Failed register user" });
  }
};

module.exports = { loginUser,registerUser };
