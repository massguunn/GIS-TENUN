const config = require("../configs/database");
const mysql = require("mysql");
const pool = mysql.createPool(config);

module.exports = {
  detailMotif(req, res) {
    const id_motif = req.params.id;
    const sql = "SELECT * FROM tabel_motif WHERE id_motif = ?";
    pool.query(sql, [id_motif], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Gagal mengambil detail data");
      }
      if (result.length === 0) {
        return res.status(404).send("Data tidak ditemukan");
      }
      res.render("detailMotif", { item: result[0] });
    });
  },
};
