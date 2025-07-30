if (
  localStorage.getItem("username") == null ||
  localStorage.getItem("token") == null
) {
  localStorage.clear();
  window.location = "signin.html";
}
