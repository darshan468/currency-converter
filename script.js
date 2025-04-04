const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const result = document.getElementById("result");

// Replace with your actual API key
const API_KEY = "https://api.exchangerate-api.com/v4/latest/USD";

// Populate dropdowns
fetch(API_KEY)
  .then(res => res.json())
  .then(data => {
    const currencies = Object.keys(data.rates);
    currencies.forEach(currency => {
      fromCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
      toCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
    });
    fromCurrency.value = "USD";
    toCurrency.value = "EUR";
  });

function convertCurrency() {
  const amount = document.getElementById("amount").value;
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (!amount) {
    result.innerText = "Please enter an amount.";
    return;
  }

  fetch(`https://api.exchangerate-api.com/v4/latest/${from}`)
    .then(res => res.json())
    .then(data => {
      const rate = data.rates[to];
      const converted = (amount * rate).toFixed(2);
      result.innerText = `${amount} ${from} = ${converted} ${to}`;
    })
    .catch(() => {
      result.innerText = "Error fetching exchange rate.";
    });
}
