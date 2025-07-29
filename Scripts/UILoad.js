const Background = document.createElement("div");
Background.className = "BackgroundHolder";
document.body.appendChild(Background);
const NavBar = document.createElement("div");
NavBar.className = "NavBar";
document.body.insertBefore(NavBar, document.body.firstChild);
NavBar.innerHTML = `
<div style="display:flex; align-items:center;">
    <a href="signin.html">
        <img src="Images/logo.png" style="width:70px; margin:10px;"/>
    </a>
    <p>Informare</p>
</div>
`;
