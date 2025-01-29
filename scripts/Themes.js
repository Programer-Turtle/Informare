if (localStorage.key("Theme") == null)
{
    localStorage.setItem("Theme", "Light");
}

let CurrentTheme = localStorage.getItem("Theme");
SetPageTheme();

async function PostTheme() {
    console.log("Called")
    let email = localStorage.getItem("username");
    let StoredToken = localStorage.getItem("token");
    let Theme = localStorage.getItem("Theme")
    let Rgb = localStorage.getItem("CustomColor")
    console.log("Theme: " + Theme + " Rgb: " + Rgb)

    try {
        const response = await fetch('http://34.121.153.71:3000/SetTheme', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: email,
                token: StoredToken,
                theme: Theme,
                Rbg: Rgb
            })
        });

        if (!response.ok) {
            let errorData;
            try {
                errorData = await response.json();
                throw new Error(errorData.error);
            } catch (parseError) {
                // If parsing the error JSON fails, use the raw text as the error message
                throw new Error(response.statusText || 'Server responded with an error');
            }
        }

        if (response.status === 200) {
            //pass
        } else {
            // Handle other status codes if needed
            throw new Error(`Unexpected response status: ${response.status} - ${response.statusText}`);
        }

    } catch (error) {
        console.error(error.message);
        if (error.message === "Failed to fetch") {
            //idk
        } else {
           console.log(error.message);
        }
        return null;
    }
}

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
  
async function SetCustomColor() {
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
      await PostTheme()
  }

async function ButtonSetTheme(ChosenTheme)
{
    //Determines Color
    if(ChosenTheme == "Light")
    {
        localStorage.setItem("Theme", "Light");
        SetPageTheme();
        await PostTheme()
    }

    if(ChosenTheme == "Custom")
    {
        localStorage.setItem("Theme", "Custom");
        SetPageTheme();
        await PostTheme()
    }

    if(ChosenTheme == "Night")
    {
        localStorage.setItem("Theme", "Night");
        SetPageTheme();
        await PostTheme()
    }
}

function SetPageTheme()
{
    //Changes Page Colors
    CurrentTheme = localStorage.getItem("Theme");
    if (CurrentTheme == "Light")
    {
        document.getElementById("PageTheme").innerHTML = null;
        
        try
        {
            document.getElementById("CurrentThemeDisplay").src = "photos/LightMode.png"
        }

        catch
        {
            console.log("NoImage Found");
        }
        
        try
        {
            document.getElementById("CustomColorDropDown").style.height = "0px"
            document.getElementById("CustomColorDropDown").innerHTML = null;
        }

        catch
        {
            console.log("No Menu Found");
        }
    }

    if (CurrentTheme == "Custom") {

        //Changed Image
        try
        {
            document.getElementById("CurrentThemeDisplay").src = "photos/CustomMode.png"
        }

        catch
        {
            console.log("NoImage Found");
        }


        //ShowsCustomMenu
        try
        {
            var customColorDropdown = document.getElementById("CustomColorDropDown");
            customColorDropdown.style.height = "160px"
            customColorDropdown.innerHTML = "<div class='CustomColorDropDown'><input id='ChosenColor' type='color'><button style='align-self: center; justify-self: center;' onclick=\"SetCustomColor()\"'><p>Apply</p></button></div>";
        }
        catch
        {
            console.log("No Menu Found");
        }

        //Calculates all Colors
        var CustomColor = localStorage.getItem("CustomColor") || "rgb(0, 0, 255)"; // Use a default if null
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
        var Custom_Button_color = `rgb(${rgb.r+110}, ${rgb.g-145}, ${rgb.b-0})`
        var Custom_Button_Active_color = `rgb(${rgb.r+78}, ${rgb.g-177}, ${rgb.b-0})`
        var Custom_Button_Hover_Shadow_color = `rgb(${rgb.r+69}, ${rgb.g-186}, ${rgb.b-37})`
        var Custom_Input_color = `rgb(${rgb.r+143}, ${rgb.g-92}, ${rgb.b-0})`
        var Custom_HomeWork_Bar_color = `rgb(${rgb.r+52}, ${rgb.g-178}, ${rgb.b-112})`
        var Custom_Assignment_Bar_color = `rgb(${rgb.r+59}, ${rgb.g-171}, ${rgb.b-100})`
        var Custom_Class_H1_color = `rgb(${rgb.r+143}, ${rgb.g-92}, ${rgb.b-0})`
        var Custom_DateBox_color = `rgb(${rgb.r+27}, ${rgb.g-197}, ${rgb.b-131})`
        var Custom_Update_PopUp_color = `rgb(${rgb.r+57}, ${rgb.g-145}, ${rgb.b-31})`
        var Custom_InnerBubble_color = Custom_Update_PopUp_color;
        var Custom_SignUp_Button_color = `rgb(${rgb.r+57}, ${rgb.g-141}, ${rgb.b-20})`
        var Custom_TextArea_color = `rgb(${rgb.r+143}, ${rgb.g-92}, ${rgb.b-0})`
        var Custom_DropDown_color = `rgb(${rgb.r+117}, ${rgb.g-114}, ${rgb.b-10})`
        var Custom_Description_color = `rgb(${rgb.r+80}, ${rgb.g-125}, ${rgb.b-19})`

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
            .Update-Pop-Up-Background{background-color:${Custom_Update_PopUp_color};}
            .InnerBubble{background-color: ${Custom_InnerBubble_color};}
            .SignUpButton{background-color:${Custom_SignUp_Button_color};}
            textarea{background-color:${Custom_TextArea_color};}
            select{background-color:${Custom_DropDown_color};}
            option{background-color:${Custom_DropDown_color};}
            .Description{background-color:${Custom_Description_color};}
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
        .Update-Pop-Up-Background{background-color: #565656;}
        .InnerBubble{background-color: #565656;}
        .SignUpButton{background-color:#3D3F45;}
        textarea{background-color:#B5B5B5;}
        select{background-color:#B4B7C4;}
        option{background-color:#B4B7C4;}
        `
        try
        {
            document.getElementById("CustomColorDropDown").style.height = "0px"
            document.getElementById("CustomColorDropDown").innerHTML = null;
        }

        catch
        {
            console.log("No Menu Found");
        }
    }
    return null;
}

function parseRgb(rgbString) {
    var matches = rgbString.match(/rgb\((\d+), (\d+), (\d+)\)/);
    return matches ? { r: Number(matches[1]), g: Number(matches[2]), b: Number(matches[3]) } : null;
}