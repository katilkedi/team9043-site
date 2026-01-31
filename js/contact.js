document.addEventListener('submit', function (e) {
  var form = e.target;
  if (form && form.id === 'contactForm') {
    e.preventDefault();

    var data = new FormData(form);

    fetch('https://formspree.io/f/mjggplqg', {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' }
    })
      .then(function (r) {
        if (r.ok) {
          form.reset();
          var m = document.getElementById('successMsg');
          if (m) {
            m.style.display = 'block';
            setTimeout(function () {
              m.style.display = 'none';
            }, 4000);
          }
        } else {
          alert('Hata oluştu ❌');
        }
      })
      .catch(function () {
        alert('Bağlantı hatası ❌');
      });
  }
});
