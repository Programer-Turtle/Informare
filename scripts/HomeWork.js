//assignment_bar
const List = document.getElementById("list")
let AssignmentsList = []

function CheckIfDatePassedDue(Date)
{
  return false;
}

function GetAssignmentDataFromInput()
{
  //Gets Input Data
  let AssignmentInput = document.getElementById("assignmentInput").value
  let DueDateInput = document.getElementById("DueDateInput").value
  let PointsInput = document.getElementById("PointsInput").value
  let NotesInput = document.getElementById("NotesInput").value

  //Makes Inputs Empty
  document.getElementById("assignmentInput").value = ""
  document.getElementById("DueDateInput").value = ""
  document.getElementById("PointsInput").value = ""
  document.getElementById("NotesInput").value = ""

  let AddedToListMessage = AddAssignmentToList(AssignmentInput, DueDateInput, PointsInput, NotesInput)
  if(AddedToListMessage != "Added")
  {
    ShowPopUp("ErrorText", "block")
    ChangeInnerText("ErrorText", AddedToListMessage)
  }
  else
  {
    HidePopUp('ErrorText')
    
  }
}

function AddAssignmentToList(Assignment, Due, Points, Notes)
{
  if(Assignment == null || Assignment == "" || Due == null || Due == "" || Points == null || Points == "")
  {
    return "Assignment, Due, or Points is empty."
  }
  if(Points < 0)
  {
    return "Points Can't be a negative number."
  }
  AssignmentsList.push({AssignmentName: Assignment, DueDate: Due, AssignmentPoints: Points, AssignmentNotes: Notes})
  ShowAssignments()
  return "Added"
}

function DeleteAssignment(index)
{
  AssignmentsList.splice(index, 1)
  ShowAssignments()
}

function ShowAssignments()
{
  List.innerHTML = ""
  for (i=0; i<AssignmentsList.length; i++)
  {
    //Get Data
    let AssignmentData = AssignmentsList[i]
    let Assignment = AssignmentData.AssignmentName
    let AssignmentDueDate = AssignmentData.DueDate
    let AssignmentPoints = AssignmentData.AssignmentPoints
    let AssignmentNotes = AssignmentData.AssignmentNotes
    console.log(AssignmentDueDate)

    //Create Assignment Bar
    var Bar = document.createElement("div")
    Bar.className = "patchnote_bar"

    //Create Left1
    var Left = document.createElement("div")
    Left.className = "left"

    //Create Assignment Text
    var AssignmentText = document.createElement("p")
    AssignmentText.innerText = Assignment

    //Create Close Button
    var CloseButton = document.createElement("div")
    CloseButton.innerHTML = `<button onclick="DeleteAssignment(${i})"><p>Mark Done</p></button>`

    //Create Left2
    var Left2 = document.createElement("div")
    Left2.className = "left"

    //Create Points Text
    var PointsText = document.createElement("p")
    PointsText.innerText = `${AssignmentPoints} Points`

    //Create Left3
    var Left3 = document.createElement("div")
    Left3.className = "left"

    //Create Due Text
    var DueDateText = document.createElement("p")
    DueDateText.innerText = ` Due ${AssignmentDueDate}`

    //Create Right
    var Right = document.createElement("div")
    Right.className = "right"

    //Create Notes Buttons
    var ShowNotesButton = document.createElement("div")
    ShowNotesButton.innerHTML = `<button onclick="ShowPopUp('AssignmentNotes${i}', 'block'), ShowPopUp('HideNotesButton${i}', 'block'), HidePopUp('ShowNotesButton${i}')"><p>Show Notes</p></button>`
    ShowNotesButton.id = `ShowNotesButton${i}`

    var HideNotesButton = document.createElement("div")
    HideNotesButton.innerHTML = `<button onclick="HidePopUp('AssignmentNotes${i}'), ShowPopUp('ShowNotesButton${i}', 'block'), HidePopUp('HideNotesButton${i}')"><p>Hide Notes</p></button>`
    HideNotesButton.id = `HideNotesButton${i}`
    HideNotesButton.style.display = "none"

    //Create Notes Section
    var Notes = document.createElement("p")
    console.log(AssignmentNotes == "" || AssignmentNotes == null)
    if(AssignmentNotes == "" || AssignmentNotes == null)
    {
      AssignmentNotes = "No notes have been set for this assignment."
    }
    Notes.innerText = AssignmentNotes
    Notes.style.display = "none"
    Notes.style.marginBottom = "5px"
    Notes.id = `AssignmentNotes${i}`

    //Append Assignment text and close button to left
    Left.appendChild(AssignmentText)
    Left.appendChild(CloseButton)

    //Append Points text to Left2
    Left2.appendChild(PointsText)

    //Append Due Text ti left3
    Left3.appendChild(DueDateText)
    

    //Append Buttons to Right
    Right.appendChild(ShowNotesButton)
    Right.appendChild(HideNotesButton)

    //Append Items to main bar
    Bar.appendChild(Left)
    Bar.appendChild(Left2)
    Bar.appendChild(Left3)
    Bar.appendChild(Right)
    Bar.appendChild(Notes)

    //Appends Main Bar to List
    List.append(Bar)
  }
}