let privatecounter = 0; // Declare the variable outside the function

function addgoal() {
  // Get input
  var goal = document.getElementById("goal_input").value;
  document.getElementById("goal_input").value = "";

  // Uploads cookie
  document.cookie = `${privatecounter}=${goal}`;
  privatecounter++;
  update_list();
}

function update_list()
{
  let counter = 0;
  var myDiv = document.getElementById("list");

  while (myDiv.firstChild) 
  {
    myDiv.removeChild(myDiv.firstChild);
  }

  while (document.cookie.split(";")[counter] !== undefined)
  { 
    var newPara = document.createElement("p");

    // Add some text to the paragraph element
    var paraText = document.createTextNode(document.cookie.split(";")[counter].split("=")[1]);
    newPara.appendChild(paraText);

    // Add the new paragraph element to the div element
    myDiv.appendChild(newPara);
    
    counter++;
  }
}

update_list();
