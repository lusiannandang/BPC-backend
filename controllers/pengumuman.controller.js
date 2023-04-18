const models = require('../models');
const Pengumuman = models.pengumuman;
const formidable = require("formidable");
const cloudinary = require("../config/cloudinary.js");

const createPengumuman = async (req, res) => {
  const form = formidable({});

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

      const pengumuman = Pengumuman.create({
        id: fields.id,
        judul: fields.judul,
        isi: fields.isi,
        image: result.secure_url,
      }).then((result) => {
        res.status(200).json(pengumuman);
      });
    });
  });
};

const getAllPengumuman = async (req, res) => {
  try {
    const result = await Pengumuman.findAll();
    res.status(200).json({ data: result });
  } catch (error) {
    res.status(500).json({ message: "failed to get all data" });
  }
};
const getAllPengumumanById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Pengumuman.findByPk(id);
    res.status(200).json({ data: result });
  } catch (error) {
    res.status(500).json({ message: "failed to get data" });
  }
};

const updatePengumuman = async (req, res) => {
  const form = formidable({});

  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }

    Pengumuman.findByPk(req.params.id)
      .then((result) => {
        if (result == null) {
          res.status(404).json({
            message: 'Item not found',
          });
          return;
        }

        cloudinary.uploader.upload(files.image.filepath, function (err, result) {
          if (err) {
            next(err);
            return;
          }

          Pengumuman.update(fields, { where: { id: req.params.id } })
            .then((result) => {
              res.status(200).json({
                message: 'Item successfully updated',
              });
            })
            .catch((err) => {
              res.status(404).json({ message: err.message });
            });
        });
      })
      .catch((err) => {
        res.status(404).json({ message: err.message });
      });
  });
};

const deletePengumuman = async (req, res) => {
  try {
    const { id } = req.params;
    await Pengumuman.destroy({ where: { id: id } });

    res.status(200).json({
      message: "Item deleted",
    });
  } catch (error) {
    res.status(500).json({ message: "failed to delete item" });
  }
};

module.exports = { createPengumuman, getAllPengumuman, getAllPengumumanById, updatePengumuman, deletePengumuman };
