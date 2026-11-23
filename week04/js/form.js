// Task 1: Annual Membership Cost Display
const tierRadios = document.querySelectorAll('input[name="tier"]');
const annualCostMessage = document.getElementById('annual-cost-message');

function updateAnnualCost(radio) {
  const monthlyPrice = Number(radio.dataset.monthlyPrice);
  const annualPrice = monthlyPrice * 12;

  if (annualPrice === 0) {
    annualCostMessage.textContent = 'Annual cost: $0 – the Community tier is free.';
  } else {
    annualCostMessage.textContent = 'Annual cost: $' + annualPrice + ' per year.';
  }
}

tierRadios.forEach(function (radio) {
  radio.addEventListener('change', function (event) {
    updateAnnualCost(event.target);
  });
});

const checkedTier = document.querySelector('input[name="tier"]:checked');
if (checkedTier) {
  updateAnnualCost(checkedTier);
}