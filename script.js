const btn = document.querySelector("#btn");
const btnText = document.getElementById("btn-text");
const img = document.querySelector("#dogImg");
const downloadBtn = document.getElementById("download");
const downloadMenu = document.getElementById("menu-download");
const errorContainer = document.getElementById("error-container");
const errorMSG = document.getElementById("error-msg");
const retryBtn = document.getElementById("retry");
const spinner = document.getElementById("spinner");

let currentImageUrl = "";
let inFlight = false;
let lastFetch = 0;

async function fetchDogImage() {
  if (inFlight) return;
  const now = Date.now();
  if (now - lastFetch < 800) return;
  lastFetch = now;
  inFlight = true;
  showLoading(true);
  hideError();

  try {
    const response = await fetch("https://dog.ceo/api/breeds/image/random", { cache: "no-store" });
    if (!response.ok) throw new Error("Network error " + response.status);
    const data = await response.json();
    if (data.status !== "success" || !data.message) throw new Error("Bad response");

    currentImageUrl = data.message;
    img.src = currentImageUrl;
    img.alt = "Random dog image";
    downloadBtn.disabled = false;
  } catch (error) {
    showError(error.message || "Failed to fetch image");
    downloadBtn.disabled = true;
  } finally {
    showLoading(false);
    inFlight = false;
  }
}

function showLoading(on) {
  if (on) {
    spinner.classList.remove("hidden");
    btn.disabled = true;
    btnText.textContent = "Loading...";
  } else {
    spinner.classList.add("hidden");
    btn.disabled = false;
    btnText.textContent = "Generate";
  }
}

function showError(msg) {
  errorMSG.textContent = msg;
  errorContainer.classList.remove("hidden");
}

function hideError() {
  errorContainer.classList.add("hidden");
  errorMSG.textContent = "";
}

btn.addEventListener("click", () => {
  fetchDogImage();
});

retryBtn.addEventListener("click", () => {
  fetchDogImage();
});

downloadBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  if (downloadBtn.disabled) return;
  downloadMenu.classList.toggle("hidden");
});

document.addEventListener("click", (e) => {
  if (!downloadBtn.contains(e.target) && !downloadMenu.contains(e.target)) {
    downloadMenu.classList.add("hidden");
  }
});

downloadMenu.querySelectorAll('button[data-type]').forEach(button => {
  button.addEventListener('click', async () => {
    downloadMenu.classList.add("hidden");
    if (!currentImageUrl) {
      showError("No image to download");
      return;
    }
    try {
      const type = button.getAttribute("data-type");
      const response = await fetch(currentImageUrl, { mode: "cors" });
      if (!response.ok) throw new Error("Failed to fetch image for download");
      const blob = await response.blob();

      const ext = type === "jpeg" ? "jpg" : type;
      const mime = blob.type || `image/${ext}`;
      const fileName = `dog-image.${ext}`;

      const downloadLink = document.createElement('a');
      const objectUrl = window.URL.createObjectURL(new Blob([blob], { type: mime }));
      downloadLink.href = objectUrl;
      downloadLink.download = fileName;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      window.URL.revokeObjectURL(objectUrl);
    } catch (error) {
      showError("Download failed");
    }
  });
});

img.onerror = () => {
  showError("Failed to load image");
  downloadBtn.disabled = true;
};

fetchDogImage();
