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
const userLogin = document.querySelector(".navbar__user--input");
const userPin = document.querySelector(".navbar__password--input");
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
const transferTo = document.getElementById("transfer-to");
const transferAmount = document.getElementById("transfer-amount");
const requestAmount = document.getElementById("request-amount");
const closeUser = document.getElementById("confirm-user");
const closePin = document.getElementById("confirm-pin");

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

// displayMovements(account1.movements);

//Display overall balance
const calcDisplayBalance = (account) => {
  account.balance = account.movements.reduce((acc, mov) => {
    return acc + mov;
  }, 0);

  overallBalance.textContent = `PHP ${account.balance}`;
};

// calcDisplayBalance(account1.movements);

//Creating username
const createUsername = (acc) => {
  acc.forEach((acc) => {
    acc.username = acc.owner.toLowerCase().split(" ")[0];
  });
};

createUsername(accounts);

//Calculating IN,OUT, INTEREST

const summaryCalculation = (account) => {
  //Ins
  const ins = account.movements
    .filter((mov) => {
      return mov > 0;
    })
    .reduce((acc, mov) => {
      return acc + mov;
    }, 0);

  summaryIn.innerHTML = `PHP ${ins}`;

  //Out
  const out = account.movements
    .filter((mov) => {
      return mov < 0;
    })
    .reduce((acc, mov) => {
      return acc + mov;
    }, 0);

  summaryOut.innerHTML = `PHP ${out}`;

  //Interest;
  const interest = account.movements
    .filter((mov) => {
      return mov > 0;
    })
    .map((deposit) => {
      return (deposit * account.interestRate) / 100;
    })
    .filter((int, i, arr) => {
      //filter interest that is lower 1
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, mov) => {
      return acc + mov;
    }, 0);

  summaryInterest.innerHTML = `PHP ${interest}`;
};

// summaryCalculation(account1);

//Update UI function
const updateUi = (acc) => {
  displayMovements(acc.movements);
  calcDisplayBalance(acc);
  summaryCalculation(acc);
};

//////////////////////////
//Event Handlers
let currentAccount;

//Login Functionality
loginBtn.addEventListener("click", (e) => {
  e.preventDefault();

  //Find and check the currentUser if it fits
  currentAccount = accounts.find((acc) => {
    return acc.username === userLogin.value;
  });

  //Check if credential is correct then change the opacity
  if (currentAccount?.pin === Number(userPin.value)) {
    //Change the name
    welcomeMessage.innerHTML = `Good day, ${
      currentAccount.owner.split(" ")[0]
    }!`;

    //Change opacity
    containerApp.style.opacity = 100;

    //Clear fields
    userLogin.value = "";
    userPin.value = "";

    //Update UI
    updateUi(currentAccount);
  }

  console.log(currentAccount);
});

//User Transfer Money
transferBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const amount = Number(transferAmount.value);

  //Find the recipient
  const receiver = accounts.find((rec) => {
    return transferTo.value === rec.username;
  });

  //Check if currentAccount > 0, currentAccount not sending to him/herself, if sufficient
  if (
    currentAccount.balance > 0 &&
    currentAccount.balance >= amount &&
    receiver?.username !== currentAccount.username
  ) {
    // console.log("Transfer Valid");

    //Add negative movement to current user
    currentAccount.movements.push(-amount);

    //Add positive movement to recipient
    receiver.movements.push(amount);

    //Remove input in fields
    transferAmount.value = "";
    transferTo.value = "";

    //Update UI
    updateUi(currentAccount);
  }
});

//Request Money
requestBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const amountReq = Number(requestAmount.value);

  //Check any deposit > 10% of request
  if (
    amountReq > 0 &&
    currentAccount.movements.some((mov) => {
      return mov >= amountReq / 10;
    })
  ) {
    //Add positive movement to current user
    currentAccount.movements.push(amountReq);
  }

  //Remove input field
  requestAmount.value = "";

  //Update UI
  updateUi(currentAccount);
});
