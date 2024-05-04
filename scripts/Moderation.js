async function GetUserList()
{
    let email = localStorage.getItem("username");
    let StoredToken = localStorage.getItem("token");

    if (!email || !StoredToken) {
        return false;
    }

    try {
        const response = await fetch('https://informare-web-server-karsonoculus.replit.app/GetUserList', {
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
        console.log(Data.Users)
        localStorage.setItem("AllUsers", Data.Users)
        localStorage.setItem("BanUsers", Data.BanUsers)
        return {User: Data.Users, Ban: Data.BanUsers}

    } catch (error) {
        console.error(error.message);
        return null;
    }
}

function ShowBanMenu()
{
    ShowPopUp("UI", "grid")
    ShowPopUp("BanConfirm", "block")
}

function SetUserToBan(user)
{
    localStorage.setItem("UserToBan", user)
}

function GetBanInfo()
{
    var usertoban = localStorage.getItem("UserToBan")
    var catagory = document.getElementById("category").value
    var date = document.getElementById("Date").value
    var reason = document.getElementById("reason").value
    BanUser(usertoban, catagory, date, reason)
}

async function BanUser(UserToBan, type, Experation, Reason)
{
    let email = localStorage.getItem("username");
    let StoredToken = localStorage.getItem("token");

    if (!email || !StoredToken) {
        return false;
    }

    try {
        const response = await fetch('https://informare-web-server-karsonoculus.replit.app/BanUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: email,
                token: StoredToken,
                userToBan: UserToBan,
                Status: type,
                experation: Experation,
                reason: Reason
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
        location.reload();
    } catch (error) {
        console.error(error.message);
        return null;
    }
}

async function ShowListOfUsers()
{
    let data = await GetUserList()
    console.log(data)
    var users = data.User
    var BanUser = data.Ban
    var List = document.getElementById("UserList")
    for (var i = 0; i < users.length; i++)
    {
        var newBoc = document.createElement("div")
        newBoc.className = "box"
        newBoc.style.marginTop = "1px"
        newBoc.style.marginBottom = "7px"
        newBoc.style.marginLeft = "10px"
        newBoc.style.marginRight = "10px"
        newBoc.style.paddingBottom = "30px"
        var newLeft = document.createElement("div")
        newLeft.className = "left"
        var newUser = document.createElement("p")
        newUser.style.fontSize = "35px"
        newUser.style.marginLeft = "5px" 
        newUser.innerText = users[i]
        var newRight = document.createElement("div")
        newRight.className = "right"
        if(BanUser.includes(users[i]))
        {
            var BanText = document.createElement("p")
            BanText.style.color = "red"
            BanText.innerText = "Banned"
        }
        var newButtonDiv = document.createElement("div")
        newButtonDiv.innerHTML = `<button onclick='SetUserToBan("${users[i]}"), ShowBanMenu()'><p>Ban</p></button>`

        newLeft.appendChild(newUser)
        if(BanUser.includes(users[i]))
        {
            newRight.appendChild(BanText)
        }
        newRight.appendChild(newButtonDiv)
        newBoc.appendChild(newLeft)
        newBoc.appendChild(newRight)
        List.appendChild(newBoc)
    }
    document.getElementById("LoadAnimation").style.display = "none"
}

ShowListOfUsers()