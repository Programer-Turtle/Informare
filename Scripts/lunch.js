function isSafari() {
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}

const menu = [
  "No School",
  "Hamburger and Cheese",
  "Pizza",
  "Chicken and Noodles",
  "Chicken Chunks",
  "Saturday",
  "Sunday",
  "Loaded Fries",
  "Calzone",
  "Chicken Alfredo",
  "BBQ Beef Rib Sandwich",
  "Roasted Chicken Nuggets",
  "Saturday",
  "Sunday",
  "Corn Dogs",
  "Orange Chicken",
  "Torandos",
  "Chicken Buffalom Dip",
  "Calzone",
  "Saturday",
  "Sunday",
  "Hamburger and Cheese",
  "Pizza",
  "Ranch Chicken Wraps",
  "Mini Subs",
  "Boneless Pork Chop",
  "Saturday",
  "Sunday",
  "Quesadilla",
  "Crispy Chicken Patty",
];
const grade = [
  "N/A",
  "15",
  "49",
  "49",
  "N/A",
  "N/A",
  "N/A",
  "54",
  "22",
  "48",
  "42",
  "N/A",
  "N/A",
  "N/A",
  "34",
  "44.5",
  "44",
  "0",
  "22",
  "N/A",
  "N/A",
  "15",
  "49",
  "N/A",
  "45",
  "30",
  "N/A",
  "N/A",
  "45",
  "60",
];
const UpdateMonth = 9;
const MenuText = document.getElementById("MenuText");
const GradeText = document.getElementById("GradeText");
const Calendar = document.getElementById("Calendar");
const date = new Date();
const Month = date.getMonth() + 1;
const day = date.getDate() - 1;
console.log(Month);
let finalgrade = grade[day];

if (finalgrade === "schoolnull") {
  window.location.href = "noschool.html";
  1;
}

if (finalgrade == 60) {
  GradeText.style.textShadow = "0 0 10px lime, 0 0 20px green, 0 0 30px green";
  GradeText.style.color = "rgb(125, 249, 125)";
}

if ((finalgrade <= 59) & (finalgrade >= 51)) {
  GradeText.style.textShadow =
    "0 0 10px rgb(201, 127, 251), 0 0 20px rgb(201, 137, 251), 0 0 30px rgb(201, 147, 255)";
  GradeText.style.color = "rgb(201, 127, 251)";
}

if ((finalgrade <= 50) & (finalgrade >= 41)) {
  GradeText.style.textShadow =
    "0 0 10px rgb(108, 198, 247), 0 0 20px rgb(108, 208, 247), 0 0 30px rgb(108, 218, 255)";
  GradeText.style.color = "rgb(108, 198, 247)";
}

if ((finalgrade <= 40) & (finalgrade >= 31)) {
  GradeText.style.textShadow =
    "0 0 10px rgb(143, 249, 249), 0 0 20px rgb(143, 259, 249), 0 0 30px rgb(143, 255, 255)";
  GradeText.style.color = "rgb(143, 249, 249)";
}

if ((finalgrade <= 30) & (finalgrade >= 21)) {
  GradeText.style.textShadow =
    "0 0 10px rgb(255, 237, 165), 0 0 20px rgb(255, 247, 165), 0 0 30px rgb(255, 255, 195)";
  GradeText.style.color = "rgb(255, 237, 165)";
}

if ((finalgrade <= 20) & (finalgrade >= 11)) {
  GradeText.style.textShadow =
    "0 0 10px rgb(246, 159, 123), 0 0 20px rgb(246, 169, 123), 0 0 30px rgb(246, 179, 133)";
  GradeText.style.color = "rgb(246, 159, 123)";
}

if ((finalgrade <= 10) & (finalgrade >= 0)) {
  GradeText.style.textShadow =
    "0 0 10px rgb(254, 119, 119), 0 0 20px rgb(254, 129, 119), 0 0 30px rgb(254, 139, 32)";
  GradeText.style.color = "rgb(254, 119, 119)";
}

if (isSafari()) {
  GradeText.style.textShadow = "none";
}

MenuText.innerText = menu[day];
if (finalgrade != "N/A") {
  finalgrade += "/60";
} else {
  finalgrade = "No Grade Available";
}
GradeText.innerText = finalgrade;

if (Month != UpdateMonth) {
  console.log("test");
  MenuText.innerText = "Hasn't Been Updated This Month";
  GradeText.innerText = "";
} else {
  for (let index = 0; index < menu.length; index++) {
    const CurrentDay = index + 1;
    const CurrentMenuItem = menu[index];
    const CurrentGrade = grade[index];

    const CalendarBox = document.createElement("div");
    CalendarBox.className = "CalendarBox";

    const CalendarLabel = document.createElement("div");
    CalendarLabel.className = "CalendarLabel";
    CalendarLabel.innerHTML = `<p>${CurrentDay}</p>`;

    const CurrentItemText = document.createElement("p");
    CurrentItemText.innerText = CurrentMenuItem;
    const CurrentGradeText = document.createElement("p");
    if (CurrentGrade != "N/A") {
      CurrentGradeText.innerText = `${CurrentGrade}/60`;
    } else {
      CurrentGradeText.innerText = "No Grade";
    }

    CalendarBox.appendChild(CalendarLabel);
    CalendarBox.appendChild(CurrentItemText);
    CalendarBox.appendChild(CurrentGradeText);
    Calendar.appendChild(CalendarBox);
  }
}
