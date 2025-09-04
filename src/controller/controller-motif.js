const config = require("../configs/database");
const mysql = require("mysql");
const pool = mysql.createPool(config);

module.exports = {
  motif(req, res) {
    pool.query("SELECT * FROM tabel_motif", (err, result) => {
      if (err) {
        return res.status(500).send("Gagal mengambil data dari database");
      }
      res.render("motif", { data: result });
    });
  },
};
