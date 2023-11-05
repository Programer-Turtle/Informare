if (localStorage.key("Theme") == null)
{
    localStorage.setItem("Theme", "Light");
}

let CurrentTheme = localStorage.getItem("Theme");

SetPageTheme();

function ButtonSetTheme(ChosenTheme)
{
    //Determines Color
    if(ChosenTheme == "Light")
    {
        localStorage.setItem("Theme", "Light");
        SetPageTheme();
    }

    if(ChosenTheme == "Night")
    {
        localStorage.setItem("Theme", "Night");
        SetPageTheme();
    }
}

function SetPageTheme()
{
    //Changes Page Colors
    CurrentTheme = localStorage.getItem("Theme");
    if (CurrentTheme == "Light")
    {
        try
        {
            document.getElementById("CurrentThemeDisplay").src = "photos/LightMode.png"
        }

        catch
        {
            console.log("NoImage Found");
        }
        document.getElementById("PageTheme").innerHTML = null;
    }
    if (CurrentTheme == "Night")
    {
        try
        {
            document.getElementById("CurrentThemeDisplay").src = "photos/NightMode.png"
        }

        catch
        {
            console.log("NoImage Found");
        }
        document.getElementById("PageTheme").innerHTML = "body{background-color: rgb(66, 66, 66);} div.box{background-color: rgb(61, 60, 60);} .schedulebox{background-color: #625F5E;} .schedulebox-CurrentDay{background-color:#625F5E; box-shadow: 5px 5px 5px 5px #2D2E2F;} .schedulebox:hover{background-color:#625F5E; box-shadow: 5px 5px 5px 5px #2D2E2F;} .patchnote_bar{background-color: #4D4745;} .version_bar{background-color: #6C6664;} ul{background-color:#596161;} li a:hover {background-color: #3E4444;} .active{background-color:#9E9E9E;} .dropdown-content {background-color:#3E4444;} .dropdown-content a:hover {background-color:#5F5D5D} button{background-color:#494949;} button:active{background-color:#404040;} button:hover{box-shadow: 0 0 10px #4F5050;} input{background-color:#929393;} .homework_bar{background-color:#626262;} .assignment_bar {background-color:#525454;} h1.class{background-color:#898989;} .DateBox{background-color:#494646;}"
    }
}