// === FORMULAIRE INSCRIPTION + PAYPAL ===
const form = document.getElementById('inscription-form');
const statut = document.getElementById('statut');
const priceDisplay = document.getElementById('price-display');
const paypalContainer = document.getElementById('paypal-button-container');
let montant = 0;

// Cache le bouton PayPal au départ
paypalContainer.style.display = "none";

// Mise à jour dynamique du prix
statut.addEventListener('change', () => {
  montant = parseFloat(statut.value || 0);
  priceDisplay.textContent = montant ? montant.toFixed(2) + " €" : "—";
});

// Validation du formulaire
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const nom = document.getElementById('nom').value.trim();
  const prenom = document.getElementById('prenom').value.trim();
  const email = document.getElementById('email').value.trim();

  if (!nom || !prenom || !email || !montant) {
    alert("Merci de remplir tous les champs et de choisir un statut !");
    return;
  }

  // Si tout est bon → afficher PayPal
  paypalContainer.style.display = "block";
  paypalContainer.innerHTML = "";

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

  window.scrollTo({
    top: paypalContainer.offsetTop - 100,
    behavior: 'smooth'
  });
});
