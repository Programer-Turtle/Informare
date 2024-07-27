
function SetDailyMessage(message)
{
    HidePopUp("MessageLoadAnimation");
    document.getElementById("Message").innerText = message;
}

//Add popup later if date already had message

async function GetDailyMessage() {
    let email = localStorage.getItem("username");
    let StoredToken = localStorage.getItem("token");

    if (!email || !StoredToken) {
        return false;
    }

    try {
        const response = await fetch('https://informare-web-server-karsonoculus.replit.app/GetDailyMessage', {
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
                throw new Error("Failed to connect or you are banned from this service.");
            }
            
            throw new Error(errorData.error);
        }

        DailyMessageData = await response.json();
        return DailyMessageData

    } catch (error) {
        console.error(error.message);
        ShowPopUp("ErrorText", "block");
        if (error.message === "Failed to fetch") {
            document.getElementById("ErrorText").innerText = "Failed to connect. Try again momentarily.";
        } else {
            document.getElementById("ErrorText").innerText = error.message;
        }
        return null;
    }
}

async function PostDailyMessage() {
    let email = localStorage.getItem("username");
    let StoredToken = localStorage.getItem("token");
    let message = document.getElementById("EditMessage").value;
    let date = document.getElementById("Date").value;

    try {
        if (!email || !StoredToken) {
            return false;
        }
    
        if (message == "" || message == null || message == undefined) {
            throw new Error("No message has been written");
        }
    
        if (date == null || date == undefined || date == "") {
            throw new Error("No Date Inputed");
        }
        
        ShowPopUp('EditLoadAnimation', 'block');
        HidePopUp('ConfirmButton');
        HidePopUp("EditErrorText")
        const response = await fetch('https://informare-web-server-karsonoculus.replit.app/AddDailyMessage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: email,
                token: StoredToken,
                Message: message,
                Date: date
            })
        });

        if (!response.ok) {
            let errorData;
            try {
                errorData = await response.json();
                throw new Error(errorData.error);
            } catch (parseError) {
                // If parsing the error JSON fails, use the raw text as the error message
                throw new Error(response.statusText || 'Server responded with an error');
            }
        }

        if (response.status === 200) {
            location.reload();
        } else {
            // Handle other status codes if needed
            throw new Error(`Unexpected response status: ${response.status} - ${response.statusText}`);
        }

    } catch (error) {
        console.error(error.message);
        ShowPopUp("EditErrorText", "block");
        if (error.message === "Failed to fetch") {
            document.getElementById("EditErrorText").innerText = "Failed to connect. Try again momentarily.";
        } else {
            document.getElementById("EditErrorText").innerText = error.message;
        }
        return null;
    } finally {
        HidePopUp('EditLoadAnimation');
        ShowPopUp('ConfirmButton', 'block');
    }
}

async function CheckIfEditor() {
    let email = localStorage.getItem("username");
    let StoredToken = localStorage.getItem("token");

    if (!email || !StoredToken) {
        return false;
    }

    try {
        const response = await fetch('https://informare-web-server-karsonoculus.replit.app/CheckForPermission', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: email,
                token: StoredToken,
                permission: "Daily_Messenger"
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

        const data = await response.json();
        return data;

    } catch (error) {
        console.error(error.message);
        ShowPopUp("ErrorText", "block");
        if (error.message === "Failed to fetch") {
            document.getElementById("ErrorText").innerText = "Failed to connect. Try again momentarily.";
        } else {
            document.getElementById("ErrorText").innerText = error.message;
        }
        return false;
    }
}

async function GetAllData() {
    try {
        // CheckIfEditor
        const isEditor = await CheckIfEditor();
        if (isEditor === true) {
            ShowPopUp("EditButton", "block");
        }
        HidePopUp("LoadAnimation");

        // GetDailyMessage
        const MessageData = await GetDailyMessage();
        let message = "";
        localStorage.setItem("MessageData", JSON.stringify(MessageData))
        const today = new Date();
        const formattedDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
        if (MessageData[formattedDate] != null || MessageData[formattedDate] != undefined)
        {
            message = MessageData[formattedDate]
        }
        else
        {
            message = "A message has not been posted yet for today. Check in later."
        }
        SetDailyMessage(message);
    } 
    catch (error) 
    {
        console.error(error);
        // Handle any additional error handling for GetAllData if needed
    }
}

GetAllData();