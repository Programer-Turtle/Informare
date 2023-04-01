let menu = ["Saturday", "Sunday", "Popcorn Chicken", "Chicken & Dumplings", "Loaded Potato Skins", "Pepperoni Calzone", "E Learning", "Saturday", "Sunday", "Hamb/Cheese", "Pizza", "Mozzarella Sticks", "Crispy Chicken Leg", "Chicken Patty", "Saturday", "Sunday", "Loaded Fries", "Pancakes/Syrup", "lasagna", "Popcorn Chicken", "Quesadilla", "Saturday", "Sunday", "Pepperoni Calzone", "Papa John's Pizza", "Corn Dog", "Popcorn Chicken", "Hamb/Cheese"];
let grade = ["N/A", "N/A", "Unknown", "Unknown", "unknown", "22", "N/A", "15", "Unknown", "Unknown", "35", "51", "Unknown", "Unknown", "Unknown", "Unknown", "Unknown", "22", "45", "Unknown", "Unknown", "15"];
var date = new Date();
var day = date.getDate() - 1;
let finalgrade = grade[day];

if (finalgrade == "60" )
{
    document.getElementById("grade").style.textShadow = "0 0 10px yellow, 0 0 20px gold, 0 0 30px goldenrod";
    document.getElementById("grade").style.color = "yellow";
}

document.getElementById("Item").innerHTML = menu[day];
document.getElementById("grade").innerHTML = finalgrade + "/60";