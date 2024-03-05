const breedSelect = document.getElementById("breedSelect");
const infoDump = document.getElementById("infoDump");
const progressBar = document.getElementById("progressBar");
const getFavouritesBtn = document.getElementById("getFavouritesBtn");

const API_KEY = "live_g2GvgDMFMzTjUoJnU2yXmoWC07vsgLWRfJIKVYHE5ZRFZEVvOdxbajuueo1sHiAm";

async function initialLoad() {
  try {
    const response = await fetch('https://api.thecatapi.com/v1/breeds');
    const breeds = await response.json();

    breeds.forEach((breed) => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });
  } catch (error) {
    console.error('Error fetching or processing data:', error);
  }
}

async function fetchBreedInformation(selectedBreedId) {
  try {
    progressBar.style.display = "block";
    infoDump.innerHTML = "";

    const response = await fetch(`https://api.thecatapi.com/v1/breeds/${selectedBreedId}`);
    const breedData = await response.json();

    progressBar.style.display = "none";
    console.log("Breed Information:", breedData);

    const breedInfo = document.createElement("div");
    breedInfo.innerHTML = `<h2>${breedData.name} Information</h2>
        <p>Description: ${breedData.description}</p>
        <p>Temperament: ${breedData.temperament}</p>`;
    infoDump.appendChild(breedInfo);
  } catch (error) {
    console.error("Error fetching breed information:", error);
  }
}

async function fetchBreedImages(selectedBreedId) {
  try {
    progressBar.style.display = "block";
    clearCarousel();
    clearInfoDump();

    const response = await fetch(`https://api.thecatapi.com/v1/images/search?breed_id=${selectedBreedId}&limit=1`);
    const imageDataArray = await response.json();

    progressBar.style.display = "none";
    populateCarousel(imageDataArray);
    updateInfoDump(selectedBreedId);
  } catch (error) {
    console.error("Error fetching breed images:", error);
  }
}

function clearCarousel() {
  document.getElementById("carouselInner").innerHTML = "";
}

function clearInfoDump() {
  infoDump.innerHTML = "";
}

function populateCarousel(imageDataArray) {
  const carouselInner = document.getElementById("carouselInner");
  carouselInner.innerHTML = "";

  imageDataArray.forEach((imageData, index) => {
    const carouselItem = document.createElement("div");
    carouselItem.classList.add("carousel-item");

    const imageElement = document.createElement("img");
    imageElement.src = imageData.url;
    imageElement.alt = `Image ${index + 1} of ${getSelectedBreedName()}`;
    carouselItem.appendChild(imageElement);

    carouselInner.appendChild(carouselItem);
  });
}

function getSelectedBreedName() {
  const selectedIndex = breedSelect.selectedIndex;
  return selectedIndex >= 0 ? breedSelect.options[selectedIndex].text : "Unknown Breed";
}

function updateInfoDump(selectedBreedId) {
  // Add logic here to update the infoDump based on the selectedBreedId
  console.log("Updating infoDump for breed:", selectedBreedId);
}

function start() {
  const multipleCardCarousel = document.querySelector("#carouselExampleControls");

  if (window.matchMedia("(min-width: 768px)").matches) {
  } else {
    $(multipleCardCarousel).addClass("slide");
  }
}

// Call the start function after initialLoad
initialLoad().then(start);

breedSelect.addEventListener("change", async () => {
  const selectedBreedId = breedSelect.value;
  await fetchBreedInformation(selectedBreedId);
});

breedSelect.addEventListener("change", async () => {
  const selectedBreedId = breedSelect.value;
  await fetchBreedImages(selectedBreedId);
});


