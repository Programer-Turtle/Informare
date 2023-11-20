let amount_of_work = 0;

function addgoal() {
  // Get input
  var goal = document.getElementById("goal_input").value;
  document.getElementById("goal_input").value = "";

  amount_of_work++;
  localStorage.setItem("goal_" + amount_of_work, goal);
  localStorage.setItem("amount", amount_of_work);
  update_list();
}

function update_list() {
  amount_of_work = get_amount_of_assignments();
  var myDiv = document.getElementById("list");
  myDiv.innerHTML = '';

  for (var i = 1; i <= amount_of_work; i++) {
    var newDiv = document.createElement("div");
    newDiv.id = i;
    newDiv.className = "assignment_bar";
    newDiv.style = "display: flex;";
    myDiv.appendChild(newDiv);
    var newp = document.createElement("p");
    
    // Retrieve the goal using the unique key
    var goalKey = "goal_" + i;
    var goalValue = localStorage.getItem(goalKey);
    
    newp.innerHTML = goalValue;
    newDiv.appendChild(newp);

    var newbutton = document.createElement("button");
    newbutton.innerHTML = "<p>X</p>";

    // Use an anonymous function to capture the correct goalKey reference
    newbutton.onclick = (function(key, div) {
      return function() {
        // Remove the value from local storage
        localStorage.removeItem(key);
        
        // Adjust the values of the remaining data
        for (var j = parseInt(div.id) + 1; j <= amount_of_work; j++) {
          var nextKey = "goal_" + j;
          var nextValue = localStorage.getItem(nextKey);
          localStorage.setItem("goal_" + (j - 1), nextValue);
        }
        
        // Update the amount
        amount_of_work--;
        localStorage.setItem("amount", amount_of_work);

        // Remove the div
        div.parentNode.removeChild(div);

        // Update the list again
        update_list();
      };
    })(goalKey, newDiv);
    
    newDiv.appendChild(newbutton);
  }
}

function get_amount_of_assignments() {
  let amount = 0;
  if (localStorage.getItem("amount") != null) {
    amount = parseInt(localStorage.getItem("amount"));
  }
  return amount;
}

update_list();
