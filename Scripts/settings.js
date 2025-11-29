function ShowSettingPage(PageID) {
  const Pages = document.getElementsByClassName("SettingHolder");
  for (let i = 0; i < Pages.length; i++) {
    const Page = Pages[i];
    console.log(i);
    console.log(Page.id);
    console.log(PageID);
    console.log(PageID == Page.id);
    if (Page.id == PageID) {
      console.log("Block");
      Page.style.display = "block";
    } else {
      Page.style.display = "none";
    }
  }
}
