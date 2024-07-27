async function CheckIfWriter() {
    let email = localStorage.getItem("username");
    let StoredToken = localStorage.getItem("token");

    if (!email || !StoredToken) {
        return false;
    }

    try {
        const response = await fetch('https://informare-web-server-karsonoculus.replit.app/CheckForPermission', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: email,
                token: StoredToken,
                permission: "News-Writer"
            })
        });

        if (!response.ok) {
            let errorData;
            try {
                errorData = await response.json();
            } catch (parseError) {
                // If parsing the error JSON fails, use the raw text as the error message
                throw new Error(response || 'Server responded with an error');
            }
            
            throw new Error(errorData.error);
        }

        const data = await response.json();
        HidePopUp("LoadAnimation")
        return data;

    } catch (error) {
        console.error(error)
        return false;
    }
}

async function GetNewsData()
{
    let email = localStorage.getItem("username");
    let StoredToken = localStorage.getItem("token");
    console.log(email)

    if (!email || !StoredToken) {
        return "<p style+'color:red;'>Error Occured</p>";
    }

    try {
        const response = await fetch('https://informare-web-server-karsonoculus.replit.app/GetNews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: email,
                token: StoredToken
            })
        });

        if (!response.ok) {
            let errorData;
            try {
                errorData = await response.json();
            } catch (parseError) {
                // If parsing the error JSON fails, use the raw text as the error message
                throw new Error(response.statusText || 'Server responded with an error');
            }
            
            throw new Error(errorData.error);
        }

        const data = await response.json();
        HidePopUp("LoadAnimation2")
        console.log(data)
        return data.Data;

    } catch (error) {
        console.error(error)
        return false;
    }
}

async function SetNewsData()
{
    console.log("cheese")
    let email = localStorage.getItem("username");
    let StoredToken = localStorage.getItem("token");
    let DataToPost = {Data: (document.getElementById("NewsEditInput").value)}

    if (!email || !StoredToken) {
        return false;
    }
    try{
        const response = await fetch('https://informare-web-server-karsonoculus.replit.app/PostNews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: email,
                token: StoredToken,
                NewsData:DataToPost
            })
        });

        if (!response.ok) {
            let errorData;
            try {
                errorData = await response.json();
            } catch (parseError) {
                // If parsing the error JSON fails, use the raw text as the error message
                throw new Error(response.statusText || 'Server responded with an error');
            }
            
            throw new Error(errorData.error);
        }
        else{
            console.log(response)
            location.reload()
        }
    }
    catch (error){
        ChangeInnerText("ErrorText", error)
        ShowPopUp("ErrorText")
        return false;
    }
}

//Text Area
let textarea = document.getElementById("NewsEditInput")

async function GetUIData()
{
    const IfWriter = await CheckIfWriter()
    if(IfWriter == true)
    {
        ShowPopUp("EditButton", "block")    
    }
    const CurrentNews = await GetNewsData()
    textarea.value = CurrentNews
    ChangeInnerHTML("NewsText", CurrentNews)
}

function InsertText(text)
{
    const position = textarea.selectionStart;
    const before = textarea.value.substring(0,position)
    const after = textarea.value.substring(position, textarea.value.length)
    textarea.value = before + text + after
    console.log(before + text + after)
}

function AddText()
{
    InsertText('<p style="color: white; font-size: 45px;">Put Text Here</p>')
}

function AddInnerText()
{
    InsertText('<span style="color: white; font-size: 45px;">Put Text Here</span>')
}

function AddImage()
{
    InsertText('<img width="" src="">')
}

function AddLink()
{
    InsertText('<a href="LinkHere"<p>Text Here</p></a>')
}

function AddHeading()
{
    InsertText('<h1 style="color:white;">Text Here</h1>')
}

function AddLeft()
{
    InsertText('<div class="left">Content Here</div>')
}

function AddCenter()
{
    InsertText('<div class="center">Content Here</div>')
}

function AddRight()
{
    InsertText('<div class="right">Content Here</div>')
}

textarea.addEventListener('input', (event) =>
    {
        textarea.style.height = ''
        textarea.style.height = textarea.scrollHeight + 'px'
    })

// textarea.addEventListener('pointermove', (event) =>{
//     position = textarea.selectionStart;
// })

GetUIData()