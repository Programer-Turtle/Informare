const MessageText = document.getElementById("Message");
const EditButton = document.getElementById("EditButton");
const Loading = document.getElementById("Loading");
const View = document.getElementById("View");
const Edit = document.getElementById("Edit");
const DateInput = document.getElementById("Date");
const EditInput = document.getElementById("EditMessage");
const EditLoading = document.getElementById("EditLoading");
const SubmitButton = document.getElementById("SubmitButton");
const EditError = document.getElementById("EditError");

async function CheckIfMessanger() {
  const response = await fetch(
    "https://informareapi.weathersystem.org/CheckForPermission",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: localStorage.getItem("username"),
        token: localStorage.getItem("token"),
        permission: "Daily_Messenger",
      }),
    }
  );

  if (response.status == 200) {
    const data = await response.json();
    if (data) {
      EditButton.style.display = "block";
    }
  }
}

async function GetMessage() {
  const response = await fetch(
    "https://informareapi.weathersystem.org/GetDailyMessage",
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
  Loading.style.display = "none";
  if (response.status == 200) {
    const data = await response.json();
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-CA");
    console.log(data);
    console.log(formattedDate);
    const TodaysMessage = data[formattedDate];
    if (TodaysMessage) {
      MessageText.innerText = TodaysMessage;
    } else {
      MessageText.innerText =
        "A message has not been posted for today. Maybe check back later.";
    }
  } else {
    MessageText.style.color = "red";
    MessageText.innerText =
      "An error occured. You may be banned from this service.";
  }
}

async function EditMessage() {
  EditError.innerText = "";
  SubmitButton.style.display = "none";
  EditLoading.style.display = "block";

  if (DateInput.value == "") {
    EditError.innerText = "Please Enter a Date";
    SubmitButton.style.display = "block";
    EditLoading.style.display = "none";
    return;
  }

  const response = await fetch(
    "https://informareapi.weathersystem.org/AddDailyMessage",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: localStorage.getItem("username"),
        token: localStorage.getItem("token"),
        Message: EditInput.value,
        Date: DateInput.value,
      }),
    }
  );

  if (response.status == 200) {
    location.reload();
  } else {
    EditError.innerText = "An Error Occured";
    SubmitButton.style.display = "block";
    EditLoading.style.display = "none";
  }
}

function ShowEditView() {
  View.style.display = "none";
  Edit.style.display = "flex";
}

function ShowView() {
  Edit.style.display = "none";
  View.style.display = "flex";
}

GetMessage();
CheckIfMessanger();
