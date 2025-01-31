async function CheckIfModerator()
{
    let email = localStorage.getItem("username");
    let StoredToken = localStorage.getItem("token");

    if (!email || !StoredToken) {
        return false;
    }

    try {
        const response = await fetch('https://informapi.xyz/CheckIfModerator', {
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
        if(Data == true)
        {
            var NavBar = document.getElementById("Mod")
            NavBar.style.display = "inline-block"
            localStorage.setItem("Mod?", true)
        }

    } catch (error) {
        console.error(error.message);
        return null;
    }
}

async function GetThemeFromServer()
{
    let email = localStorage.getItem("username");
    let StoredToken = localStorage.getItem("token");

    if (!email || !StoredToken) {
        return false;
    }

    try {
        const response = await fetch('https://informapi.xyz/GetThemeData', {
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

        ThemeData = await response.json();
        localStorage.setItem("Theme", ThemeData.theme)
        localStorage.setItem("CustomColor", ThemeData.Rgb)
        return true

    } catch (error) {
        console.error(error.message);
        return null;
    }
}

function CheckBanType(BanData)
{
    return BanData.Status;
}

function LoadLoginScreen()
{
    window.location = "index.html";
}

async function Verify_Account() {
    let email = localStorage.getItem("username");
    let StoredToken = localStorage.getItem("token");

    if (!email || !StoredToken) {
        return false;
    }

    try {
        const response = await fetch('https://informapi.xyz/checkifloggedin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: email,
                token: StoredToken
            })
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error occurred during account verification', error);
        return false;
    }
} 
} 

async function handlePageLoad() {
    const url = window.location.href;
    const isLoginPage = url.substring(url.lastIndexOf('/') + 1).toLowerCase() === "index.html";
    const isLoginPage2 = url.substring(url.lastIndexOf('/') + 1).toLowerCase() === "";

    let accountVerified = await Verify_Account();

    if(accountVerified != false)
    {
        let bantype = CheckBanType(accountVerified)
        if(bantype == "SocialBan")
        {
            localStorage.setItem("BanData", JSON.stringify(accountVerified));
            if (localStorage.getItem("BanSeen") === null || localStorage.getItem("BanSeen") === undefined)
            {
                window.location = "Ban.html"
            }
            else
            {
                accountVerified = true
            }
        }
        else if(bantype == "All")
        {
            window.location = "Ban.html"
        }
    }

    if (!accountVerified && !isLoginPage && !isLoginPage2) {
        localStorage.removeItem("username");
        localStorage.removeItem("token");
        LoadLoginScreen();
    } else if (accountVerified && isLoginPage || accountVerified && isLoginPage2) {
        var Theme = await GetThemeFromServer()
        if (Theme == true)
        {
            window.location = "Home.html";
        }
    }
    CheckIfModerator()
}

handlePageLoad();