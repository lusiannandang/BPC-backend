const csvToJson = require("convert-csv-to-json");
let json = csvToJson.getJsonFromCsv("./Dataset.csv");
// console.log(json);

const trainingData = json;
// console.log(trainingData);
// Definisi atribut-atribut
const attributes = ["lamaLatihan", "jumlahPrestasi", "waktuGayaBebas", "gayaDikuasai", "jarakLatihan"];

// Fungsi untuk menghitung entropy
function calculateEntropy(data, targetAttribute) {
  const target = data.map((row) => row[targetAttribute]);
  const total = target.length;
  const counts = target.reduce((acc, val) => {
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {});
  const probabilities = Object.values(counts).map((count) => count / total);
  const entropy = probabilities.reduce((sum, prob) => sum - prob *  Math.log2(prob), 0);
  return entropy;
}

// Fungsi untuk menghitung gain information
function calculateInformationGain(data, attribute, targetAttribute) {
  const attributeValues = [...new Set(data.map((row) => row[attribute]))];
  const total = data.length;
  const entropyParent = calculateEntropy(data, targetAttribute);

  let entropyChildren = 0;
  attributeValues.forEach((val) => {
    const subsetData = data.filter((row) => row[attribute] === val);
    const subsetEntropy = calculateEntropy(subsetData, targetAttribute);
    const subsetWeight = subsetData.length / total;
    entropyChildren += subsetEntropy * subsetWeight;
  });

  const informationGain = entropyParent - entropyChildren;
  return informationGain;
}

// Fungsi untuk membangun decision tree
function buildDecisionTree(data, attributes, targetAttribute = "kelas") {
  const uniqueClasses = [...new Set(data.map((row) => row[targetAttribute]))];
  if (uniqueClasses.length === 1) {
    return { kelas: uniqueClasses[0] };
  }

  if (attributes.length === 0) {
    const target = data.map((row) => row[targetAttribute]);
    const counts = target.reduce((acc, val) => {
      acc[val] = (acc[val] || 0) + 1;
      return acc;
    }, {});
    const majorityClass = Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b));
    return { kelas: majorityClass };
  }

  const gains = attributes.map((attribute) => {
    const gain = calculateInformationGain(data, attribute, targetAttribute);
    return { attribute, gain };
  });

  console.log("Entropy:");
  gains.forEach((gain) => {
    console.log(`${gain.attribute}: Entropy=${calculateEntropy(data, targetAttribute)}`);
  });
  // , Gain=${gain.gain}
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
console.log("Decision Tree:", decisionTree);


// Fungsi untuk melakukan prediksi menggunakan decision tree
function predict(data, tree, targetAttribute) {
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
  return predict(data, nextTree, targetAttribute);
}

const targetAttribute = "kelas"; // Atribut target yang digunakan

const dataToPredict = {
  lamaLatihan: "> 1 tahun",
 jumlahPrestasi: "0",
 waktuGayaBebas: "< 1 menit",
 gayaDikuasai: "3-4'",
 jarakLatihan: "Memanjang"
};

const prediction = predict(dataToPredict, decisionTree, targetAttribute);
console.log("Prediction:", prediction);
