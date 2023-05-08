const sequelize = require("./config/db");
const express = require("express");
const app = express();
const port = 3000;
const userRouter = require("./routes/userRouter")
const kelasRouter = require("./routes/kelasRouter")
const pembayaranRouter = require("./routes/pembayaranRouter")
const pengumumanRouter = require("./routes/pengumumanRouter")
const authRouter = require("./routes/authRouter")

// sequelize.sync({ force: false }) // force: false akan menghindari penghapusan dan pembuatan ulang tabel jika sudah ada
//   .then(() => {
//     console.log('Sinkronisasi database berhasil!');
//   })
//   .catch((error) => {
//     console.error('Gagal melakukan sinkronisasi database:', error);
//   });

// main();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  next();
});

app.use(express.json());
app.use(userRouter);
app.use(kelasRouter);
app.use(pembayaranRouter);
app.use(pengumumanRouter);
app.use(authRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
