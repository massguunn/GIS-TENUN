// Navbar hide on scroll (opsional)
let lastScrollTop = 0;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", function () {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  navbar.style.top = scrollTop > lastScrollTop ? "-70px" : "0";
  lastScrollTop = Math.max(0, scrollTop);
});

// PWA Install Prompt
let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;

  const installBtn = document.getElementById("installPWA");
  if (installBtn) {
    installBtn.style.display = "inline-block";

    installBtn.addEventListener("click", () => {
      installBtn.style.display = "none";
      deferredPrompt.prompt();

      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("Aplikasi diinstal");
        } else {
          console.log("Instalasi dibatalkan");
        }
        deferredPrompt = null;
      });
    });
  }
});

// Register service worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/service-worker.js")
    .then((reg) => console.log("Service Worker Registered", reg.scope))
    .catch((err) => console.error("SW registration failed:", err));
}
