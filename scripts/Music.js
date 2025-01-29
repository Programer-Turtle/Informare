let audioTrack = document.createElement("audio")
let htmlListen = document.getElementsByTagName("html")
htmlListen = htmlListen[0]
audioTrack.loop = true

function GetPage()
{
    var path = window.location.pathname;
    var page = path.split("/").pop();
    return page;
}

function PlayAudio(File)
{
    audioTrack.setAttribute("src", `Songs/${File}`)
    audioTrack.play()
}

function OnMove(event)
{
    let page = GetPage()
    if (page == "News.html" || page == "News")
    {
        PlayAudio("AHappyTune.mp3")
    }
    else if (page == "Homework.html" || page == "Homework")
    {
        PlayAudio("WorkinTime.mp3")
    }
    else if (page == "Home.html" || page == "Home")
    {
        PlayAudio("ToBegin.mp3")
    }
    else if (page == "Policy.html" || page == "Policy")
    {
        PlayAudio("FrameandPlay.mp3")
    }
    else if (page == "MessageOfTheDay.html" || page == "MessageOfTheDay")
    {
        PlayAudio("AChillExploration.mp3")
    }
    else if (page == "Moderation.html" || page == "Moderation")
    {
        PlayAudio("Storm.mp3")
    }
    else if (page == "updates.html" || page == "updates")
    {
        PlayAudio("InfosPace.mp3")
    }
    else if (page == "Voting.html" || page == "Voting")
    {
        PlayAudio("Tons.mp3")
    }
    else if (page == "Ban.html" || page == "Ban")
    {
        PlayAudio("Banned.mp3")
    }
    else
    {
        PlayAudio("LoginScreen.mp3")
    }
    htmlListen.removeEventListener('mousedown', OnMove)
}

htmlListen.addEventListener('mousedown', OnMove)