function Verify_Feature(Feature, id)
{
    if (Feature == "Custom_Theme" && id == "X4F9Z8T2")
    {
        return true
    }else
    {
        localStorage.setItem("Theme", "Light");
        localStorage.removeItem("CustomColor")
        window.location = "Blocked.html";
    }
}

function CheckBanType(BanData)
{
    console.log(BanData.Status)
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
        const response = await fetch('https://informarewebserver.karsonoculus.repl.co/checkifloggedin', {
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

async function handlePageLoad() {
    const url = window.location.href;
    const isLoginPage = url.substring(url.lastIndexOf('/') + 1).toLowerCase() === "index.html";
    const isLoginPage2 = url.substring(url.lastIndexOf('/') + 1).toLowerCase() === "";

    let accountVerified = await Verify_Account();

    if(accountVerified != false)
    {
        if(CheckBanType(accountVerified) == "SocialBan")
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
    }

    if (!accountVerified && !isLoginPage && !isLoginPage2) {
        localStorage.removeItem("username");
        localStorage.removeItem("token");
        LoadLoginScreen();
    } else if (accountVerified && isLoginPage || accountVerified && isLoginPage2) {
        window.location = "Home.html";
    }
}

handlePageLoad();
