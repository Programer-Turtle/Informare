let AccountInfo = "";

function SetErrorText(type, text)
{
    if(type == "Login")
    {
        document.getElementById("LoginError").innerText = text;
    } else if(type == "SignUp")
    {
        document.getElementById("SignUpError").innerText = text;
    }
}

function LoginError(Type)
{
    document.getElementById("LoginError").style.display = "block";
    if (Type == "WrongInfo")
    {
        console.error('Account not found or error occured');
        SetErrorText("Login", "Email or Passsword are Incorrect");
    } else if(Type == "NotEmail")
    {
        console.error('Invalid Email Format');
        SetErrorText("Login", 'Invalid Email Format');
    }
}

function SignUpError(Type)
{
    document.getElementById("SignUpError").style.display = "block";
    if (Type == "WrongInfo")
    {
        console.log("Account Already Exist");
        SetErrorText("SignUp", "Account Alread Exist")
    } else if(Type == "NotEmail")
    {
        console.error('Invalid Email Format');
        SetErrorText("SignUp", 'Invalid Email Format');
    }
}

function Login(TypeOfLogin, email, password) {
    if (TypeOfLogin == "Auto")
    {
        email = document.getElementById("Email").value;
        password = document.getElementById("password").value;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
        LoginError("NotEmail");
        return; // Exit the function if the email is not valid
    }

    fetch('https://informarewebserver.karsonoculus.repl.co/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: email, // Assuming the username is the email
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        AccountInfo = data;
        console.log(data);
        localStorage.setItem("username", data.username)
        localStorage.setItem("token", data.token)
        console.log('Username and password found in database.');
        window.location = "Home.html";
    })
    .catch(() => {
        LoginError("WrongInfo");
    });
}

function SignUp() {
    let email = document.getElementById("EmailSignUp").value;
    let password = document.getElementById("passwordSignUp").value;

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
        SignUpError("NotEmail");
        return; // Exit the function if the email is not valid
    }

    fetch('https://informarewebserver.karsonoculus.repl.co/createAccount', {
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
            throw new Error('Server responded with an error');
        }
        return response.text();
    })
    .then(data => {
        console.log(data); // Log response to console
        Login("Manual", email, password);
    })
    .catch(() => {
        SignUpError("WrongInfo");
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