function LogOut()
{
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    window.location = "index.html"
}

function DeleteAccount(password)
{
    let email = localStorage.getItem("username");
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
            password: StoredToken
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        window.location = "index.html";
    })
    .catch((error) => {
        console.log(error);
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