"use strict";

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
const movementsType = document.querySelector(".movements__type");
const movementsDetail = document.querySelector(".movements__details");
const movementsAmount = document.querySelector(".movements__amount");

/**In, Out, Interest, Sort */
const transferTo = document.getElementById("transfer-to").value;
const transferAmount = Number(document.getElementById("transfer-amount").value);
const requestAmount = Number(document.getElementById("request-amount").value);
const closeUser = document.getElementById("confirm-user").value;
const closePin = Number(document.getElementById("confirm-pin").value);

const transferBtn = document.querySelector(".transaction__btn--transfer");
const requestBtn = document.querySelector(".transaction__btn--request");
const closeBtn = document.querySelector(".transaction__btn--close");
