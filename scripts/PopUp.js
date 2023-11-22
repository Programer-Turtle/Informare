function ShowPopUp(PopUpID, DisplayType)
{
    document.getElementById(PopUpID).style.display = DisplayType;
}

function HidePopUp(PopUpID)
{
    document.getElementById(PopUpID).style.display = "none";
}