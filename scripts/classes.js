function ClassSelected(SelectedClass)
{
    document.getElementById("ScheduleSelect").style.display = "none";

    if(SelectedClass == "MiddleSchool")
    {
        document.getElementById("MiddleSchool").style.display = "block";
    }
}