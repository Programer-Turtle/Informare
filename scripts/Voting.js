let closed = false;

if (closed == true)
{
    if (localStorage.getItem("Submitted") != null)
    {
        localStorage.removeItem("Submitted")
    }
    document.getElementById('Form').style.display = "none";
    document.getElementById('ClosedPage').style.display = "block";
}

if (localStorage.getItem("Submitted") != null)
{
    document.getElementById('Form').style.display = "none";
    document.getElementById('SubmittedPage').style.display = "block";
}

document.getElementById('Form').addEventListener('submit', function(event) {
    document.getElementById('Form').style.display = "none";
    document.getElementById('SubmittedPage').style.display = "block";
    localStorage.setItem("Submitted", "True")
});
