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
let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
  // Cegah prompt otomatis
  e.preventDefault();
  deferredPrompt = e;

  // Tampilkan tombol install
  const installBtn = document.getElementById("installPWA");
  if (installBtn) installBtn.style.display = "inline-block";

  installBtn.addEventListener("click", () => {
    installBtn.style.display = "none";
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted install");
      } else {
        console.log("User dismissed install");
      }
      deferredPrompt = null;
    });
  });
});
