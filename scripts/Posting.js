async function PublishPost() {
    let Username = localStorage.getItem("username")
    let StoredToken = localStorage.getItem("token");
    let Type = document.getElementById("category").value;
    let Text = document.getElementById("PostTextInput").value
    ShowPopUp("PostLoad", "block");
    HidePopUp("PostButton");
    try {
        const response = await fetch('https://informare-web-server-karsonoculus.replit.app/PublishPost', {
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
            console.log('Good')
            location.reload();
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

    if (!email || !StoredToken) {
        return false;
    }

    try {
        const response = await fetch('https://informare-web-server-karsonoculus.replit.app/GetPosts', {
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
        console.error(error.message);
        return null;
    }
}

function ShowPostList(Data)
{
    var Post = document.getElementById("PostBox")
    for(i=0;i<Data.length;i++)
    {
        var NewBar = document.createElement("div")
        NewBar.className = "version_bar"
        NewBar.style.paddingBottom = "15px"
        var NewLeft = document.createElement("div")
        NewLeft.className = "left"
        var NewLeft2 = document.createElement("div")
        NewLeft2.className = "left"
        var NewName = document.createElement("p")
        NewName.innerText = Data[i].User
        var NewType = document.createElement("p")
        NewType.innerText = Data[i].PostType
        var NewBox = document.createElement("div")
        NewBox.className = "box"
        NewBox.style.marginTop = "4px"
        NewBox.style.paddingBottom = "50px"
        var NewText = document.createElement("p")
        NewText.innerText = Data[i].PostText
        NewText.style.display = "block"
        

        NewLeft.appendChild(NewName)
        NewLeft2.appendChild(NewType)
        NewBox.appendChild(NewText)
        NewBar.appendChild(NewLeft)
        NewBar.appendChild(NewLeft2)
        NewBar.appendChild(NewBox)
        Post.appendChild(NewBar)
    }
}

GetPostList();