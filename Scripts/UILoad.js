const Background = document.createElement("div");
Background.className = "BackgroundHolder";
document.body.appendChild(Background);

const Overlay = document.createElement("div");
Overlay.className = "overlay";
document.body.insertBefore(Overlay, document.body.firstChild);

const NavBar = document.createElement("div");
NavBar.className = "NavBar";
document.body.insertBefore(NavBar, document.body.firstChild);
if (localStorage.getItem("username")) {
  NavBar.innerHTML = `
<div style="display: flex; align-items: center">
  <a href="signin.html">
    <img src="Images/logo.png" style="width: 70px; margin: 10px" />
  </a>
  <p class="navbutton" onclick="ShowSideBar()" style="margin-right: 3rem; margin-left: auto">Menu</p>
</div>
`;
} else {
  NavBar.innerHTML = `
<div style="display: flex; align-items: center">
  <a href="signin.html">
    <img src="Images/logo.png" style="width: 70px; margin: 10px" />
  </a>
</div>
`;
}

const SideBar = document.createElement("div");
SideBar.className = "sidebar";
SideBar.innerHTML = `
<p class="navbutton" onclick="HideSideBar()">Back</p>
<p class="navbutton" onclick="LoadPage('lunch.html')">Lunch</p>
<p class="navbutton" onclick="LoadPage('patchnotes.html')">Patch Notes</p>
<!-- <p class="navbutton" onclick="LoadPage('homework.html')">Homework</p> -->
<p class="navbutton" onclick="LoadPage('dailymessage.html')">Daily Message</p>
<p class="navbutton" onclick="LogOut()">Log Out</p>
`;
document.body.insertBefore(SideBar, NavBar);

SideBar.classList.add("offscreen");

async function ShowSideBar() {
  document.body.style.overflow = "hidden";
  Overlay.style.display = "block";
  SideBar.classList.remove("offscreen");
}

async function HideSideBar() {
  Overlay.style.display = "none";
  SideBar.classList.add("offscreen");
  document.body.style.overflow = "scroll";
}

function LoadPage(url) {
  window.location = url;
}

function LogOut() {
  localStorage.clear();
  window.location = "signin.html";
}
