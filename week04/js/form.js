// Task 1: Annual Membership Cost Display
const tierRadios = document.querySelectorAll('input[name="tier"]');
const annualCostMessage = document.getElementById('annual-cost-message');

function updateAnnualCost(radio) {
  const monthlyPrice = Number(radio.dataset.monthlyPrice);
  const annualPrice = monthlyPrice * 12;

  if (annualPrice === 0) {
    annualCostMessage.textContent = 'Annual cost: $0 - the Community tier is free.';
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


// Task 2: Show / Hide Password Toggle
const passwordInput = document.getElementById('password');

const showPasswordLabel = document.createElement('label');
showPasswordLabel.className = 'show-password-label';

const showPasswordCheckbox = document.createElement('input');
showPasswordCheckbox.type = 'checkbox';
showPasswordCheckbox.id = 'show-password-checkbox';

showPasswordLabel.append(showPasswordCheckbox, ' Show password');
passwordInput.insertAdjacentElement('afterend', showPasswordLabel);

showPasswordCheckbox.addEventListener('change', function (event) {
  if (event.target.checked) {
    passwordInput.type = 'text';
  } else {
    passwordInput.type = 'password';
  }
});