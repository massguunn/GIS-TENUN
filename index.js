const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3001;
const appRoutes = require("./src/routes/router-app");

// Serve folder uploads secara statis
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// untuk render gambar pada db
app.get("/image/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const [result] = await db.query("SELECT gambar FROM data_GB WHERE id = ?", [
      id,
    ]);

    if (result.length > 0) {
      const imageBuffer = result[0].gambar;

      // Cek tipe file secara otomatis (pastikan gambar adalah buffer)
      const type = await FileType.fromBuffer(imageBuffer);
      if (type) {
        res.set("Content-Type", type.mime);
      } else {
        res.set("Content-Type", "application/octet-stream");
      }

      res.send(imageBuffer);
    } else {
      res.status(404).send("Image not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Middleware untuk menyajikan file statis dari folder 'public'
app.use(express.static(path.join(__dirname, "public")));
console.log("Serving static files from:", path.join(__dirname, "public"));

// Setting folder views dan engine EJS
app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs");

// Route untuk halaman home
app.get("/", (req, res) => {
  res.render("home"); // akan mencari index.ejs di dalam src/views
});

app.use("/gis", appRoutes);
app.use("/", appRoutes);
app.use("/alatMusik", appRoutes); // tambahkan ini agar route /detail/:id aktif secara global

app.use((req, res, next) => {
  res.locals.url = req.protocol + "://" + req.get("host");
  next();
});

// Menjalankan server
// app.listen(PORT, () => {
//   console.log(`Server berjalan di http://localhost:${PORT}`);
// });

app.listen(3001, "0.0.0.0", () => {
  console.log("Server berjalan di http://0.0.0.0:3001");
});
