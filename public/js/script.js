// Navbar hide on scroll
let lastScrollTop = 0;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", function () {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  navbar.style.top = scrollTop > lastScrollTop ? "-70px" : "0";
  lastScrollTop = Math.max(0, scrollTop);
});

let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;

  // Tampilkan toast install
  const toastEl = document.getElementById("pwaToast");
  const toast = new bootstrap.Toast(toastEl);
  toast.show();

  // Tangani tombol install
  const installBtn = document.getElementById("installToastBtn");
  installBtn.addEventListener("click", async () => {
    toast.hide();
    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      console.log("Aplikasi diinstal");
    } else {
      console.log("User menolak install");
    }

    deferredPrompt = null;
  });
});

// Register Service Worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/service-worker.js")
    .then((reg) => console.log("Service Worker Registered", reg.scope))
    .catch((err) => console.error("SW registration failed:", err));
}
