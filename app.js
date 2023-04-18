const { sequelize } = require("./models");
const express = require("express");
const app = express();
const port = 3000;
const userRouter = require("./routes/userRouter")
const kelasRouter = require("./routes/kelasRouter")
const pembayaranRouter = require("./routes/pembayaranRouter")
const pengumumanRouter = require("./routes/pengumumanRouter")
const authRouter = require("./routes/authRouter")

// async function main() {
//   await sequelize.sync();
// }

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
