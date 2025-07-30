async function GetPatchNotes() {
  const response = await fetch("Data/patchnotes.json");
  if (response.status) {
    const data = await response.json();
    return data;
  }
}

async function ShowPatchNotes() {
  const PatchNotes = await GetPatchNotes();
  for (let index = 0; index < PatchNotes.length; index++) {
    const CurrentPatchNote = PatchNotes[index];
    const Header = CurrentPatchNote["header"];
    const paragraph = CurrentPatchNote["paragraph"];

    const PatchNoteBox = document.createElement("div");
    PatchNoteBox.className = "box PatchBox";

    const PatchNoteHeaderBox = document.createElement("div");
    PatchNoteHeaderBox.className = "box PatchHeader";

    const HeaderText = document.createElement("h1");
    HeaderText.innerText = Header;

    const ParagraphText = document.createElement("p");
    ParagraphText.innerText = paragraph;

    PatchNoteHeaderBox.appendChild(HeaderText);
    PatchNoteBox.appendChild(PatchNoteHeaderBox);
    PatchNoteBox.appendChild(ParagraphText);
    document.body.appendChild(PatchNoteBox);
  }
}

ShowPatchNotes();
