let menu = ["New Years", "No School", "No School", "Saturday", "Sunday", "Calzone", "Chicken Patty", "Hamb/Cheese", "Orange Chicken", "Quesadillas", "Saturday", "Sunday", "Mac and Cheese", "Popcorn Chicken", "Papa John’s", "Taco Salad", "Chili Cheese Dog", "Saturday", "Sunday", "No School", "Chicken Strips", "Buffalo Chicken", "Loaded Baked Potatoes", "Hamb/Cheese", "Saturday", "Sunday", "Chicken Tornado", "Chicken & Dumplings", "Papa John’s", "BBQ Riblet", "Cheese Sticks"]
let grade = ["N/A", "N/A", "N/A", "N/A", "N/A", "22", "60", "15", "42.5", "45", "N/A", "N/A", "38", "44.5", "45", "51", "26", "N/A", "N/A", "N/A", "44", "N/A", "54", "15", "N/A", "N/A", "44", "44", "45", "42", "58"]
var date = new Date();
var day = date.getDate() - 1;
let finalgrade = grade[day];

if (finalgrade === "schoolnull")
{
    window.location.href = "noschool.html";1
}

if (finalgrade == 60)
{
    document.getElementById("grade").style.textShadow = "0 0 10px lime, 0 0 20px green, 0 0 30px green";
    document.getElementById("grade").style.color = "rgb(125, 249, 125)";
}

if (finalgrade <= 59 & finalgrade >= 51)
{
    document.getElementById("grade").style.textShadow = "0 0 10px rgb(201, 127, 251), 0 0 20px rgb(201, 137, 251), 0 0 30px rgb(201, 147, 281)";
    document.getElementById("grade").style.color = "rgb(201, 127, 251)";
}

if (finalgrade <= 50 & finalgrade >= 41)
{
    document.getElementById("grade").style.textShadow = "0 0 10px rgb(108, 198, 247), 0 0 20px rgb(108, 208, 247), 0 0 30px rgb(108, 218, 277)";
    document.getElementById("grade").style.color = "rgb(108, 198, 247)";
}

if (finalgrade <= 40 & finalgrade >= 31)
{
    document.getElementById("grade").style.textShadow = "0 0 10px rgb(143, 249, 249), 0 0 20px rgb(143, 259, 249), 0 0 30px rgb(143, 269, 279)";
    document.getElementById("grade").style.color = "rgb(143, 249, 249)";
}

if (finalgrade <= 30 & finalgrade >= 21) 
{
    document.getElementById("grade").style.textShadow = "0 0 10px rgb(255, 237, 165), 0 0 20px rgb(255, 247, 165), 0 0 30px rgb(255, 257, 195)";
    document.getElementById("grade").style.color = "rgb(255, 237, 165)";
}

if (finalgrade <= 20 & finalgrade >= 11)
{
    document.getElementById("grade").style.textShadow = "0 0 10px rgb(246, 159, 123), 0 0 20px rgb(246, 169, 123), 0 0 30px rgb(246, 179, 133)";
    document.getElementById("grade").style.color = "rgb(246, 159, 123)";
}

if (finalgrade <= 10 & finalgrade >= 0)
{
    document.getElementById("grade").style.textShadow = "0 0 10px rgb(254, 119, 119), 0 0 20px rgb(254, 129, 119), 0 0 30px rgb(254, 139, 32)";
    document.getElementById("grade").style.color = "rgb(254, 119, 119)";
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
