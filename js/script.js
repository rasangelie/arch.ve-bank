"use strict";

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const accounts = [account1, account2];

/**Login */
const userLogin = document.querySelector(".navbar__user--input").value;
const userPin = Number(
  document.querySelector(".navbar__password--input").value
);
const loginBtn = document.querySelector(".navbar__btn");

/**Main Container */
const containerApp = document.querySelector(".app");

/**Welcome and Card Container */
const welcomeMessage = document.querySelector(".app__welcome");
const overallBalance = document.querySelector(".app__balance--value");

/**Dashboard- Movements */
const movementsContainer = document.querySelector(".movements");
const movementsType = document.querySelector(".movements__type");
const movementsDetail = document.querySelector(".movements__details");
const movementsAmount = document.querySelector(".movements__amount");

/**In, Out, Interest */
const summaryIn = document.querySelector(".summary__total--in");
const summaryOut = document.querySelector(".summary__total--out");
const summaryInterest = document.querySelector(".summary__total--interest");

/**Transactions */
const transferTo = document.getElementById("transfer-to").value;
const transferAmount = Number(document.getElementById("transfer-amount").value);
const requestAmount = Number(document.getElementById("request-amount").value);
const closeUser = document.getElementById("confirm-user").value;
const closePin = Number(document.getElementById("confirm-pin").value);

const transferBtn = document.querySelector(".transaction__btn--transfer");
const requestBtn = document.querySelector(".transaction__btn--request");
const closeBtn = document.querySelector(".transaction__btn--close");

//Display Movements
const displayMovements = (mov) => {
  movementsContainer.innerHTML = "";
  mov.forEach((mov, i) => {
    // console.log(`${curr}, ${index}`);

    const type = mov > 0 ? "deposit" : "withdrawal";
    const message =
      mov > 0
        ? "You deposited money successfully."
        : "You withdrew money successfully.";
    const html = `
    <div class="movements__row">
          <div class="movements__flex">
            <div class="movements__left-flex">
              <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type.toUpperCase()}</div>
              <div class="movements__date">10/21/2024</div>
            </div>

            <div class="movements__details">
              ${message}
            </div>
          </div>

          <div class="movements__amount">PHP ${mov}</div>
        </div>
    
    `;

    movementsContainer.insertAdjacentHTML("afterbegin", html);
  });
};

displayMovements(account1.movements);

//Display overall balance
const calcDisplayBalance = (mov) => {
  const balance = mov.reduce((acc, mov) => {
    return acc + mov;
  }, 0);

  overallBalance.innerHTML = `PHP ${balance}`;
};

calcDisplayBalance(account1.movements);

//Creating username
const createUsername = (acc) => {
  acc.forEach((acc) => {
    acc.username = acc.owner.toLowerCase().split(" ")[0];
  });
};

createUsername(accounts);
// console.log(accounts);

//Calculating IN,OUT, INTEREST

const summaryCalculation = (mov) => {
  //Ins
  const ins = mov
    .filter((mov) => {
      return mov > 0;
    })
    .reduce((acc, mov) => {
      return acc + mov;
    }, 0);

  summaryIn.innerHTML = `PHP ${ins}`;

  //Out
  const out = mov
    .filter((mov) => {
      return mov < 0;
    })
    .reduce((acc, mov) => {
      return acc + mov;
    }, 0);

  summaryOut.innerHTML = `PHP ${out}`;

  //Interest
};

summaryCalculation(account1.movements);
