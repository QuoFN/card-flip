document.addEventListener("DOMContentLoaded", function () {
  const flipCard = document.getElementById("flipCard");
  const flipSound = new Audio("./sounds/woosh.mp3");

  if (flipCard) {
    flipCard.addEventListener("click", function () {
      this.classList.toggle("flipped");
      flipSound.play();
      clearTimeout(flipCard.returnTimer);
      if (this.classList.contains("flipped")) {
        flipCard.returnTimer = setTimeout(() => {
          this.classList.remove("flipped");
        }, 10000);
      }
    });
  }
});
