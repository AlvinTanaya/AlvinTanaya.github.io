if (!sessionStorage.getItem("presentStoragePointer")) {
  window.location.href = "index.html";
} else {
  const { title, image, description, address, time } = JSON.parse(
    sessionStorage.getItem("presentStoragePointer")
  );
  document.getElementById("dynamicTime").textContent = time;
  document.getElementById("dynamicAddress").textContent = address;

  document.querySelector(".home__img").setAttribute("src", image);
  document.querySelector(".home__description").textContent = description;
  document.querySelector(".home_title").textContent = title;
}
