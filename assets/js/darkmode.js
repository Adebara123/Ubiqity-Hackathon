"use strict";
// Targetting of classes and id
const toggle = document.getElementById("toggler");
const theme = document.querySelector(".theme");
const element = document.querySelector(".styling");
const icon = document.querySelector(".icon");

// function for toggling of color
const color = () => {
  element.classList.contains("Color-toggle")
    ? (theme.style.color = "black")
    : (theme.style.color = "white");
};

// function for toggling of text
const textDisplayed = () => {
  element.classList.contains("Color-toggle")
    ? (theme.textContent = "Dark theme")
    : (theme.textContent = "Light theme");
};

// function for toggling of icon
const icons = () => {
  icon.innerHTML = "";
  element.classList.contains("Color-toggle")
    ? (icon.innerHTML = `<i class="fa-solid fa-moon"></i>`)
    : (icon.innerHTML = `<i class="fa-solid fa-moon" style= color:white></i>`);
};

// Events for controlling the toggle button
toggle.addEventListener("click", function () {
  element.classList.toggle("Color-toggle");
  textDisplayed();
  icons();
  color();
});
