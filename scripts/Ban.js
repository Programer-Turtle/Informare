 // var date = new Date();
// const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
localStorage.setItem("BanSeen", true);
let banData = JSON.parse(localStorage.getItem("BanData"));
if(banData ==  null || banData == undefined)
{
    window.location = "Home.html"
}
let type = banData.Status;
let Expire_Date = banData.Expire_Date;
let Reason = banData.Reason

function GetExplanationText(type)
{
    if (type == "SocialBan")
    {
        return "You are exclusively prohibited from engaging in any social-related activities on Informare, such as providing feedback or utilizing Informare's chat feature. You can go to the Home screen now.";
    }
    else if (type == "All")
    {
        return "You are restricted from accessing all functionalities, including core features like the lunch schedule and homework manager. The only available action is to log out.";
    
    }
    else
    {
        console.error("Not a ban type");
    }
}

document.getElementById("Type").innerText = type;
document.getElementById("explanation").innerText = GetExplanationText(type);
document.getElementById("Reason").innerText = Reason;
document.getElementById("Expire_Date").innerText = Expire_Date;