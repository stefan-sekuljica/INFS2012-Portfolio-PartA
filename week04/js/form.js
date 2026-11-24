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


// Task 3: Textarea Character Counter
const commentsBox = document.getElementById('comments');

const charCounter = document.createElement('small');
charCounter.id = 'char-counter';
commentsBox.insertAdjacentElement('afterend', charCounter);

function updateCharCounter() {
  const count = commentsBox.value.length;
  if (count === 1) {
    charCounter.textContent = '1 character';
  } else {
    charCounter.textContent = count + ' characters';
  }
}

commentsBox.addEventListener('input', updateCharCounter);
updateCharCounter();


// Task 4: In-Page Error Validation Before Submit
const registrationForm = document.getElementById('registration-form');
const errorContainer = document.getElementById('error-container');

const fullNameInput = document.getElementById('fullname');
const emailInput = document.getElementById('email');
const usernameInput = document.getElementById('username');
const termsCheckbox = document.getElementById('terms');

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function checkField(field, isValid, message, errors) {
  if (isValid) {
    field.setCustomValidity('');
    field.removeAttribute('aria-invalid');
  } else {
    field.setCustomValidity(message);
    field.setAttribute('aria-invalid', 'true');
    errors.push(message);
  }
}

function showErrors(errors) {
  errorContainer.innerHTML = '';

  const heading = document.createElement('p');
  heading.textContent = 'Please fix the following before submitting:';
  errorContainer.appendChild(heading);

  const list = document.createElement('ul');
  errors.forEach(function (message) {
    const item = document.createElement('li');
    item.textContent = message;
    list.appendChild(item);
  });
  errorContainer.appendChild(list);

  errorContainer.hidden = false;
  errorContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function clearErrors() {
  errorContainer.innerHTML = '';
  errorContainer.hidden = true;
}

function handleFormSubmit(event) {
  const errors = [];

  checkField(fullNameInput, fullNameInput.value.trim().length >= 2,
    'Full Legal Name must be at least 2 characters.', errors);

  checkField(emailInput, emailPattern.test(emailInput.value.trim()),
    'Primary Email Address must be a valid email, e.g. user@domain.com.', errors);

  const usernameLength = usernameInput.value.trim().length;
  checkField(usernameInput, usernameLength >= 4 && usernameLength <= 20,
    'Preferred Username must be between 4 and 20 characters.', errors);

  checkField(passwordInput, passwordInput.value.length >= 8,
    'Account Password must be at least 8 characters.', errors);

  checkField(termsCheckbox, termsCheckbox.checked,
    'You must agree to the Terms of Service and Privacy Policy.', errors);

  if (errors.length > 0) {
    event.preventDefault();
    showErrors(errors);
  } else {
    clearErrors();
  }
}

registrationForm.addEventListener('submit', handleFormSubmit);

registrationForm.addEventListener('input', function (event) {
  if (event.target.hasAttribute('aria-invalid')) {
    event.target.setCustomValidity('');
    event.target.removeAttribute('aria-invalid');
  }
});

registrationForm.addEventListener('reset', function () {
  clearErrors();
  setTimeout(function () {
    updateCharCounter();
    passwordInput.type = 'password';
    const tierAfterReset = document.querySelector('input[name="tier"]:checked');
    if (tierAfterReset) {
      updateAnnualCost(tierAfterReset);
    }
  }, 0);
});