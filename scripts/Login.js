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

function Login(TypeOfLogin, email, password) {
    if (TypeOfLogin == "Auto")
    {
        email = document.getElementById("Email").value;
        email = email.toLowerCase();
        password = document.getElementById("password").value;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
        LoginError("Not Valid Email Format");
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
        console.log(data);
        localStorage.setItem("username", data.username)
        localStorage.setItem("token", data.token)
        console.log('Username and password found in database.');
        window.location = "Home.html";
    })
    .catch((error) => {
        LoginError(error.message);
    });
}

function SignUp() {
    let email = document.getElementById("EmailSignUp").value;
    email = email.toLowerCase();
    let password = document.getElementById("passwordSignUp").value;

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
        SignUpError("Not Valid Email Format");
        return; // Exit the function if the email is not valid
    }

    fetch('https://informarewebserver.karsonoculus.repl.co/createAccount', {
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
        SignUpError(error.message);
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