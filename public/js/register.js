let deferredPrompt;
const installBtn = document.getElementById("installBtn");

// Tangkap event beforeinstallprompt
window.addEventListener("beforeinstallprompt", (e) => {
  // Prevent default agar browser gak langsung munculkan prompt
  e.preventDefault();
  deferredPrompt = e;

  // Tampilkan tombol install (misalnya dengan display block)
  if (installBtn) installBtn.style.display = "block";
});

// Ketika tombol install diklik
if (installBtn) {
  installBtn.addEventListener("click", async () => {
    // Sembunyikan tombol install
    installBtn.style.display = "none";

    // Tampilkan prompt install
    deferredPrompt.prompt();

    // Tunggu pilihan user
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      console.log("User menerima install prompt");
    } else {
      console.log("User menolak install prompt");
    }

    deferredPrompt = null;
  });
}
