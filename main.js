const STORAGE_KEY = "releaseDate";

let storedDate = localStorage.getItem(STORAGE_KEY);
let releaseDate;

if (storedDate) {
  releaseDate = new Date(storedDate);
} else {
  releaseDate = new Date(storedDate);
  releaseDate = new Date();
  releaseDate.setDate(releaseDate.getDate() + 30);
  localStorage.setItem(STORAGE_KEY, releaseDate);
}

document.getElementById("release-date").textContent = releaseDate
  .toDateString()
  .slice(4);

function updateCountdown() {
  const now = new Date().getTime();
  const distance = releaseDate.getTime() - now;

  if (distance < 0) {
    document.querySelector(".countdown-container").innerHTML =
      "<p>We are live!</p>";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(
    2,
    "0"
  );
  document.getElementById("seconds").textContent = String(seconds).padStart(
    2,
    "0"
  );
}

updateCountdown();
setInterval(updateCountdown, 1000);
