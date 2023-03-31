var privatecounter = 0; // Declare the variable outside the function

function addgoal() {
  // Get input
  var goal = document.getElementById("goal_input").value;
  console.log(goal);

  // Uploads cookie
  document.cookie = `${privatecounter}=${goal}`;
  privatecounter++;
}
var counter = 0;
while (document.cookie.split(";")[counter] !== undefined)
{
    var newPara = document.createElement("p");

    // Add some text to the paragraph element
    var paraText = document.createTextNode(document.cookie.split(";")[counter].split("=")[1]);
    newPara.appendChild(paraText);

    // Get the div element to add the new paragraph to
    var myDiv = document.getElementById("list");
    console.log(myDiv);

    // Add the new paragraph element to the div element
    myDiv.appendChild(newPara);
    console.log(newPara);

    counter++;
}