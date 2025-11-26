async function CheckAccount() {
  const response = await fetch(
    "https://informareapi.weathersystem.org/checkifloggedin",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: localStorage.getItem("username"),
        token: localStorage.getItem("token"),
      }),
    }
  );

  if (response.ok) {
    const Data = await response.json();
    return Data;
  } else {
    return false;
  }
}

async function HandleBanPage(Data) {
  console.log(Data);
  localStorage.setItem("Status", Data["Status"]);
  localStorage.setItem("Date", Data["Expire_Date"]);
  localStorage.setItem("Reason", Data["Reason"]);
  if (localStorage.getItem("Banseen") == false || Data["Status"] == "All") {
    window.location = "ban.html";
  }
}

async function MainVerify() {
  const Data = await CheckAccount();
  if (Data == true || Data == false) {
    localStorage.setItem("BanSeen", false);
    localStorage.removeItem("Status");
    localStorage.removeItem("Date");
    localStorage.removeItem("Reason");
    if (!Data) {
      localStorage.clear();
      window.location = "signin.html";
    }
  } else {
    await HandleBanPage(Data);
  }
}

MainVerify();
