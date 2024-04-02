const username = document.querySelector(".username");
const email = document.querySelector(".email");
const btn = document.querySelector(".btnButton");
const favoriteGame = document.querySelectorAll(".favoris");
const favorisValues = [];
const display = document.querySelector(".display");
btn.addEventListener("click", async (event) => {
  event.preventDefault();

  const selectedFrequency = document.querySelector("#frequency").value;

  const selectedGenre = document.querySelector("#favorite-genre").value;

  const devices = document.querySelector("#favoriteDevices").value;

  favoriteGame.forEach((input) => {
    favorisValues.push(input.value);
  });
  if (
    username.value.trim() === "" ||
    //email.value.trim() === "" ||
    selectedFrequency === "" ||
    selectedGenre === "" ||
    devices === ""
  ) {
    alert("veuillez remplir tous les champs");
    console.error("Veuillez remplir tous les champs du formulaire");
    return;
  }

  //fetch backend with post method
  const formData = {
    username: username.value,
    email: email.value,
    frequence: selectedFrequency,
    type: selectedGenre,
    support: devices,
    favorite: favorisValues,
  };
  try {
    const response = await fetch("https://backend-game-survey.vercel.app/users/register", {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
      console.error("Invalid email format");
      alert("invalid email format");
      return;
    }
    if (response.ok) {
      console.log("Data send");
      console.log(formData);
      username.value = "";
      email.value = "";
      document.querySelector("#frequency").value = "";
      document.querySelector("#favorite-genre").value = "";
      document.querySelector("#favoriteDevices").value = "";
      // Effacer les valeurs des champs de jeux favoris
      favoriteGame.forEach((input) => {
        input.value = "";
      });
      display.textContent = "Success";
      setTimeout(() => {
        display.textContent = "";
      }, 5000);
    } else {
      console.error("erreur:", response.status);
    }
  } catch (error) {
    console.error("requete error", error);
  }
});
