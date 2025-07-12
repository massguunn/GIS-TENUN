const config = require("../configs/database");
const mysql = require("mysql");
const pool = mysql.createPool(config);

module.exports = {
  alatMusik(req, res) {
    pool.query("SELECT * FROM alat_musik", (err, result) => {
      if (err) {
        return res.status(500).send("Gagal mengambil data dari database");
      }
      res.render("alatMusik", { data: result });
    });
  },
};
