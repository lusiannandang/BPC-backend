const { User, Pembayaran, Kelas } = require("../models/associate");
const bcrypt = require("bcrypt");
const saltRounds = 12;

const createUser = async (req, res) => {
  const { name, foto, alamat, tempatLahir, tanggalLahir, noHp, email, password, status, role } = req.body;
  const hashPassword = await bcrypt.hash(password, saltRounds);

  try {
    const user = await User.create({
      name: name,
      foto: foto,
      alamat: alamat,
      tempatLahir: tempatLahir,
      tanggalLahir: tanggalLahir,
      noHp: noHp,
      email: email,
      password: hashPassword,
      status: false,
      role: "USER",
    });
    res.status(201).json(user);
  } catch {
    res.status(422).json({ message: "Failed register user" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const result = await User.findAll({ where: { role: "USER" }, include: [{ model: Kelas }, { model: Pembayaran }] });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getAllUserById = async (req, res) => {
  const userId = req.params.id;
  console.log(userId);
  try {
    const result = await User.findOne({ include: [{ model: Kelas }, { model: Pembayaran }], where: { id: userId } });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const updateUser = async (req, res) => {
  const { name, alamat, tempatLahir, tanggalLahir, noHp, status, role } = req.body;

  const userFind = await User.findByPk(req.params.id);
  if (userFind) {
    try {
      let user = await User.update(
        {
          name: name,
          alamat: alamat,
          tempatLahir: tempatLahir,
          tanggalLahir: tanggalLahir,
          noHp: noHp,
          status: status,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  } else {
    res.status(500).json({ msg: "Tidak ada" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.destroy({ where: { id: id } });

    res.status(200).json({
      message: "Item deleted",
    });
  } catch (error) {
    res.status(500).json({ message: "failed to delete item" });
  }
};

module.exports = { createUser, getAllUsers, getAllUserById, updateUser, deleteUser };
