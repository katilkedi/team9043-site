async function loadComponent(id, file) {
  const res = await fetch(file);
  document.getElementById(id).innerHTML = await res.text();
}

(async function () {

  // Header & Footer
  await loadComponent("header", "components/header.html");
  await loadComponent("footer", "components/footer.html");

  // Contact section varsa
  if (document.getElementById("contact-section")) {
    await loadComponent("contact-section", "components/contact-section.html");
  }

  // ===== POPUP COMPONENT =====
  if (document.getElementById("popup")) {

    // sadece ilk girişte açılsın istiyorsan bu if kalsın
    // istemiyorsan localStorage satırlarını silebilirsin
    await loadComponent("popup", "components/popup.html");

    // Popup yüklendikten sonra göster
    const popupEl = document.getElementById("season-popup");
    if (popupEl) {
      // Küçük bir gecikme ile aktif et (animasyon için)
      setTimeout(() => {
        popupEl.classList.add("active");
      }, 700);

      // Kapatma butonu
      const closeBtn = popupEl.querySelector(".season-popup-close");
      if (closeBtn) {
        closeBtn.addEventListener("click", () => {
          popupEl.classList.remove("active");
        });
      }

      // Overlay'e tıklayınca kapat (kartın boş alanı)
      popupEl.addEventListener("click", (e) => {
        if (e.target.id === "season-popup") {
          popupEl.classList.remove("active");
        }
      });
    }
  }

  // ===== HER ŞEY YÜKLENDİ =====
  document.dispatchEvent(new Event("headerLoaded"));

})();
