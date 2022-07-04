const express = require("express");
const router = express.Router();
const compute = require("../service/computation");
const compute2 = require("../service/computation2");

router.route("/compute2").post(compute2);
router.route("/compute").post(compute);
module.exports = router;
