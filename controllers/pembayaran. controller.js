const models = require("../models");
const User = models.user;
const Pembayaran = models.pembayaran;

const createPembayaran = async (req, res) => {
  const { userUuid, jumlah, image, status } = req.body;

  try {
    const user = await User.findOne({where: {uuid: userUuid}})

    const post = await Pembayaran.create({jumlah, image, status, userId: user.id})

    return res.json(post)
  } catch(err) {
    console.log(err)
    return res.status(500).json(err);
  }
};

const getAllPembayaran = async (req, res) => {
  try {
    const result = await Pembayaran.findAll({ include: 'user' })

    return res.json(result)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
};
const getAllPembayaranById = async (req, res) => {};
const updatePembayaran = async (req, res) => {};
const deletePembayaran = async (req, res) => {};

module.exports = { createPembayaran, getAllPembayaran, getAllPembayaranById, updatePembayaran, deletePembayaran };
