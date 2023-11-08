function Verify_Feature(Feature, id)
{
    if (Feature == "Custom_Theme" & id == "X4F9Z8T2")
    {
        return true
    }else
    {
        localStorage.setItem("Theme", "Light");
        localStorage.removeItem("CustomColor")
        window.location = "Blocked.html";
    }
}