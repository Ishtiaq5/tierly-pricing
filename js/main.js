// Tierly — billing toggle with animated price swap
(function () {
  "use strict";

  var toggle = document.getElementById("billing-toggle");
  var labelMonthly = document.getElementById("label-monthly");
  var labelYearly = document.getElementById("label-yearly");
  var prices = Array.prototype.slice.call(document.querySelectorAll(".price"));
  var billNotes = Array.prototype.slice.call(document.querySelectorAll(".bill-note"));
  var yearly = false;

  function flipTo(next) {
    prices.forEach(function (price) {
      var amount = price.querySelector(".amount");
      amount.classList.add("is-flipping");
      window.setTimeout(function () {
        amount.textContent = next ? price.dataset.yearly : price.dataset.monthly;
        amount.classList.remove("is-flipping");
      }, 180);
    });
    billNotes.forEach(function (note) {
      note.textContent = next ? note.dataset.yearlyNote : note.dataset.monthlyNote;
    });
  }

  function setYearly(next) {
    if (next === yearly) return;
    yearly = next;
    toggle.setAttribute("aria-checked", next ? "true" : "false");
    toggle.setAttribute("aria-label", next ? "Switch to monthly billing" : "Switch to yearly billing");
    labelMonthly.classList.toggle("is-active", !next);
    labelYearly.classList.toggle("is-active", next);
    flipTo(next);
  }

  toggle.addEventListener("click", function () { setYearly(!yearly); });

  document.addEventListener("keydown", function (event) {
    if (event.key === "y" || event.key === "Y") setYearly(!yearly);
  });
})();
