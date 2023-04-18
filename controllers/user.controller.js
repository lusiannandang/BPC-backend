const models = require('../models');
const User = models.user;
const Kelas = models.kelas;
const Pembayaran = models.pembayaran;
const bcrypt = require("bcrypt");
const saltRounds = 12;

const createUser = async (req, res) => {
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

const getAllUsers = async (req, res) => {
  try {
    const result = await User.findAll();
    res.status(200).json({ data: result });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getAllUserById = async (req, res) => {
  const uuid = req.params.uuid;
  try {
    const result = await User.findOne({where: {uuid}, include: "pembayaran"});
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const updateUser = async (req, res) => {
  const { name, alamat, tempatLahir, tanggalLahir, noHp, email, password, status, role } = req.body;
  const hashPassword = await bcrypt.hash(password, saltRounds);

  const userFind = User.findByPk(req.params.id, );
  if(userFind){
    try{
      let user = {};
    user = await User.create({
      name: name,
      alamat: alamat,
      tempatLahir: tempatLahir,
      tanggalLahir: tanggalLahir,
      noHp: noHp,
      email: email,
      password: hashPassword,
      status: false,
      role: role,
    });
    res.status(201).json({
      message: "Registered user successfully",
      data: {
        id: user.uuid,
        name: user.name,
        alamat: user.alamat,
        tempatLahir: user.tempatLahir,
        noHp: user.noHp,
        email: user.email,
        password: user.password,
        status: user.status,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
    } 
    catch{
      res.status(500).json({ msg: error.message });
    }
  }else{
    res.status(500).json({ msg: "Tidak ada" });
  }

};


const deleteUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  try {
    await User.destroy({
      where: {
        id: user.id,
      },
    });
    res.status(200).json({ msg: "User Deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

module.exports = { createUser, getAllUsers, getAllUserById, updateUser, deleteUser };
