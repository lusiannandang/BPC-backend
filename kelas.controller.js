const { User, Kuisioner, Kelas, Pengumuman } = require("./models/associate");
const csvToJson = require("convert-csv-to-json");

const addKelas = async (req, res) => {
  const { lamaLatihan, jumlahPrestasi, waktuGayaBebas, gayaDikuasai, jarakLatihan } = req.body;

  // Fungsi untuk melakukan prediksi menggunakan decision tree
  // Definisi data
  let json = csvToJson.getJsonFromCsv("./Dataset.csv");
  // console.log(json);

  const trainingData = json;
  // console.log(trainingData);
  // Definisi atribut-atribut
  const attributes = ["lamaLatihan", "jumlahPrestasi", "waktuGayaBebas", "gayaDikuasai", "jarakLatihan"];

  // Fungsi untuk menghitung entropy
  function calculateEntropy(data, targetAttribute) {
    const target = data.map((row) => row[targetAttribute]); //ambil data tiap dataset
    const total = target.length;
    const counts = target.reduce((acc, val) => { //menghitung kemunculan tiap nilai taget variabel
      acc[val] = (acc[val] || 0) + 1;
      return acc;
    }, {});
    const probabilities = Object.values(counts).map((count) => count / total);
    const entropy = probabilities.reduce((sum, prob) => sum - prob * Math.log2(prob), 0);
    return entropy;
  }

  // Fungsi untuk menghitung gain information
  function calculateInformationGain(data, attribute, targetAttribute) {
    const attributeValues = [...new Set(data.map((row) => row[attribute]))]; //nilai yang mungkin muncul pada atribut yg diberikan
    const total = data.length;
    const entropyParent = calculateEntropy(data, targetAttribute); //entropy total

    let entropyChildren = 0;
    attributeValues.forEach((val) => { //menghitung entropy data pada atribut yang sama
      const subsetData = data.filter((row) => row[attribute] === val);
      const subsetEntropy = calculateEntropy(subsetData, targetAttribute);
      const subsetWeight = subsetData.length / total;
      entropyChildren += subsetEntropy * subsetWeight;
    });

    const informationGain = entropyParent - entropyChildren; //menghitung gain
    return informationGain;
  }

  // Fungsi untuk membangun decision tree
  function buildDecisionTree(data, attributes, targetAttribute = "kelas") {
    const uniqueClasses = [...new Set(data.map((row) => row[targetAttribute]))]; //nilai-nilai unik dari target variabel pada dataset
    if (uniqueClasses.length === 1) { //jika 1 maka keputusan hanya akan memiliki satu simpul dengan nilai kelas tersebut
      return { kelas: uniqueClasses[0] };
    }

    if (attributes.length === 0) { //jika kosong tidak ada lagi atribut yang dapat digunakan untuk membangun pohon keputusan
      const target = data.map((row) => row[targetAttribute]);
      const counts = target.reduce((acc, val) => {
        acc[val] = (acc[val] || 0) + 1;
        return acc;
      }, {});
      const majorityClass = Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b));
      return { kelas: majorityClass };
    }

    const gains = attributes.map((attribute) => { //menghitung gain jika masih ada atribut yg digunakan
      const gain = calculateInformationGain(data, attribute, targetAttribute);
      return { attribute, gain };
    });

    const bestAttribute = gains.reduce((a, b) => (a.gain > b.gain ? a : b)).attribute;
    const attributeValues = [...new Set(data.map((row) => row[bestAttribute]))];
    const tree = { attribute: bestAttribute, children: {} };

    attributeValues.forEach((val) => {
      const subsetData = data.filter((row) => row[bestAttribute] === val);
      const subsetAttributes = attributes.filter((attr) => attr !== bestAttribute);
      tree.children[val] = buildDecisionTree(subsetData, subsetAttributes, targetAttribute);
    });

    return tree;
  }

  // Membangun decision tree dari data training
  const decisionTree = buildDecisionTree(trainingData, attributes);

  // Fungsi untuk melakukan prediksi menggunakan decision tree
  function predict(data, tree) {
    if (tree.hasOwnProperty("kelas")) {
      return tree.kelas;
    }

    const attribute = tree.attribute;
    const attributeValue = data[attribute];

    if (!tree.children.hasOwnProperty(attributeValue)) {
      // Jika nilai atribut tidak ditemukan pada pohon, kembalikan kelas terbanyak
      const target = trainingData.map((row) => row[targetAttribute]);
      const counts = target.reduce((acc, val) => {
        acc[val] = (acc[val] || 0) + 1;
        return acc;
      }, {});
      const majorityClass = Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b));
      return majorityClass;
    }

    const nextTree = tree.children[attributeValue];
    return predict(data, nextTree);
  }

  
  const userFind = await User.findByPk(req.params.id);
  if (userFind) {
    try {
      const dataToPredict = {
        lamaLatihan: lamaLatihan,
        jumlahPrestasi: jumlahPrestasi,
        waktuGayaBebas: waktuGayaBebas,
        gayaDikuasai: gayaDikuasai,
        jarakLatihan: jarakLatihan,
      };

      // Melakukan prediksi menggunakan decision tree
      const prediction = predict(dataToPredict, decisionTree);

      const hasil = await Kelas.create({
        nama: prediction,
        userId: req.params.id,
      });

      res.status(200).json(hasil);
    } catch (error) {
      res.status(500).json({ msg: "error.message" });
    }
  } else {
    res.status(500).json({ msg: "Tidak ada" });
  }
};


const getAllKelas = async (req, res) => {
  try {
    const result = await Kelas.findAll({
      include: [{
        model: User
      }]
    });
    return res.json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};


const getKelasById = async (req, res) => {
  const userId = req.params.id;

  try {
    const result = await Kelas.findAll({
      where: { userId: userId },
      include: [{ model: User}],
    });
    return res.json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const getUsersByKelas = async (req, res) => {
  const { namaKelas } = req.params;

  if (namaKelas === "Kelas tidak ditemukan") {
    return res.status(404).json({ msg: "Kelas tidak ditemukan" });
  }

  try {
    const kelas = await Kelas.findOne({
      where: { nama: namaKelas },
    });

    if (kelas) {
      const users = await User.findAll({
        where: { id: kelas.userId },
      });

      return res.json(users);
    } else {
      return res.status(404).json({ msg: "Kelas tidak ditemukan" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

module.exports = { addKelas, getAllKelas, getKelasById, getUsersByKelas };
