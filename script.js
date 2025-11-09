document.addEventListener('DOMContentLoaded', () => {
  const backToTop = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    console.log('ScrollY =', window.scrollY);
    if(window.scrollY > 300) backToTop.classList.add('show');
    else backToTop.classList.remove('show');
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('nav-menu');
  toggle.addEventListener('click', () => menu.classList.toggle('show'));

  const form = document.getElementById('inscription-form');
  const statut = document.getElementById('statut');
  const priceDisplay = document.getElementById('price-display');
  const paypalContainer = document.getElementById('paypal-button-container');
  let montant = 0;
  paypalContainer.style.display = 'none';

  statut.addEventListener('change', () => {
    montant = parseFloat(statut.value || 0);
    priceDisplay.textContent = montant ? montant.toFixed(2) + ' €' : '—';
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nom = document.getElementById('nom').value.trim();
    const prenom = document.getElementById('prenom').value.trim();
    const email = document.getElementById('email').value.trim();
    if (!nom || !prenom || !email || !montant) {
      alert("Merci de remplir tous les champs et de choisir un statut !");
      return;
    }
    paypalContainer.style.display = 'block';
    paypalContainer.innerHTML = '';

    paypal.Buttons({
      style: { color: 'blue', shape: 'pill', label: 'pay', height: 45 },
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [{
            description: "Adhésion Club de Pétanque (" + nom + " " + prenom + ")",
            amount: { value: montant.toFixed(2) }
          }]
        });
      },
      onApprove: (data, actions) => {
        return actions.order.capture().then(details => {
          alert("Merci " + details.payer.name.given_name + "! Ton paiement de " + montant + " € a bien été reçu.");
        });
      }
    }).render('#paypal-button-container');
  });

  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  if(localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
  }

  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    if(body.classList.contains('dark-mode')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  });

  const icon = document.getElementById('icon');
  icon.addEventListener('click', () => {
    location.reload();
  });
});
