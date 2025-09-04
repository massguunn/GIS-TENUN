const config = require("../configs/database");
const mysql = require("mysql");
const pool = mysql.createPool(config);

module.exports = {
  detail(req, res) {
    const id_pengerajin = req.params.id;

    // Query detail pengerajin
    const sqlPengerajin =
      "SELECT * FROM tabel_pengerajin WHERE id_pengerajin = ?";
    const sqlProduk =
      "SELECT * FROM tabel_produk WHERE id_pengerajin = ? ORDER BY id_produk DESC";

    pool.query(sqlPengerajin, [id_pengerajin], (err, resultPengerajin) => {
      if (err) {
        console.error("Error ambil detail pengerajin:", err);
        return res.status(500).send("Gagal mengambil detail pengerajin");
      }
      if (resultPengerajin.length === 0) {
        return res.status(404).send("Pengerajin tidak ditemukan");
      }

      // Kalau pengerajin ketemu, lanjut ambil produk
      pool.query(sqlProduk, [id_pengerajin], (err, resultProduk) => {
        if (err) {
          console.error("Error ambil produk pengerajin:", err);
          return res.status(500).send("Gagal mengambil produk pengerajin");
        }

        res.render("detail", {
          item: resultPengerajin[0], // data pengerajin
          produk: resultProduk, // list produk
        });
      });
    });
  },
};
