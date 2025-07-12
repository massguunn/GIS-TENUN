const config = require("../configs/database");
const mysql = require("mysql");
const pool = mysql.createPool(config);

module.exports = {
  detailAlatMusik(req, res) {
    const id = req.params.id;
    const sql = "SELECT * FROM alat_musik WHERE id = ?";
    pool.query(sql, [id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Gagal mengambil detail data");
      }
      if (result.length === 0) {
        return res.status(404).send("Data tidak ditemukan");
      }
      res.render("detailAlatMusik", { item: result[0] });
    });
  },
};
