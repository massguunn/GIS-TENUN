const express = require("express");
const router = express.Router();
const gisController = require("../controller/controller-gis");
const detailController = require("../controller/controller-detail");
const alatMusikController = require("../controller/controller-alat-musik");
const detailAlatMusikController = require("../controller/controller-detail-ms");

router.get("/", gisController.gis); // untuk halaman daftar GIS
router.get("/detail/:id", detailController.detail);
router.get("/alatMusik", alatMusikController.alatMusik);
router.get("/detailAlatMusik/:id", detailAlatMusikController.detailAlatMusik);

module.exports = router;
