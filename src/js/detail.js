if (!sessionStorage.getItem("presentStoragePointer")) {
  window.location.href = "index.html";
} else {
  const { title, image, description } = JSON.parse(
    sessionStorage.getItem("presentStoragePointer")
  );
  document.querySelector(".home_title").textContent = title;
  document.querySelector(".home__img").setAttribute("src", image);
  document.querySelector(".home__description").textContent = description;
}
