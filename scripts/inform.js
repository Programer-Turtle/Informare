let menu = ["Papa Johns Pizza", "Chicken-N-Dumplings", "Hamb/Cheese", "Saturday", "Sunday", "Mozzarella Cheese Sticks", "Chili Cheese Dog", "Calzones", "Salisbury Steak", "French Bread", "Saturday", "Sunday", "Taco Pita Pocket", "Turkey Manhattan", "Chicken Patty", "Papa Johns Pizza", "Mini Corn Dogs", "Saturday", "Sunday", "Popcorn Chicken", "Calzones", "ThanksGiving Break", "Happy Thanksgiving", "ThanksGiving Break", "Saturday", "Sunday", "Calzones", "Buffalo Dip/Chips", "Papa Johns Pizza", "Spaghetti/Meatballs"];
let grade = ["45", "44", "15", "N/A", "N/A", "60", "N/A", "22", "N/A", "N/A", "N/A", "N/A", "50", "N/A", "60", "45", "34", "N/A", "N/A", "44.5", "22", "N/A", "N/A", "N/A", "N/A", "N/A", "22", "0", "45", "52"];
var date = new Date();
var day = date.getDate() - 1;
let finalgrade = grade[day];
var randomNumber = Math.floor(Math.random() * 20) + 1;
console.log(randomNumber)

if (randomNumber == 19)
{
    window.location.href = "ProVersion/Prank.html"
}

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
