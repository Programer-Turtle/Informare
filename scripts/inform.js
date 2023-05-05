let menu = ["you shouldn't be able to see this!", "loaded Fries", "Calzones", "han burger!", "popcorn chicken and mac&cheese", "saturday", "sunday", "mozzaerella sticks", "papa john's", "chicken patty", "crispy chicken leg", "corn dog", "saturday", "sunday", "taco salad", "chicken ranch bacon", "cheesy scrambled eggs", "chicken & dumplings", "old school pizza?", "saturday", "sunday", "Hamburger/cheese", "Papa john's", "buffalo dip/chips", "chicken&noodles", "orange chicken", "saturday", "sunday", "No school?", "Manger decide", "again Manger decides"];
let grade = ["schoolnull", 54, 22, 15, 44.5, null, null, 54, 45, 60, 35, 34, null, null, 51, 52, 32, 44, "i think 44", null, null, 15, 45, 0, 25, 26, null, null, null, null, null,];
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
