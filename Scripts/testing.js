const TestStart = document.getElementById("TestStart");
const TestArea = document.getElementById("TestArea");
const TestName = document.getElementById("TestName");
const TimeText = document.getElementById("TimeText");
const Letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const QuestionCount = document.getElementById("QuestionCount");
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
let TimeIndex = 0;
let CurrentQuestion = 0;
let interval;

function ShowQuestion() {
  const QuestHolders = document.querySelectorAll(".QuestionHolder");
  console.log(QuestHolders);
  for (let i = 0; i < QuestHolders.length; i++) {
    QuestHolders[i].style.display = "none";
  }
  document.getElementById(`Question${CurrentQuestion}`).style.display = "block";
}

function Back() {
  CurrentQuestion -= 1;
  ShowQuestion();
}

function Next() {
  console.log("test");
  CurrentQuestion += 1;
  ShowQuestion();
}

async function GetTest() {
  const response = await fetch(`Data/Tests/${id}.json`);
  if (!response.ok) {
    return;
  }
  const data = await response.json();
  TestName.innerText = data["name"];
  TimeText.innerText = `Time: ${data["time"]} minutes`;
  QuestionCount.innerText = `${data["questions"].length} Questions`;

  for (let i = 0; i < data["questions"].length; i++) {
    console.log(data["questions"][i]);
    const Question = data["questions"][i];
    const QuestionHolder = document.createElement("div");
    QuestionHolder.className = "QuestionHolder";
    QuestionHolder.id = `Question${i}`;
    QuestionHolder.innerHTML = `<h1>${i + 1}. ${Question["question"]}</h1>`;
    let RadioHTML = `<div class="RadioHolder">`;
    for (let x = 0; x < Question["options"].length; x++) {
      const Option = Question["options"][x];
      RadioHTML += `<div class="OptionHolder"><input type="radio" name="${i}" id="" /><h1>${Letters[x]}) ${Option}</h1></div>`;
    }
    RadioHTML += `</div>`;
    let ButtonHTML = `<div class="right">`;
    if (i != 0) {
      ButtonHTML += `<button onclick="Back()"><h1>Back</h1></button>`;
    }
    if (i != data["questions"].length - 1) {
      ButtonHTML += `<button onclick="Next()"><h1>Next</h1></button>`;
    }
    ButtonHTML += "</div>";
    QuestionHolder.innerHTML += RadioHTML + ButtonHTML;
    console.log(ButtonHTML);
    TestArea.appendChild(QuestionHolder);
  }
}

GetTest();

async function StartTest() {
  TestStart.style.display = "none";
  TestArea.style.display = "block";

  ShowQuestion();

  interval = setInterval(() => {
    console.log(TimeIndex);
    TimeIndex += 1;
  }, 1);
}
