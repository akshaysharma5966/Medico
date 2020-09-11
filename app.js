const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");

// routes
const memberRoutes = require("./routes/member");
const doctorRoutes = require("./routes/doctor");
const medicineRoutes = require("./routes/medicine");
const diagnoloticsRoutes = require("./routes/diagnolotic");
const cartRoutes = require("./routes/cart");
const healthAssistRoutes = require("./routes/health_assist");

const app = express();
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});

app.use(multer({ storage: fileStorage }).single("image"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.set("useFindAndModify", false);

// remove CORS erros
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Headers", "Content-Type", "Authorization");
  next();
});

app.use(memberRoutes);
app.use(doctorRoutes);
app.use(medicineRoutes);
app.use(diagnoloticsRoutes);
app.use(cartRoutes);
app.use(healthAssistRoutes);

mongoose
  .connect(
    "mongodb+srv://medico:oexUB6vZ7Zv614YI@cluster0.lhnty.mongodb.net/medico?retryWrites=true&w=majority"
  )
  .then((result) => {
    console.log(result);
    app.listen(8080);
  })
  .catch((err) => console.log(err));
