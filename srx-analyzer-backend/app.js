const express = require("express");
const multer = require("multer");

const defaultRoutes = require("./routes/defaultRoutes");
const logger = require("./logger");

let FILENAME, DESTINATION;

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  //
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  //
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  //
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use(express.json());

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    DESTINATION = "./logs/SRX/";
    cb(null, DESTINATION);
  },
  filename: (req, file, cb) => {
    if (file) {
      FILENAME = Date.now() + "-" + file.originalname;
      const path = DESTINATION + FILENAME;
      req.body.fullPath = JSON.stringify({ path });
      logger.info(`File saved ${path}`);
      cb(null, FILENAME);
    }
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "text/plain") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(
  multer({ storage: fileStorageEngine, fileFilter: fileFilter }).single("file")
);

app.use(defaultRoutes);

app.listen(8080, () => {
  logger.info("Running on PORT 8080");
});
