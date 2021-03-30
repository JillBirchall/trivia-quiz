const howToPlayLink = document.getElementById("howToPlayLink");
const howToPlayModal = document.getElementById("howToPlayModal");
const howToPlayCloseBtn = document.getElementById("howToPlayModalClose");
const aboutLink = document.getElementById("aboutLink");
const aboutModal = document.getElementById("aboutModal");
const aboutCloseBtn = document.getElementById("aboutModalClose");

howToPlayLink.addEventListener("click", () => {
  howToPlayModal.style.display = "flex";
});

howToPlayCloseBtn.addEventListener("click", () => {
  howToPlayModal.style.display = "none";
});

aboutLink.addEventListener("click", () => {
  aboutModal.style.display = "flex";
});

aboutCloseBtn.addEventListener("click", () => {
  aboutModal.style.display = "none";
});

//Close the modal is the user clicks outside the box
howToPlayModal.addEventListener("click", (e) => {
  if (e.target !== e.currentTarget) return;
  howToPlayModal.style.display = "none";
});

aboutModal.addEventListener("click", (e) => {
  if (e.target !== e.currentTarget) return;
  aboutModal.style.display = "none";
});
