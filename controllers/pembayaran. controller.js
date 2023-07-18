const { User, Pembayaran, Kelas, Pengumuman } = require("../models/associate");
const formidable = require("formidable");
const cloudinary = require("../config/cloudinary.js");

const createPembayaran = async (req, res) => {
  const userId = req.params.id;
  const form = formidable({});
  const user = await User.findOne({ where: { id: userId } });

  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }

  const existingPayment = await Pembayaran.findOne({
    where: {
      userId: userId,
      bulan: new Date().getMonth() + 1,
      tahun: new Date().getFullYear(),
    },
  });

  if (existingPayment) {
    return res.status(400).json({ msg: "User has already paid for this month" });
  }

  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);

      return;
    }

    cloudinary.uploader.upload(files.image.filepath, function (err, result) {
      if (err) {
        next(err);
        return;
      }

      const pembayaran = Pembayaran.create({
        jumlah: fields.jumlah,
        image: result.secure_url,
        status: fields.false,
        tanggal: new Date(),
        bulan: new Date().getMonth() + 1,
        tahun: new Date().getFullYear(),
        userId: userId,
      }).then((result) => {
        res.status(200).json(pembayaran);
      });
    });
  });
};

const getAllPembayaran = async (req, res) => {
  try {
    const result = await Pembayaran.findAll({ include: [{ model: User}] });
    return res.json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const getAllPembayaranById = async (req, res) => {
  const userId = req.params.id;

  try {
    const result = await Pembayaran.findAll({
      where: { userId: userId },
      include: [{ model: User}],
    });

    if (result.length === 0) {
      return res.json(null);
    } else {
      return res.json(result);
    }    
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const updatePembayaran = async (req, res, next) => {
  const userId = req.params.id;
  const pembayaranId = req.params.pembayaranId;
  console.log(userId)
  console.log(pembayaranId)
  const form = formidable({});
  const user = await User.findOne({ where: { id: userId } });

  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }

  
  const existingPayment = await Pembayaran.findOne({
    where: {
      id: pembayaranId,
      userId: userId,
    },
  });

  if (!existingPayment) {
    return res.status(404).json({ msg: "Pembayaran not found" });
  }

  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);

      return;
    }

    if (files.image) {
      cloudinary.uploader.upload(files.image.filepath, function (err, result) {
        if (err) {
          next(err);
          return;
        }
        
        existingPayment.update({
          jumlah: fields.jumlah,
          image: result.secure_url,
          status: fields.status, 
          tanggal: new Date(),
          bulan: new Date().getMonth() + 1,
          tahun: new Date().getFullYear(),
        }).then((result) => {
          res.status(200).json(result);
        });
      });
    } else {
      
      existingPayment.update({
        jumlah: fields.jumlah,
        status: fields.status, 
        tanggal: new Date(),
        bulan: new Date().getMonth() + 1,
        tahun: new Date().getFullYear(),
      }).then((result) => {
        res.status(200).json(result);
      });
    }
  });
};


const deletePembayaran = async (req, res) => {
  const pembayaranId = req.params.id;

  try {
    const pembayaran = await Pembayaran.findOne({ where: { id: pembayaranId } });

    if (!pembayaran) {
      return res.status(404).json({ msg: "Pembayaran not found" });
    }

    await pembayaran.destroy();

    return res.json({ msg: "Pembayaran deleted successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = { createPembayaran, getAllPembayaran, getAllPembayaranById, updatePembayaran, deletePembayaran };
