const express = require("express");
const type1Controllers = require("../controllers/type1Controllers");
const type2Controllers = require("../controllers/type2Controllers");

const router = express.Router();

router.post("/", type1Controllers.getFilteredData);

router.delete("/", type1Controllers.deleteFile);

router.post("/type2", type2Controllers.getFilteredData);

module.exports = router;
