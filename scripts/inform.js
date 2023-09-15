let menu = ["Mini Corn Dog", "Saturday", "Sunday", "Labor Day", "Chicken Chunks", "Papa Johns", "Crispy Chicken legs", "Chili Cheese Coney", "Saturday", "Sunday", "Quesadilla", "Chicken Wings", "Cheesy Scrambled Eggs", "Mini Sub", "Hamburger/Cheese", "Saturday", "Sunday", "Loaded Fries", "Taco Pita Pocket", "Papa Johns", "Chicken, Bacon, Ranch", "Biscuit and Gravy", "Saturday", "Sunday", "Calzones", "Buffalo Dip", "Orange Chicken", "Chicken Patty", "BBQ Rib Sandwich", "Saturday", "Sunday"];
let grade = ["34", "N/A", "N/A", "N/A", "44.5", "45", "35", "N/A", "N/A", "N/A", "45", "N/A", "32", "N/A", "15", "N/A", "N/A", "54", "N/A", "45", "52", "45", "N/A", "N/A", "22", "0", "26", "60", "42", "N/A", "N/A"];
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

document.getElementById("Item").innerHTML = menu[day];
document.getElementById("grade").innerHTML = finalgrade + "/60";

for (items in menu)
{
    var newDiv = document.createElement("div");
    newDiv.id = "S" + items;
    newDiv.className = "schedulebox";
    document.getElementById("calender").appendChild(newDiv);
    //menu text
    var newP = document.createElement("p");
    newP.className = "scheduletext";
    newP.innerHTML = "Item: " + menu[items];
    //grade text
    var newP2 = document.createElement("p");
    newP2.className = "scheduletext";
    newP2.innerHTML = "Grade: " + grade[items];
    //appends text
    target = "S" + items;
    document.getElementById(target).appendChild(newP);
    document.getElementById(target).appendChild(newP2);
}
