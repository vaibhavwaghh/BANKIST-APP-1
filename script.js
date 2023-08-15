"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

const account1 = {
  owner: "vaibhav",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-07-26T17:01:17.194Z",
    "2020-07-28T23:36:17.929Z",
    "2020-08-01T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "wagh",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
let currentAccount, transferAccount, currentBalance, timer;
vaibhav2(accounts);
const allBankDetails = document.querySelector(".bank-details");
const statement = document.querySelector(".statement");
const tdeposit = document.querySelector(".k1");
const twithdrawl = document.querySelector(".k2");
const tinterest = document.querySelector(".k3");
const element = document.querySelector(".container-2-1");
const balance = document.querySelector(".amount");
const username = document.querySelector(".user");
const password = document.querySelector(".password");
const transferTo = document.querySelector("#input1");
const amountt = document.querySelector("#input2");
const closeAccName = document.querySelector("#close-acc-name");
const closeAccPin = document.querySelector("#close-acc-pin");
const loan = document.querySelector("#loan");
const button = document.querySelector(".button");
const button2 = document.querySelector("#button-1");
const button3 = document.querySelector("#button-3");
const button4 = document.querySelector("#button-2");
const button5 = document.querySelector(".button-5");
const currentDateTime = document.querySelector(".present-date-time");
const timerr = document.querySelector(".timeee");
button.addEventListener("click", mmm);
button2.addEventListener("click", lll);
button3.addEventListener("click", nnn);
button4.addEventListener("click", ooo);
button5.addEventListener("click", ppp);

function setTimer() {
  function tick() {
    const min = String(Math.trunc(time / 60)).padStart(2, "0");
    const sec = String(Math.trunc(time % 60)).padStart(2, "0");
    timerr.innerHTML = `${min}:${sec}`;
    if (time === 0) {
      clearInterval(timer);
      allBankDetails.style.opacity = 0;
      statement.innerHTML = "Welcome to the bank !";
    }
    time--;
  }
  let time = 10 * 60;
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
}
function mmm() {
  const date = new Date();
  const options = {
    hour: "numeric",
    minute: "numeric",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  currentDateTime.innerHTML = `As of ${new Intl.DateTimeFormat(
    "en-US",
    options
  ).format(date)}`;
  currentAccount = accounts.find((acc) => acc.owner === username.value);

  if (currentAccount?.pin == Number(password.value)) {
    allBankDetails.style.opacity = 100;
    password.blur();
    statement.innerHTML = `Welcome back , ${
      currentAccount.owner.split(" ")[0]
    } !`;
    username.value = "";
    password.value = "";
    updateUI();
    console.log(timer);
    if (timer) {
      clearInterval(timer);
    }
    timer = setTimer();
  }
}

function lll() {
  transferAccount = accounts.find((acc) => acc.owner === transferTo.value);
  if (
    transferTo.value !== currentAccount.owner &&
    amountt.value > 0 &&
    currentBalance > amountt.value
  ) {
    transferAccount.movements.push(Number(amountt.value));
    currentAccount.movements.push(-Number(amountt.value));
    currentAccount.movementsDates.push(new Date().toISOString());
    transferAccount.movementsDates.push(new Date().toISOString());
    updateUI();
    transferTo.value = "";
    amountt.value = "";
    console.log(transferAccount);
  }
}
function nnn() {
  if (
    currentAccount.owner === closeAccName.value &&
    currentAccount.pin === Number(closeAccPin.value)
  ) {
    const index = accounts.findIndex(
      (acc) => acc.owner === currentAccount.owner
    );
    console.log(index);
    accounts.splice(index, 1);
    console.log(accounts);
    closeAccName.value = "";
    closeAccPin.value = "";
    allBankDetails.style.opacity = 0;
  }
}
function ooo() {
  const loanAmount = loan.value;
  if (
    loanAmount > 0 &&
    currentAccount.movements.some((mov) => mov >= loanAmount * 0.1)
  ) {
    setTimeout(() => {
      currentAccount.movementsDates.push(new Date().toISOString());
      currentAccount.movements.push(Math.floor(loan.value));
      updateUI();
      loan.value = "";
    }, 3000);
  }
}
let sorting = true;
function ppp() {
  vaibhav1(currentAccount, !sorting);
  sorting = !sorting;
}
function updateUI() {
  vaibhav1(currentAccount);
  calcBalance(currentAccount);
  calcDisplaySummary(currentAccount);
}
function formatMov(acc, value) {
  const options = {
    style: "currency",
    currency: acc.currency,
  };
  const formattedMov = new Intl.NumberFormat(acc.locale, options).format(value);
  return formattedMov;
}
function vaibhav1(acc, sort) {
  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;
  console.log(movs);
  element.innerHTML = " ";
  movs.forEach(vpw);
  function vpw(item, i) {
    const displayDate = displayDatee(acc, i);
    const displayDays = displayDaysAgo(acc, i);
    const type = item > 0 ? "deposit" : "withdrawl";
    const html = ` <div class="container-2-1-1">
    <div class="cont">
      <p class="${type}">${i + 1} ${type}</p>
     <span>${displayDate}</span>
     <span>${displayDays}</span>
    </div>
    <div>${formatMov(acc, item)} </div>
  </div>
`;
    element.insertAdjacentHTML("afterbegin", html);
  }
}
function displayDatee(acc, i) {
  const date = new Date(acc.movementsDates[i]);
  const datee = date.getDate();
  let datestr = datee.toString();
  if (datestr.length == 1) {
    datestr = "0" + datestr;
  }
  // console.log(datestr);

  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${datestr}/${month}/${year}`;
}
function displayDaysAgo(acc, i) {
  const datee1 = new Date().getDate();
  const datee2 = new Date(acc.movementsDates[i]).getDate();
  const dateDifference = Math.abs(datee1 - datee2);
  if (dateDifference == 0) {
    return `(Today)`;
  }
  if (dateDifference == 1) {
    return `(Yesterday)`;
  }
  return `(${dateDifference} days ago)`;
}

function calcBalance(acc) {
  currentBalance = acc.movements.reduce(m, 0);
  function m(acc, curr, i) {
    return acc + curr;
  }
  balance.innerHTML = `${formatMov(acc, currentBalance)}`;
}

function vaibhav2(accs) {
  accs.map(m);
  function m(item) {
    item.username = item.owner.toLowerCase().split(" ").map(k).join("");
  }
  function k(item) {
    return item[0];
  }
}

function calcDisplaySummary(acc) {
  const totalDeposit = acc.movements
    .filter((item) => item > 0)
    .reduce((acc, item) => acc + item);
  tdeposit.innerHTML = `${formatMov(acc, totalDeposit)}  `;
  const totalWithdrawl = acc.movements
    .filter((item) => item > 0)
    .reduce((acc, item) => acc + item);
  twithdrawl.innerHTML = `${formatMov(acc, totalWithdrawl)}`;
  const totalInterest = acc.movements
    .filter((item) => item > 0)
    .map((item, i) => (item * 1.2) / 100)
    .filter((item) => item > 1)
    .reduce((acc, item) => acc + item);
  tinterest.innerHTML = `${formatMov(acc, totalInterest)} `;
}
// const arr = ["vpw", "vkw"];
// const timer = setTimeout(
//   (per1, per2) => console.log(`${per1} and ${per2} this side`),
//   3000,
//   ...arr
// );
// console.log("thambloy laudyya");
// if (arr.includes("vrw")) {
//   clearTimeout(timer);
// }
// setInterval(function () {
//   const date = new Date();
//   console.log(date);
// }, 1000);
console.log("vaibhav is great");
