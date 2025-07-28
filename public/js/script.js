let lastScrollTop = 0;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", function () {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    // Scroll ke bawah - sembunyikan navbar
    navbar.style.top = "-70px"; // asumsi tinggi navbar sekitar 70px
  } else {
    // Scroll ke atas - tampilkan navbar
    navbar.style.top = "0";
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Untuk Mobile atau scroll ke atas paling atas
});

window.addEventListener("load", () => {
  // Cek apakah user sudah pernah melihat alert sebelumnya
  if (!localStorage.getItem("pwa_alert_shown")) {
    setTimeout(() => {
      alert(
        "📲 Untuk pengalaman terbaik, tambahkan aplikasi ini ke layar utama Anda."
      );
      // Simpan status supaya tidak muncul terus
      localStorage.setItem("pwa_alert_shown", "yes");
    }, 1000);
  }
});
