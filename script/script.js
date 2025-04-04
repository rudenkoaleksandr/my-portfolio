document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("btnToggle");
  const manuIcon = document.getElementById("manu-icon");
  const hamburgerMenuButton = document.getElementById("hamburger-menu-button");

  manuIcon.addEventListener("click", function () {
    document.querySelectorAll(".hamburger-menu").forEach(function (menu) {
      menu.style.bottom = "17px";
    });
  });

  hamburgerMenuButton.addEventListener("click", function () {
    document.querySelectorAll(".hamburger-menu").forEach(function (menu) {
      menu.style.bottom = "-100%";
    });
  });

  toggle.addEventListener("change", function () {
    document.querySelectorAll(".price").forEach((priceElement) => {
      let termElement = priceElement.querySelector(".term");
      if (!termElement) return;

      let termText = termElement.textContent.trim();
      let value = priceElement.textContent.replace(/[^0-9.]/g, "");
      let number = parseFloat(value);

      if (!isNaN(number)) {
        let targetValue;

        if (termText === "/ month") {
          targetValue = number * 12 * 0.75;
          animatePriceChange(priceElement, number, targetValue, "/ year");
        } else if (termText === "/ year") {
          targetValue = number / 0.75 / 12;
          animatePriceChange(priceElement, number, targetValue, "/ month");
        }
      }
    });
  });

  function animatePriceChange(priceElement, startValue, targetValue, term) {
    const duration = 1000; // тривалість анімації в мілісекундах
    const startTime = performance.now();

    function updatePrice(currentTime) {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const currentValue = startValue + (targetValue - startValue) * progress;

      priceElement.innerHTML = `$${currentValue.toFixed(
        2
      )} <span class="term">${term}</span>`;

      if (progress < 1) {
        requestAnimationFrame(updatePrice);
      }
    }

    requestAnimationFrame(updatePrice);
  }
});
