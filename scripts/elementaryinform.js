let menu = ["No School", "Popcorn Chicken", "Raviou/Meat", "Hans Burger", "Mini Corn Dogs", "Saturday", "Sunday", "Chicken & Cheese Crispito", "Cheesy Scrambled Eggs", "Chicken & Noodles", "Speghetti/MeatBall", "Chicken Soft Taco", "Saturday", "Sunday", "Pizza", "Pulled Pork", "Crispy Chicken Leg", "Hamburger/Cheese", "Mini Corn Dogs", "Saturday", "Sunday", "Mini Calzones", "Mac & Cheese Bowl", "Turkey and Ham", "Popcorn Chicken", "Chicken & Cheese", "No School", "Manager's Choice", "Manager's Choice"];
let grade = ["schoolnull", 55, "schoolnull", "schoolnull", 25, null, null, 1, null, 45, 9, 60, null, null, 12, 0, 60, 45, 25, null, null, 34, 5, 14.2, 55, 10.5, null, null, null];
var date = new Date();
var day = date.getDate() - 1;
let finalgrade = grade[day];

if (finalgrade == "schoolnull")
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