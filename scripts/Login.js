let AccountInfo = "";

function SetErrorText(type, text)
{
    if(type == "Login")
    {
        document.getElementById("LoginError").innerText = text;
        document.getElementById("LoginLoad").style.display = "none"
    } else if(type == "SignUp")
    {
        document.getElementById("SignUpError").innerText = text;
        document.getElementById("SignUpLoad").style.display = "none"
    }
}

function SetLoadingIcon(type)
{
    if(type == "Login")
    {
        document.getElementById("LoginError").innerText = "";
        document.getElementById("LoginLoad").style.display = "flex"
    } else if(type == "SignUp")
    {
        document.getElementById("SignUpError").innerText = "";
        document.getElementById("SignUpLoad").style.display = "flex"
    }
}

function LoginError(Type)
{
    if (document.getElementById("LoginError") == null)
    {
        console.error("Error")
        return;
    }
    console.log("worked")
    document.getElementById("LoginError").style.display = "block";
    console.error(Type);
    SetErrorText("Login", Type);
}

function SignUpError(Type)
{
    document.getElementById("SignUpError").style.display = "block";
    console.error(Type);
    SetErrorText("SignUp", Type);
}
function containsUnallowedSymbol(str, allowedSymbols) {
    // Create a regex pattern that allows only characters in the list
    let regex = new RegExp(`^[a-zA-Z0-9${allowedSymbols.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}]*$`);
    
    // Return true if the string contains an unallowed symbol
    return !regex.test(str);
}


function Login(TypeOfLogin, email, password) {
    if (TypeOfLogin == "Auto")
    {
        email = document.getElementById("Email").value;
        email = email.toLowerCase();
        password = document.getElementById("password").value;
    }

    if (containsUnallowedSymbol(email, "-_")) {
        LoginError("Usernames can only contain letters, numbers, dashes, and underscores.");
        return; // Exit the function if the email is not valid
    }

    if (TypeOfLogin == "Auto")
    {
        SetLoadingIcon('Login')
    }

    fetch('https://informapi.xyz/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: email, // Assuming the username is the email
            password: password
        })
    })
    .then(response => {
        if (!response.ok) {
            // Handle the error response as JSON
            return response.json().then(errorData => {
                throw new Error(errorData.error || 'Server responded with an error');
            });
        }

        // Assuming the server sends JSON data
        return response.json();
    })
    .then(data => {
        AccountInfo = data;
        // console.log(AccountInfo);
        if(AccountInfo.username)
        {
            console.log(data);
            localStorage.setItem("username", data.username)
            localStorage.setItem("token", data.token)
            localStorage.setItem("Theme", data.theme)
            localStorage.setItem("CustomColor", data.Rgb)
            console.log('Username and password found in database.');
            window.location = "Home.html";
        }
        else if (AccountInfo.Status)
        {
            console.log(data)
            localStorage.setItem("BanData", JSON.stringify(data));
            if(CheckBanType(AccountInfo) == "SocialBan")
            {
                localStorage.setItem("username", email)
                localStorage.setItem("token", AccountInfo.token)
                if (localStorage.getItem("BanSeen") === null || localStorage.getItem("BanSeen") === undefined)
                {
                    window.location = "Ban.html"
                }
                else 
                {
                    window.location = "Home.html"
                }
            }
            else if (CheckBanType(AccountInfo) == "All")
            {
                console.log("All Ban")
                window.location = "Ban.html"
            }
        }
    })
    .catch((error) => {
        if (error.message == "Failed to fetch")
        {
            LoginError("Failed to connect. Try again momentarily.");
        }
        else
        {
            LoginError(error.message);
        }
    });
}

function SignUp() {
    let email = document.getElementById("EmailSignUp").value;
    email = email.toLowerCase();
    let password = document.getElementById("passwordSignUp").value;

    if (containsUnallowedSymbol(email, "-_")) {
        LoginError("Usernames can only contain letters, numbers, dashes, and underscores.");
        return; // Exit the function if the email is not valid
    }

    SetLoadingIcon('SignUp')

    fetch('https://informapi.xyz/createAccount', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: email,
            password: password
        })
    })
    .then(response => {
        if (!response.ok) {
            // Handle the error response as JSON
            return response.json().then(errorData => {
                throw new Error(errorData.error || 'Server responded with an error');
            });
        }

        // Assuming the server sends JSON data
        return response.json();
    })
    .then(data => {
        console.log(data); // Log response data to console
        // Assuming the server sends a message in the 'message' property
        if (data && data.message) {
            // Handle success message or any other information from the server
            console.log(data.message);
        }

        // Call the Login function after successful account creation
        Login("Manual", email, password);
    })
    .catch(error => {
        if (error.message == "Failed to fetch")
        {
            SignUpError("Failed to connect. Try again momentarily.");
        }
        else
        {
            SignUpError(error.message);
        }
    });
}

function SetType(LoginorSignup)
{
    if (LoginorSignup == "Login")
    {
        document.getElementById("Login").style.display = "block"
        document.getElementById("SignUp").style.display = "none"
    }
    if (LoginorSignup == "SignUp")
    {
        document.getElementById("SignUp").style.display = "block"
        document.getElementById("Login").style.display = "none"
    }
}