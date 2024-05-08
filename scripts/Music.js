// let audioTrack = document.createElement("audio")
// let htmlListen = document.getElementById('html')
// audioTrack.loop = true

// function GetPage()
// {
//     var path = window.location.pathname;
//     var page = path.split("/").pop();
//     return page;
// }

// function PlayAudio(File)
// {
//     audioTrack.setAttribute("src", `Songs/${File}`)
//     audioTrack.play()
// }

// function OnMove(event)
// {
//     let page = GetPage()
//     if (page == "Posting.html" || page == "Posting")
//     {
//         PlayAudio("AHappyTune.mp3")
//     }
//     else if (page == "Homework.html" || page == "Homework")
//     {
//         PlayAudio("AChillExploration.mp3")
//     }
//     else
//     {
//         PlayAudio("LoginScreen.mp3")
//     }
//     htmlListen.removeEventListener("click", OnMove)
// }

// htmlListen.addEventListener("click", OnMove)