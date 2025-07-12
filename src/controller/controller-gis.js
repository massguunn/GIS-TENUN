const config = require("../configs/database");
const mysql = require("mysql");
const pool = mysql.createPool(config);

pool.on("error", (err) => console.error(err));

module.exports = {
  gis(req, res) {
    pool.query("SELECT * FROM data_GB", (err, results) => {
      if (err) {
        console.error("Gagal mengambil data:", err);
        return res.status(500).send("Gagal mengambil data dari database");
      }
      res.render("gis", { data: results });
    });
  },
};
