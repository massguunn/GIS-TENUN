const config = require("../configs/database");
const mysql = require("mysql");
const pool = mysql.createPool(config);

module.exports = {
  detail(req, res) {
    const id = req.params.id;
    const sql = "SELECT * FROM data_GB WHERE id = ?";
    pool.query(sql, [id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Gagal mengambil detail data");
      }
      if (result.length === 0) {
        return res.status(404).send("Data tidak ditemukan");
      }
      res.render("detail", { item: result[0] });
    });
  },
};
