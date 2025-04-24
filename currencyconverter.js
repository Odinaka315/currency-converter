const dropList = document.querySelectorAll(".drop-list select"),
  fromCurrency = document.querySelector(".from select"),
  toCurrency = document.querySelector(".to select"),
  getBtn = document.querySelector("form button");

for (let i = 0; i < dropList.length; i++) {
  for (code in country_code) {
    let selected;
    if (i == 0) {
      selected = country_code[code] == "USD" ? "selected" : "";
    } else if (i == 1) {
      selected = country_code[code] == "NGN" ? "selected" : "";
    }
    let optionTag = `<option value="${country_code[code]}" ${selected}>${country_code[code]}</option>`;
    dropList[i].insertAdjacentHTML("beforeend", optionTag);
  }
  dropList[i].addEventListener("change", (e) => {
    loadFlag(e.target);
  });
}

function loadFlag(element) {
  for (code in country_code) {
    if (country_code[code] == element.value) {
      let imgTag = element.parentElement.querySelector("img");
      imgTag.src = `https://flagsapi.com/${code}/flat/64.png`;
    }
  }
}

window.addEventListener("load", () => {
  getExchangeRate();
});

getBtn.addEventListener("click", (e) => {
  e.preventDefault();
  getExchangeRate();
});

const exchangeIcon = document.getElementById("exchange-icon");
exchangeIcon.addEventListener("click", () => {
  let tempCode = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = tempCode;
  loadFlag(fromCurrency);
  loadFlag(toCurrency);
  getExchangeRate();
});
function getExchangeRate() {
  const amount = document.querySelector(".amount input");
  const exchangeRatetxt = document.getElementById("exchange-rate");
  let amountval = amount.value;
  if (amountval == "" || amountval == "0") {
    amount.value = "1";
    amountval = 1;
  }
  exchangeRatetxt.innerText = "Getting exchange rate...";
  let url = `https://v6.exchangerate-api.com/v6/b77afd1fe0f3b23e777dfba1/latest/${fromCurrency.value}`;
  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      let exchangeRate = result.conversion_rates[toCurrency.value];
      let totalExchangeRate = (amountval * exchangeRate).toFixed(2);

      exchangeRatetxt.innerText = `${amountval} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
    })
    .catch(() => {
      exchangeRatetxt.innerText = "something went wrong";
    });
}
