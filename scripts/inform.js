let menu = ["Menu not availiable get mad at the school"];
let grade = ["N/A"];
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
