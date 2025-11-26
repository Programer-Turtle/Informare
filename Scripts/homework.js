const ErrorText = document.getElementById("ErrorText");
const LoadingBox = document.getElementById("loading");
const HomeworkHolder = document.getElementById("HomeworkHolder");
const AddErrorText = document.getElementById("AddErrorText");
const AddLoading = document.getElementById("AddLoading");
const AddButton = document.getElementById("AddButton");
let HomeworkList = [];
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
    return data;
  } else {
    ErrorText.style.color = "red";
    ErrorText.innerText =
      "An error occured. You may be suspended from this service.";
  }
}

async function ShowHomework() {
  const HomeWorkBoxList = document.getElementsByClassName("HomeworkBox");
  for (let i = HomeWorkBoxList.length - 1; i >= 0; i--) {
    HomeWorkBoxList[i].remove();
  }
  LoadingBox.style.display = "none";
  if (HomeworkList.length == 0) {
    ErrorText.style.color = "white";
    ErrorText.innerText = "No Assignments Currently";
    return;
  }

  for (let i = 0; i < HomeworkList.length; i++) {
    const HomeworkBox = document.createElement("div");
    HomeworkBox.className = "HomeworkBox";
    HomeworkBox.id = i;
    const CurrentData = HomeworkList[i];
    const Name = CurrentData["AssignmentName"];
    const Points = CurrentData["AssignmentPoints"];
    const DueDate = CurrentData["DueDate"];
    const Notes = CurrentData["AssignmentNotes"];
    const WarnText = () => {
      const [y, m, d] = DueDate.split("-");
      const InputDate = new Date(y, m - 1, d);
      const Today = new Date();

      InputDate.setHours(0, 0, 0, 0);
      Today.setHours(0, 0, 0, 0);

      if (InputDate.getTime() === Today.getTime()) {
        return ["yellow", "Due Today"];
      } else if (InputDate < Today) {
        return ["red", "Passed Due"];
      } else {
        return ["", ""];
      }
    };

    const TextProp = WarnText();

    const NoteButtonDisplay = () => {
      if (Notes != "") {
        return "block";
      } else {
        return "none";
      }
    };
    HomeworkBox.innerHTML = `
      <h1>${Name}</h1>
      <p>${Points} Points</p>
      <p>${DueDate} <span style="color: ${TextProp[0]}">${
      TextProp[1]
    }</span></p>
      <div class="right">
        <button onclick="ToggleNotes('Notes${i}')" title="Show Notes" style="display:${NoteButtonDisplay()};">Notes</button>
        <button onclick="MarkDone(${i})" title="Mark Done">Mark Done</button>
      </div>
      <div id="Notes${i}" style="display:none;">
          <p>${Notes}</p>
        </div>
    `;

    HomeworkHolder.appendChild(HomeworkBox);
  }
}

function ToggleNotes(id) {
  const NoteBox = document.getElementById(id);
  if (NoteBox.style.display == "block") {
    NoteBox.style.display = "none";
  } else {
    NoteBox.style.display = "block";
  }
}

async function SetHomeworkList() {
  const response = await fetch(
    "https://informareapi.weathersystem.org/SetHomework",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: localStorage.getItem("username"),
        token: localStorage.getItem("token"),
        HomeworkData: HomeworkList,
      }),
    }
  );
}

async function MarkDone(index) {
  HomeworkList.splice(index, 1);
  await SetHomeworkList(HomeworkList);
  await ShowHomework();
}

async function AddHomework() {
  AddButton.style.display = "none";
  AddErrorText.innerText = "";
  AddLoading.style.display = "block";
  const Name = document.getElementById("AssignmentName").value;
  const Points = document.getElementById("Points").value;
  const DueDate = document.getElementById("DueDate").value;
  const Notes = document.getElementById("Notes").value;

  if (Name == "" || Points == "" || DueDate == "") {
    AddErrorText.innerText = "Name, Points, and Due Date are required fields.";
    AddButton.style.display = "block";
    AddLoading.style.display = "none";
    return;
  }
  HomeworkList.push({
    AssignmentName: Name,
    AssignmentPoints: Points,
    DueDate: DueDate,
    AssignmentNotes: Notes,
  });
  await SetHomeworkList();
  AddButton.style.display = "block";
  AddLoading.style.display = "none";
  await ShowHomework();
}

async function Main() {
  HomeworkList = await GetHomework();
  ShowHomework();
}

Main();
