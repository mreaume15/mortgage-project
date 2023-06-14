// console.log("Mortgage");

// Inputs / DOM Elements

const homeValue = document.getElementById("homeValue");
const downPayment = document.getElementById("downPayment");
const loanAmount = document.getElementById("loanAmount");
const interestRate = document.getElementById("interestRate");
const loanDuration = document.getElementById("loanDuration");

const form = document.getElementById("mortgage");

// console.log(homeValue, downPayment, loanAmount, interestRate, form);

downPayment.addEventListener("keyup", () => {
  loanAmount.value = homeValue.value - downPayment.value;

  var loanAmountValue = loanAmount.value;
  return loanAmountValue;
});

function calculateMortgage(loanAmount, interestRate, numberMonthlyPayments) {
  interestRate = percentageToDecimal(interestRate);
  function percentageToDecimal(percent) {
    return percent / 12 / 100;
  }

  numberMonthlyPayments = yearsToMonths(numberMonthlyPayments);
  function yearsToMonths(year) {
    return year * 12;
  }

  let mortgage =
    (interestRate * loanAmount) /
    (1 - Math.pow(1 + interestRate, -numberMonthlyPayments));

  console.log(mortgage);
  return parseFloat(mortgage.toFixed(2));
}

form.onsubmit = (e) => {
  e.preventDefault();
  validate();
  let loanAmount = homeValue.value - downPayment.value;

  let monthlyPayment = calculateMortgage(
    loanAmount,
    interestRate.value,
    loanDuration.value
  );

  document.getElementById("monthlyPayment").innerHTML = `$ ${monthlyPayment}`;
};

function validate() {
  if (
    homeValue.value === "" ||
    downPayment.value === "" ||
    interestRate.value === "" ||
    loanDuration.value === ""
  ) {
    let alert = document.createElement("div");
    alert.className = "btn red btn-large";
    alert.innerHTML = `<span>Complete all fields</span>`;
    alert.style.margin = ".5rem 35%";
    form.parentNode.insertBefore(alert, form);

    alert.onclick = () => alert.remove();

    setTimeout(() => alert.remove(), "3000");
  }
}
