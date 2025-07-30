const Main = document.getElementById("Main");
const Checking = document.getElementById("Checking");
const UsernameInput = document.getElementById("UsernameInput");
const PasswordInput = document.getElementById("PasswordInput");
const ErrorText = document.getElementById("ErrorText");
const Loading = document.getElementById("Loading");

UsernameInput.addEventListener("keydown", (key) => {
  if (key.key == "Enter") {
    PasswordInput.focus();
  }
});

PasswordInput.addEventListener("keydown", (key) => {
  if (key.key == "Enter") {
    SignIn();
  }
});

function containsUnallowedSymbol(str) {
  let allowedSymbols = "-_";
  let regex = new RegExp(
    `^[a-zA-Z0-9${allowedSymbols.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")}]*$`
  );

  // Return true if the string contains an unallowed symbol
  return !regex.test(str);
}

async function SignIn() {
  ErrorText.innerText = "";
  if (UsernameInput.value == "" || PasswordInput.value == "") {
    ErrorText.innerText = "Please Enter Your Username and Password";
    return;
  }
  Loading.style.display = "block";
  const response = await fetch("https://informare.weathersystem.org/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: UsernameInput.value.toLowerCase(),
      password: PasswordInput.value,
    }),
  });

  Loading.style.display = "none";

  if (response.status == 200) {
    Data = await response.json();
    localStorage.setItem("username", Data.username);
    localStorage.setItem("token", Data.token);
    window.location = "lunch.html";
  } else if (response.status == 401) {
    ErrorText.innerText = "Username or Password is Wrong";
  } else {
    ErrorText.innerText = `Error Occured. Error Code:${response.status}`;
  }
}

async function CheckIfCanLogIn() {
  if (
    localStorage.getItem("username") == null ||
    localStorage.getItem("token") == null
  ) {
    localStorage.clear();
    console.log("No Saved");
  } else {
    Main.style.display = "none";
    Checking.style.display = "block";

    const response = await fetch(
      "https://informare.weathersystem.org/checkifloggedin",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: localStorage.getItem("username"),
          token: localStorage.getItem("token"),
        }),
      }
    );

    if (response.status == 200) {
      window.location = "lunch.html";
    } else {
      localStorage.clear();
      Checking.style.display = "none";
      Main.style.display = "block";
    }
  }
}

CheckIfCanLogIn();
