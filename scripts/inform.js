let menu = ["Quesabillas", "loaded Fries", "Calzones", "han burger!", "popcorn chicken and mac&cheese", "saturday", "sunday", "mozzaerella sticks", "papa john's", "chicken patty", "crispy chicken leg", "corn dog", "saturday", "sunday", "taco salad", "chicken ranch bacon", "cheesy scrambled eggs", "chicken & dumplings", "old school pizza?", "saturday", "sunday", "Hamburger/cheese", "Papa john's", "buffalo dip/chips", "chicken&noodles", "orange chicken", "saturday", "sunday", "No school?", "Manger decide", "again Manger decides"];
let grade = [34, 54, 22, 15, 44.5, null, null, 54, 45, 60, 35, 34, null, null, "waiting on kristian fix this developer", "again fix this", "Again!", 44, "i think 44", null, null, 15, 45, 0, 25, 26, null, null, null, null, null,];
var date = new Date();
var day = date.getDate() - 1;
let finalgrade = grade[day];

if (finalgrade == 60)
{
    document.getElementById("grade").style.textShadow = "0 0 10px yellow, 0 0 20px gold, 0 0 30px goldenrod";
    document.getElementById("grade").style.color = "yellow";
}

document.getElementById("Item").innerHTML = menu[day];
document.getElementById("grade").innerHTML = finalgrade + "/60";
