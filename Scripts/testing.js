const TestStart = document.getElementById("TestStart");
const TestArea = document.getElementById("TestArea");
const TestResults = document.getElementById("TestResults");
const TestName = document.getElementById("TestName");
const TimeText = document.getElementById("TimeText");
const Timer = document.getElementById("Timer");
const ScoreText = document.getElementById("ScoreText");
const PercentText = document.getElementById("PercentText");
const Letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const QuestionCount = document.getElementById("QuestionCount");
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
let data;
let TotalQuestions;
let CorrectAnswers;
let Duration;
let CurrentQuestion = 0;
let interval;

function ShowQuestion() {
  const QuestHolders = document.querySelectorAll(".QuestionHolder");
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
  CurrentQuestion += 1;
  ShowQuestion();
}

function Submit() {
  clearInterval(interval);
  const answers = [];

  for (
    let i = 0;
    i < document.querySelectorAll(".QuestionHolder").length;
    i++
  ) {
    const selected = document.querySelector(`input[name="${i}"]:checked`);

    if (selected) {
      answers.push(selected.value);
    } else {
      answers.push(null);
    }
  }

  console.log(answers);
  let GradedAnswers = [];
  let CorrectCount = 0;
  for (let i = 0; i < answers.length; i++) {
    const CorrectAnswer = CorrectAnswers[i];
    const SelectedAnswer = answers[i];
    const Correct = SelectedAnswer == CorrectAnswer;
    if (Correct) {
      CorrectCount += 1;
    }
    GradedAnswers.push({
      Correct: Correct,
      CorrectAnswer: CorrectAnswer,
      SelectedAnswer: SelectedAnswer,
    });
  }
  console.log(GradedAnswers);
  TestArea.style.display = "none";
  TestResults.style.display = "block";
  console.log(`${CorrectCount}/${TotalQuestions}`);
  ScoreText.innerText = `${CorrectCount}/${TotalQuestions}`;
  PercentText.innerText = `${Math.round((CorrectCount / TotalQuestions) * 100)}%`;

  const Questions = data["questions"];
  for (let i = 0; i < Questions.length; i++) {
    const CurrentQuestion = Questions[i];
    const QuestionHolder = document.createElement("div");
    QuestionHolder.className = "QuestionHolder";
    QuestionHolder.style.display = "block";
    QuestionHolder.innerHTML = `<h1>${i + 1}. ${CurrentQuestion["question"].replace(/\\n/g, "<br>")}</h1>`;

    for (let x = 0; x < CurrentQuestion["options"].length; x++) {
      const CurrentOption = CurrentQuestion["options"][x];
      const OptionText = document.createElement("h1");
      OptionText.innerHTML = `${Letters[x]}) ${CurrentOption.replace(/\\n/g, "<br>")}`;
      if (!GradedAnswers[i]["Correct"]) {
        if (Letters.indexOf(GradedAnswers[i]["SelectedAnswer"]) == x) {
          OptionText.style.color = "red";
        }
      }

      if (Letters.indexOf(GradedAnswers[i]["CorrectAnswer"]) == x) {
        if (GradedAnswers[i]["SelectedAnswer"]) {
          OptionText.style.color = "green";
        } else {
          OptionText.style.color = "blue";
        }
      }
      QuestionHolder.appendChild(OptionText);
    }

    TestResults.appendChild(QuestionHolder);
  }
}

async function GetTest() {
  const response = await fetch(`Data/Tests/${id}.json`);
  if (!response.ok) {
    return;
  }
  data = await response.json();
  TestName.innerText = data["name"];
  Duration = data["time"] * 60 * 1000;
  TimeText.innerText = `Time: ${data["time"]} minutes`;
  TotalQuestions = data["questions"].length;
  QuestionCount.innerText = `${TotalQuestions} Questions`;
  CorrectAnswers = data["answers"];

  for (let i = 0; i < data["questions"].length; i++) {
    const Question = data["questions"][i];
    const QuestionHolder = document.createElement("div");
    QuestionHolder.className = "QuestionHolder";
    QuestionHolder.id = `Question${i}`;

    if (Question["image"]) {
      QuestionHolder.innerHTML += `<div class="center"><img src="Data/Tests/${Question["image"]}" style="width:70%"></div>`;
    }

    QuestionHolder.innerHTML += `<h1>${i + 1}. ${Question["question"].replace(/\\n/g, "<br>")}</h1>`;
    let RadioHTML = `<div class="RadioHolder">`;
    for (let x = 0; x < Question["options"].length; x++) {
      const Option = Question["options"][x].replace(/\\n/g, "<br>");
      RadioHTML += `<div class="OptionHolder"><input type="radio" name="${i}" value="${Letters[x]}" /><h1>${Letters[x]}) ${Option}</h1></div>`;
    }
    RadioHTML += `</div>`;
    let ButtonHTML = `<div class="right">`;
    if (i != 0) {
      ButtonHTML += `<button onclick="Back()"><h1>Back</h1></button>`;
    }
    if (i != data["questions"].length - 1) {
      ButtonHTML += `<button onclick="Next()"><h1>Next</h1></button>`;
    } else {
      ButtonHTML += `<button onclick="Submit()"><h1>Submit</h1></button>`;
    }
    ButtonHTML += "</div>";
    QuestionHolder.innerHTML += RadioHTML + ButtonHTML;
    TestArea.appendChild(QuestionHolder);
  }
}

GetTest();

async function StartTest() {
  TestStart.style.display = "none";
  TestArea.style.display = "block";

  ShowQuestion();
  const StartTime = Date.now();
  interval = setInterval(() => {
    const Elapsed = Date.now() - StartTime;
    const Remaining = Duration - Elapsed;
    if (Remaining <= 0) {
      Submit();
      return;
    }

    const Minutes = Math.floor(Remaining / 60000);
    const Seconds = Math.floor((Remaining % 60000) / 1000);
    Timer.innerText = `${Minutes.toString().padStart(2, "0")}:${Seconds.toString().padStart(2, "0")}`;
  }, 1);
}
