const TypeText = document.getElementById("Type");
const DateText = document.getElementById("Restoration");
const ReasonText = document.getElementById("Reason");

function HandleBanPage() {
  localStorage.setItem("BanSeen", true);

  TypeText.innerText = localStorage.getItem("Status");
  DateText.innerText = localStorage.getItem("Date");
  ReasonText.innerText = localStorage.getItem("Reason");

  if (localStorage.getItem("Status") == "All") {
    const MenuButton = document.getElementById("MenuButton");
    MenuButton.style.display = "none";
  }
}

HandleBanPage();
