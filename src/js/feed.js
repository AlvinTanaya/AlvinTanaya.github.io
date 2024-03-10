var shareImageButton = document.querySelector("#install-button");
var createPostArea = document.querySelector("#create-post");

var sharedMomentsArea = document.querySelector("#shared-moments");

function openCreatePostModal() {
  if (deferredPrompt) {
    deferredPrompt.prompt();

    deferredPrompt.userChoice.then(function (choiceResult) {
      console.log(choiceResult.outcome);

      if (choiceResult.outcome === "dismissed") {
        console.log("User cancelled installation");
      } else {
        console.log("User added to home screen");
      }
    });

    deferredPrompt = null;
  }
}

shareImageButton.addEventListener("click", openCreatePostModal);

function createCard(data) {
  const articleElement = document.createElement("article");
  articleElement.className = "program__card";

  const shapeDiv = document.createElement("div");
  shapeDiv.className = "program__shape";

  const imgElement = document.createElement("img");
  imgElement.src = data.image;
  imgElement.alt = "program image";
  imgElement.className = "program__img";

  shapeDiv.appendChild(imgElement);
  articleElement.appendChild(shapeDiv);

  const titleElement = document.createElement("h3");
  titleElement.className = "program__title";
  titleElement.textContent = data.title;
  articleElement.appendChild(titleElement);

  const descriptionElement = document.createElement("p");
  descriptionElement.className = "program__description";
  descriptionElement.textContent = data.description;
  articleElement.appendChild(descriptionElement);

  const buttonElement = document.createElement("a");
  buttonElement.className = "program__button";
  buttonElement.addEventListener("click", function () {
    const url =
      "https://pwatest1-44b88-default-rtdb.asia-southeast1.firebasedatabase.app/detail" +
      data.id +
      ".json";

    const handleResponse = async (response) => {
      if (!response.ok) {
        throw new Error("Fetch error");
      }
      const detail = await response.json();
      sessionStorage.setItem("presentStoragePointer", JSON.stringify(detail));
      sessionStorage.setItem(data.id, JSON.stringify(detail));
      window.location.href = "card.html";
    };

    if (!sessionStorage.getItem(data.id)) {
      fetch(url)
        .then(handleResponse)
        .catch((error) => {
          window.location.href = "offline.html";
        });
    } else {
      sessionStorage.setItem(
        "presentStoragePointer",
        sessionStorage.getItem(data.id)
      );
      window.location.href = "detail.html";
    }
  });

  const iconElement = document.createElement("i");
  iconElement.className = "ri-arrow-right-line";
  buttonElement.appendChild(iconElement);
  articleElement.appendChild(buttonElement);

  document.getElementById("shared-moments").appendChild(articleElement);
}

function updateUI(data) {
  for (var i = 0; i < data.length; i++) {
    createCard(data[i]);
  }
}

var url =
  "https://pwatest1-44b88-default-rtdb.asia-southeast1.firebasedatabase.app/card.json";
var networkDataReceived = false;

fetch(url)
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    networkDataReceived = true;
    console.log("From web", data);
    var dataArray = [];
    for (var key in data) {
      dataArray.push(data[key]);
    }
    updateUI(dataArray);
  });

if ("indexedDB" in window) {
  readAllData("posts").then(function (data) {
    if (!networkDataReceived) {
      console.log("From cache", data);
      updateUI(data);
    }
  });
}
