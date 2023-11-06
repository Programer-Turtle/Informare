// if (localStorage.getItem("NewUpdateSeen") != document.getElementById("Version").innerText)
// {
//     document.getElementById("UI").style.display = "grid";
//     localStorage.setItem("NewUpdateSeen", document.getElementById("Version").innerText)
// }

function ClosePopUp() {
    var uiElement = document.getElementById("UI");
    var popupElement = document.getElementById("PopUp");

    // Start the scaling and opacity transition
    popupElement.innerHTML = null;
    popupElement.style.width = 0;
    uiElement.style.opacity = 0;

    // Add a one-time event listener for the transitionend event
    uiElement.addEventListener('transitionend', function(e) {
        // Make sure the event is for the opacity transition
        if (e.propertyName === 'opacity') {
            this.style.display = 'none';
            // Remove the event listener since it's no longer needed
            this.removeEventListener('transitionend', arguments.callee);
        }
    });
}
