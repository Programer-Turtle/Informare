function LogOut()
{
    localStorage.clear()
    window.location = "index.html"
}

function SetErrorTextSpecific(type, text)
{
    let ErrorText = document.getElementById(type)
    ErrorText.style.display = "block"
    ErrorText.innerText = text;
}

function ResetTokens(TypeOfReset, email, password)
{
    if(TypeOfReset == "Auto")
    {
        email = localStorage.getItem("username");
        password = document.getElementById("KeysPasswordBox").value;
    }
    if(!email)
    {
        console.error("No Email");
        return;
    }else if(!password)
    {
        console.error("No Password");
        return;
    }
    fetch('https://informarewebserver.karsonoculus.repl.co/ResetTokens', {
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
            // If not JSON, treat the response as plain text
            return response.text().then(errorText => {
                // Throw a new Error with the plain text error message
                throw new Error(errorText || 'Server responded with an error');
            });
        }
    
        return response;
    })
    .then(data => {
        Login("Manual", email, password);
    })
    .catch((error) => {
        SetErrorTextSpecific("TokenError", error.message);
    });
}

function ChangePassword()
{
    let email = localStorage.getItem("username");
    let password = document.getElementById("ChangedPasswordBox").value;
    let newPassword = document.getElementById("NewPasswordBox").value;
    if(!email)
    {
        console.error("No Email");
        return;
    }else if(!password)
    {
        console.error("No Password");
        return;
    }
    fetch('https://informarewebserver.karsonoculus.repl.co/ChangePassword', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: email,
            password: password,
            newpassword: newPassword
        })
    })
    .then(response => {
        if (!response.ok) {
            // If not JSON, treat the response as plain text
            return response.text().then(errorText => {
                // Throw a new Error with the plain text error message
                throw new Error(errorText || 'Server responded with an error');
            });
        }
    
        return response;
    })
    .then(data => {
        console.log(data);
        if(data == "Password changed successfully.")
        {
            ResetKeys("Manual", email, newPassword)
        }
    })
    .catch((error) => {
        SetErrorTextSpecific("ChangePasswordError", error.message);
    });
}

function DeleteAccount()
{
    let email = localStorage.getItem("username");
    let password = document.getElementById("DeletePasswordBox").value;
    if(!email)
    {
        console.error("No Email");
        return;
    }else if(!password)
    {
        console.error("No Password");
        return;
    }
    fetch('https://informarewebserver.karsonoculus.repl.co/DeleteAccount', {
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
            // If not JSON, treat the response as plain text
            return response.text().then(errorText => {
                // Throw a new Error with the plain text error message
                throw new Error(errorText || 'Server responded with an error');
            });
        }
    
        return response;
    })
    .then(data => {
        localStorage.removeItem("username");
        localStorage.removeItem("token");
        window.location = "index.html"
    })
    .catch((error) => {
        SetErrorTextSpecific("DeleteAccountError", error.message);
    });
}

// function SetPFP(image) {
//     console.log(image);
//     var url = URL.createObjectURL(image);
//     document.getElementById('PFP').src = url;
// }

// function GetPFPFromLocalStorage()
// {
//     if(localStorage.getItem("PFP"))
//     {
//         SetPFP(localStorage.getItem("PFP"))
//     }
//     else
//     {
//         GetPFPFromDataBase();
//     }
// }

// function GetPFPFromDataBase()
// {
//     let email = localStorage.getItem("username");
//     let StoredToken = localStorage.getItem("token");

//     if (!email || !StoredToken) 
//     {
//         console.log("Token Failure");
//         return;
//     }

//     fetch('https://informarewebserver.karsonoculus.repl.co/GetPFP', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             username: email, // Assuming the username is the email
//             password: StoredToken
//         })
//     })
//     .then(response => response.json())
//     .then(data => {
//         console.log(data)
//         localStorage.setItem("PFP", data);
//         GetPFPFromLocalStorage();
//     })
//     .catch(() => {
//         console.log("NotFound")
//     });

    

        
// }

// function SetPFPInDatabase() {
//     let email = localStorage.getItem("username");
//     let StoredToken = localStorage.getItem("token");
//     let fileInput = document.getElementById("ChosenPFP"); // Assuming this is your file input ID
//     console.log(fileInput.value)

//     if (fileInput.files.length > 0) {
//         let formData = new FormData();
//         formData.append('PFP', fileInput.files[0]); // Append the file
//         formData.append('username', email); // Append the username
//         formData.append('token', StoredToken); // Append the token

//         fetch('https://informarewebserver.karsonoculus.repl.co/SetPFP', {
//             method: 'POST',
//             body: formData // Send the FormData object
//         })
//         .then(response => response.text()) // Adjust this depending on the response from your server
//         .then(data => {
//             console.log(data);
//             GetPFPFromLocalStorage();
//         })
//         .catch((error) => {
//             console.error(error);
//             // Handle any errors here
//         });
//     } else {
//         console.log("No file selected");
//     }
// }
// 
// 
// GetPFPFromDataBase();