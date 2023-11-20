let menu = ["Papa Johns Pizza", "Chicken-N-Dumplings", "Hamb/Cheese", "Saturday", "Sunday", "Mozzarella Cheese Sticks", "Chili Cheese Dog", "Calzones", "Salisbury Steak", "French Bread", "Saturday", "Sunday", "Taco Pita Pocket", "Turkey Manhattan", "Chicken Patty", "Papa Johns Pizza", "Mini Corn Dogs", "Saturday", "Sunday", "Popcorn Chicken", "Calzones", "ThanksGiving Break", "Happy Thanksgiving", "ThanksGiving Break", "Saturday", "Sunday", "Calzones", "Buffalo Dip/Chips", "Papa Johns Pizza", "Spaghetti/Meatballs"];
let grade = ["45", "44", "15", "N/A", "N/A", "60", "N/A", "22", "44", "N/A", "N/A", "N/A", "50", "N/A", "60", "45", "34", "N/A", "N/A", "44.5", "22", "N/A", "N/A", "N/A", "N/A", "N/A", "22", "0", "45", "52"];
var date = new Date();
var day = date.getDate() - 1;
let finalgrade = grade[day];

if (finalgrade === "schoolnull")
{
    window.location.href = "noschool.html";
}

if (finalgrade == 60)
{
    document.getElementById("grade").style.textShadow = "0 0 10px yellow, 0 0 20px gold, 0 0 30px goldenrod";
    document.getElementById("grade").style.color = "yellow";
}

if (finalgrade <= 59 & finalgrade >= 51)//completed
{
    document.getElementById("grade").style.textShadow = "0 0 10px rgb(0, 255, 0), 0 0 20px rgb(0, 245, 0), 0 0 30px rgb(0, 155, 32)";
    document.getElementById("grade").style.color = "rgb(0, 255, 0)";
}

if (finalgrade <= 50 & finalgrade >= 41)//completd
{
    document.getElementById("grade").style.textShadow = "0 0 10px rgb(145, 233, 0), 0 0 20px rgb(145, 223, 0), 0 0 30px rgb(145, 133, 32)";
    document.getElementById("grade").style.color = "rgb(145, 233, 0)";
}

if (finalgrade <= 40 & finalgrade >= 31)//completed
{
    document.getElementById("grade").style.textShadow = "0 0 10px rgb(196, 186, 0), 0 0 20px rgb(196, 176, 0), 0 0 30px rgb(196, 86, 32)";
    document.getElementById("grade").style.color = "rgb(196, 186, 0)";
}

if (finalgrade <= 30 & finalgrade >= 21) //completed
{
    document.getElementById("grade").style.textShadow = "0 0 10px rgb(229, 145, 0), 0 0 20px rgb(229, 135, 0), 0 0 30px rgb(229, 45, 32)";
    document.getElementById("grade").style.color = "rgb(229, 145, 0)";
}

if (finalgrade <= 20 & finalgrade >= 11)//completed
{
    document.getElementById("grade").style.textShadow = "0 0 10px rgb(249, 96, 0), 0 0 20px rgb(249, 86, 0), 0 0 30px rgb(249, 6, 32)";// 1:same color; 2:same color, -10, samecolor; 3:same color, -90, +32;
    document.getElementById("grade").style.color = "rgb(249, 96, 0)";
}

if (finalgrade <= 10 & finalgrade >= 0)
{
    document.getElementById("grade").style.textShadow = "0 0 10px rgb(255, 0, 0), 0 0 20px rgb(255, 10, 0), 0 0 30px rgb(255, 100, 32)";
    document.getElementById("grade").style.color = "rgb(255, 0, 0)";
}

document.getElementById("Item").innerHTML = menu[day];
document.getElementById("grade").innerHTML = finalgrade + "/60";

// Assuming `menu` and `grade` are arrays and have the same length
for (var i = 0; i < menu.length; i++) {
    // Create the main div
    var newDiv = document.createElement("div");
    if (day == i)
    {
        newDiv.className = "schedulebox-CurrentDay";
    }else
    {
        newDiv.className = "schedulebox";
    }
    //Create grid Div
    var newGrid = document.createElement("div");
    newGrid.className = "grid";

    //Create DateBox
    var DateBox = document.createElement("div");
    DateBox.className = "DateBox";
    
    //Create DateBoxText
    var DateBoxText = document.createElement("p");
    DateBoxText.className = "scheduletextbold";
    DateBoxText.innerHTML = i + 1;
    
    // Create the center divs
    var newCenter = document.createElement("div");
    newCenter.className = "center";

    var newCenter2 = document.createElement("div");
    newCenter2.className = "center";

    var newCenter3 = document.createElement("div");
    newCenter3.className = "center";

    var newCenter4 = document.createElement("div");
    newCenter4.className = "center";

    // Create the menu header
    var newP = document.createElement("p");
    newP.className = "scheduletext";
    newP.innerHTML = "Item";

    // Create the menu text
    var newP2 = document.createElement("p");
    newP2.className = "scheduletext";
    newP2.innerHTML = menu[i];

    // Create the grade header
    var newP3 = document.createElement("p");
    newP3.className = "scheduletext";
    newP3.innerHTML = "Grade";

    // Create the grade text
    var newP4 = document.createElement("p");
    newP4.className = "scheduletext";
    newP4.innerHTML = grade[i];

    //Append DateBoxText to DateBox and Append DateBox to newGrid
    DateBox.appendChild(DateBoxText);
    newGrid.appendChild(DateBox);
    newGrid.appendChild(newP);
    // Append the center div to the main div
    newDiv.append(newGrid, newCenter2, document.createElement("br"), newCenter3, newCenter4);

    // Append the paragraphs to the center div
    newCenter2.appendChild(newP2);
    newCenter3.appendChild(newP3);
    newCenter4.appendChild(newP4);

    // Append the main div to the calendar container
    document.getElementById("calender").appendChild(newDiv); // Ensure that "calender" is the correct ID
}