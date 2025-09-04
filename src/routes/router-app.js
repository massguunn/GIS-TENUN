const express = require("express");
const router = express.Router();
const gisController = require("../controller/controller-gis");
const detailController = require("../controller/controller-detail");
const motifController = require("../controller/controller-motif");
const detailMotifController = require("../controller/controller-detail-motif");

router.get("/", gisController.gis); // untuk halaman daftar GIS
router.get("/detail/:id", detailController.detail);
router.get("/motif", motifController.motif);
router.get("/detailMotif/:id", detailMotifController.detailMotif);

module.exports = router;
