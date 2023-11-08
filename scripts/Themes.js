if (localStorage.key("Theme") == null)
{
    localStorage.setItem("Theme", "Light");
}

let CurrentTheme = localStorage.getItem("Theme");
SetPageTheme();

function hexToRgbString(hex) {
    // Ensure the hash is removed from the start if it's there
    hex = hex.replace(/^#/, '');
  
    // Parse the hex color string into an integer using base 16 and get the individual color components
    var r = parseInt(hex.substr(0, 2), 16);
    var g = parseInt(hex.substr(2, 2), 16);
    var b = parseInt(hex.substr(4, 2), 16);
  
    // Return the RGB string
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }
  
  function SetCustomColor() {
      // Get the chosen color value
      var chosenColor = document.getElementById("ChosenColor").value;
  
      // Convert hex to RGB string
      var rgbColorString = hexToRgbString(chosenColor);
  
      // Store the RGB color string in localStorage
      localStorage.setItem("CustomColor", rgbColorString);
  
      // For demonstration purposes, log the stored value
      console.log(localStorage.getItem("CustomColor"));
  
      // Assuming SetPageTheme function needs an RGB value
      SetPageTheme();
  }

function ButtonSetTheme(ChosenTheme)
{
    //Determines Color
    if(ChosenTheme == "Light")
    {
        localStorage.setItem("Theme", "Light");
        SetPageTheme();
    }

    if(ChosenTheme == "Custom")
    {
        localStorage.setItem("Theme", "Custom");
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
        document.getElementById("CustomColorDropDown").style.height = "0px"
        document.getElementById("CustomColorDropDown").innerHTML = null;
    }

    if (CurrentTheme == "Custom") {
        // ... image and display code ...

        //ShowsCustomMenu
        //ID: X4F9Z8T2
        var customColorDropdown = document.getElementById("CustomColorDropDown");
        customColorDropdown.style.height = "160px"
        customColorDropdown.innerHTML = "<div class='CustomColorDropDown'><input id='ChosenColor' type='color'><button style='align-self: center; justify-self: center;' onclick=\"SetCustomColor(); Verify_Feature('Custom_Theme', '1234');\"'><p>Apply</p></button></div>";
        //Calculates all Colors
        var CustomColor = localStorage.getItem("CustomColor") || "rgb(66, 66, 66)"; // Use a default if null
        var rgb = parseRgb(CustomColor); // Assuming parseRgb is a function you've defined to parse rgb strings

        // Adjust colors based on the custom color
        //RGB(0, 255, 255)
        var Custom_Box_Color = `rgb(${rgb.r+57}, ${rgb.g-141}, ${rgb.b-20})`;
        var Custom_ScheduleBox_Color = `rgb(${rgb.r+30}, ${rgb.g-180}, ${rgb.b-82})`
        var Custom_ScheduleBox_Shadow_Color = `rgb(${rgb.r+4}, ${rgb.g-125}, ${rgb.b-59})`
        var Custom_PatchNoteBar_Color = `rgb(${rgb.r+57}, ${rgb.g-141}, ${rgb.b-20})`
        var Custom_VersionBar_color = `rgb(${rgb.r+80}, ${rgb.g-125}, ${rgb.b-19})`
        var Custom_Ul_color = `rgb(${rgb.r+62}, ${rgb.g-150}, ${rgb.b-56})`
        var Custom_Li_a_Hover_color = `rgb(${rgb.r+52}, ${rgb.g-166}, ${rgb.b-87})`
        var Custom_Active_color = `rgb(${rgb.r+46}, ${rgb.g-65}, ${rgb.b-65})`
        var Custom_DropDown_Content_color = `rgb(${rgb.r+52}, ${rgb.g-166}, ${rgb.b-87})`
        var Custom_DropDown_Content_a_Hover_color = `rgb(${rgb.r+44}, ${rgb.g-158}, ${rgb.b-44})`
        var Custom_Button_color = `rgb(${rgb.r+110}, ${rgb.g-115}, ${rgb.b-0})`
        var Custom_Button_Active_color = `rgb(${rgb.r+78}, ${rgb.g-177}, ${rgb.b-0})`
        var Custom_Button_Hover_Shadow_color = `rgb(${rgb.r+69}, ${rgb.g-186}, ${rgb.b-37})`
        var Custom_Input_color = `rgb(${rgb.r+143}, ${rgb.g-92}, ${rgb.b-0})`
        var Custom_HomeWork_Bar_color = `rgb(${rgb.r+52}, ${rgb.g-178}, ${rgb.b-112})`
        var Custom_Assignment_Bar_color = `rgb(${rgb.r+59}, ${rgb.g-171}, ${rgb.b-100})`
        var Custom_Class_H1_color = `rgb(${rgb.r+143}, ${rgb.g-92}, ${rgb.b-0})`
        var Custom_DateBox_color = `rgb(${rgb.r+27}, ${rgb.g-197}, ${rgb.b-131})`

        // Generate CSS for body background and box background
        var colorHTML = `
            body { background-color: ${CustomColor}; }
            .box { background-color: ${Custom_Box_Color}; }
            .schedulebox { background-color: ${Custom_ScheduleBox_Color};}
            .schedulebox-CurrentDay{background-color:${Custom_ScheduleBox_Color}; box-shadow: 5px 5px 5px 5px ${Custom_ScheduleBox_Shadow_Color};}
            .schedulebox:hover{background-color:${Custom_ScheduleBox_Color}; box-shadow: 5px 5px 5px 5px ${Custom_ScheduleBox_Shadow_Color};}
            .patchnote_bar{background-color: ${Custom_PatchNoteBar_Color};}
            .version_bar{background-color: ${Custom_VersionBar_color};}
            ul{background-color:${Custom_Ul_color};} 
            li a:hover {background-color: ${Custom_Li_a_Hover_color};}
            .active{background-color:${Custom_Active_color};}
            .dropdown-content {background-color:${Custom_DropDown_Content_color};}
            .dropdown-content a:hover {background-color:${Custom_DropDown_Content_a_Hover_color}}
            button{background-color:${Custom_Button_color};}
            button:active{background-color:${Custom_Button_Active_color};}
            button:hover{box-shadow: 0 0 10px ${Custom_Button_Hover_Shadow_color};}
            input{background-color:${Custom_Input_color};}
            .homework_bar{background-color:${Custom_HomeWork_Bar_color};}
            .assignment_bar {background-color:${Custom_Assignment_Bar_color};}
            h1.class{background-color:${Custom_Class_H1_color};} 
            .DateBox{background-color:${Custom_DateBox_color};}
        `;

        // Set the CSS styles
        document.getElementById("PageTheme").innerHTML = colorHTML;
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
        document.getElementById("PageTheme").innerHTML = `
        body{background-color: rgb(66, 66, 66);} 
        .box{background-color: rgb(61, 60, 60);} 
        .schedulebox{background-color: #625F5E;} 
        .schedulebox-CurrentDay{background-color:#625F5E; box-shadow: 5px 5px 5px 5px #2D2E2F;} 
        .schedulebox:hover{background-color:#625F5E; box-shadow: 5px 5px 5px 5px #2D2E2F;} 
        .patchnote_bar{background-color: #4D4745;} 
        .version_bar{background-color: #6C6664;} 
        ul{background-color:#596161;} 
        li a:hover {background-color: #3E4444;} 
        .active{background-color:#9E9E9E;} 
        .dropdown-content {background-color:#3E4444;} 
        .dropdown-content a:hover {background-color:#5F5D5D} 
        button{background-color:#494949;} 
        button:active{background-color:#404040;} 
        button:hover{box-shadow: 0 0 10px #4F5050;} 
        input{background-color:#929393;} 
        .homework_bar{background-color:#626262;} 
        .assignment_bar {background-color:#525454;} 
        h1.class{background-color:#898989;} 
        .DateBox{background-color:#494646;}
        `
        document.getElementById("CustomColorDropDown").style.height = "0px"
        document.getElementById("CustomColorDropDown").innerHTML = null;
    }
}

function parseRgb(rgbString) {
    var matches = rgbString.match(/rgb\((\d+), (\d+), (\d+)\)/);
    return matches ? { r: Number(matches[1]), g: Number(matches[2]), b: Number(matches[3]) } : null;
}