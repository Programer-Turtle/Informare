var randomNumber = Math.floor(Math.random() * 20) + 1;
console.log(randomNumber)

async function prank()
{
    if (randomNumber == 19)
    {
        window.location.href = "ProVersion/Prank.html"
    }
}

async function CheckForPrank()
{
    await prank()
}

CheckForPrank()