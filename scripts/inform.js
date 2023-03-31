let menu = ["Beef Nachos", "Biscuits & Gravy", "Chicken Patty", "Saturday", "Sunday", "Hamb & Cheese", "Papa J Pizza", "Speghetti & Meatballs", "Chicken & Noodles", "Chicken Strips", "Saturday", "Sunday", "Mac & Cheese", "Popcorn Chicken", "Pizza Burger", "Chicken Leg", "Calzone", "Saturday", "Sunday", "Break", "Break", "Break", "Break", "Break", "Saturday", "Sunday", "Chicken Alfredo", "Papa J Pizza", "Buffalo Dip", "Hamb & Cheese", "Calzone"];
let grade = [31, 45, 51, "N/A", "N/A", 15, 45 ,52, 25, 44, "N/A", "N/A", 38, 26, 43, 35, 22, "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", 48, 45, 0, 15, 22];
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