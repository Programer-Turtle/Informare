const ErrorText = document.getElementById("ErrorText");

async function AppendAssignment(Name, Notes, Points, Date) {}

async function GetHomework() {
  const response = await fetch(
    "https://informareapi.weathersystem.org/GetHomework",
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
  if (response.status == 200) {
    const data = await response.json();
    if (data.length == 0) {
      ErrorText.innerText = "No Assignments Currently";
    }
    console.log(data);
  } else {
    ErrorText.style.color = "red";
    ErrorText.innerText = "An Error Occured";
  }
}

GetHomework();
