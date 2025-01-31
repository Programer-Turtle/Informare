async function PublishPost() {
    let Username = localStorage.getItem("username")
    let StoredToken = localStorage.getItem("token");
    let TypeInput = document.getElementById("category");
    let TextInput = document.getElementById("PostTextInput");
    let Type = TypeInput.value;
    let Text = TextInput.value;
    TypeInput.value = "Fun"
    TextInput.value = null
    ShowPopUp("PostLoad", "block");
    HidePopUp("PostButton");
    try {
        const response = await fetch('https://informapi.xyz/PublishPost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: Username,
                token: StoredToken,
                PostType: Type,
                PostText: Text
            })
        });

        if (!response.ok) {
            let errorData;
            try {
                errorData = await response.json();
                throw new Error(errorData.error);
            } catch (parseError) {
                // If parsing the error JSON fails, use the raw text as the error message
                throw new Error(response.error || 'Server responded with an error');
            }
        }

        if (response.status === 200) {
            ShowPopUp("PostButton", "block");
            HidePopUp("PostLoad");
            console.log('Good')
            GetPostList()
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
    }
}

async function DeltePost(messageID) {
    let Username = localStorage.getItem("username")
    let StoredToken = localStorage.getItem("token");

    try {
        const response = await fetch('https://informapi.xyz/DeletePost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: Username,
                token: StoredToken,
                ID: messageID
            })
        });

        if (!response.ok) {
            let errorData;
            try {
                errorData = await response.json();
                console.log(errorData.error)
                throw new Error(errorData.error);
            } catch (parseError) {
                // If parsing the error JSON fails, use the raw text as the error message
                throw new Error(response.error || 'Server responded with an error');
            }
        }

        if (response.status === 200) {
            console.log('Good')
            GetPostList()
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
    }
}

async function GetPostList()
{
    let email = localStorage.getItem("username");
    let StoredToken = localStorage.getItem("token");
    let Post = document.getElementById("PostBox")
    Post.innerHTML = ""
    ShowPopUp("LoadAnimation", "block")

    if (!email || !StoredToken) {
        return false;
    }

    try {
        const response = await fetch('https://informapi.xyz/GetPosts', {
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

        Data = await response.json();
        console.log(Data)
        HidePopUp("LoadAnimation")
        ShowPostList(Data)

    } catch (error) {
        console.error(error);
        return null;
    }
}

async function ShowPostList(Data)
{
    let DataKeys = Object.keys(Data)
    var Post = document.getElementById("PostBox")
    Post.innerHTML = ""
    for(z=1;z<=DataKeys.length;z++)
    {
        let i = DataKeys.length - z
        var NewBar = document.createElement("div")
        NewBar.className = "version_bar"
        NewBar.style.paddingBottom = "15px"
        NewBar.style.marginBottom = "5px"
        var NewLeft = document.createElement("div")
        NewLeft.className = "left"
        var NewLeft2 = document.createElement("div")
        NewLeft2.className = "left"
        var NewName = document.createElement("p")
        NewName.innerText = Data[DataKeys[i]].User
        var RoleText = document.createElement("p")
        let UserLevel = Data[DataKeys[i]].Level
        RoleText.innerText = UserLevel.replace("_", " ")
        RoleText.style.fontSize = "50px"
        RoleText.style.fontWeight = 800;
        if(UserLevel == "Admin")
        {
            RoleText.style.color = "lime"
        }
        else if (UserLevel == "Daily_Messenger")
        {
            RoleText.style.color = "#BF40BF"
        }
        else if (UserLevel == "Head_Moderator")
        {
            RoleText.style.color = "#d11717"
        }
        else if (UserLevel == "Head_Judge")
        {
            RoleText.style.color = "gold"
        }
        else if(UserLevel == "Designer")
        {
            RoleText.style.color = "blue"
        }
        else if (UserLevel == "Moderator")
        {
            RoleText.style.color = "red"
        }
        else if (UserLevel == "Judge")
        {
            RoleText.style.color = "#FFAF18"
        }
        var DeleteButton = document.createElement("div")
        DeleteButton.innerHTML = `<button onclick="DeltePost('${DataKeys[i]}')"><p>Delete</p></button>`
        var NewType = document.createElement("p")
        NewType.innerText = Data[DataKeys[i]].PostType
        var NewBox = document.createElement("div")
        NewBox.className = "box"
        NewBox.style.marginTop = "4px"
        NewBox.style.paddingBottom = "50px"
        var NewText = document.createElement("p")
        NewText.innerText = Data[DataKeys[i]].PostText
        NewText.style.display = "block"
        

        NewLeft.appendChild(NewName)
        if(UserLevel != "Free")
        {
            NewLeft.appendChild(RoleText)
        }
        if(Data[DataKeys[i]].User == localStorage.getItem("username") || localStorage.getItem("Mod?") == "true")
        {
            NewLeft.appendChild(DeleteButton)
        }
        NewLeft2.appendChild(NewType)
        NewBox.appendChild(NewText)
        NewBar.appendChild(NewLeft)
        NewBar.appendChild(NewLeft2)
        NewBar.appendChild(NewBox)
        Post.appendChild(NewBar)
    }
}

GetPostList();