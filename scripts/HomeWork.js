//assignment_bar
const List = document.getElementById("list")
let AssignmentsList = []
let CurrentDate = new Date()
CurrentDate.setHours(0,0,0,0)

async function GetHomeworkList()
{
    let email = localStorage.getItem("username");
    let StoredToken = localStorage.getItem("token");

    if (!email || !StoredToken) {
        return false;
    }

    try {
        const response = await fetch('https://informare.weathersystem.org/GetHomework', {
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
                throw new Error(response.statusText || 'Server responded with an error');
            }
            
            throw new Error(errorData.error);
        }

        Data = await response.json();
        HidePopUp('Loading')
        console.log(Data)
        return Data

    } catch (error) {
        console.error(error.message);
        return null;
    }
}

async function SetHomeworkList(HomeWorkList) {
  let Username = localStorage.getItem("username")
  let StoredToken = localStorage.getItem("token");

  try {
      const response = await fetch('https://informare.weathersystem.org/SetHomework', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              username: Username,
              token: StoredToken,
              HomeworkData: HomeWorkList
          })
      });

      if (!response.ok) {
          let errorData;
          try {
              errorData = await response.json();
              console.log(errorData.error)
              throw new Error(errorData.error);
          } catch (parseError) {
              // If parsing the error JSON fails, use the raw text as the error message
              throw new Error(response.error || 'Server responded with an error');
          }
      }

      if (response.status === 200) {
          console.log('Good')
      } else {
          // Handle other status codes if needed
          throw new Error(`Unexpected response status: ${response.status} - ${response.statusText}`);
      }

  } catch (error) {
      console.error(error.message);
      if (error.message === "Failed to fetch") {
          //idk
      } else {
         console.log(error.message);
      }
  }
}

function CheckIfDatePassedDue(Date)
{
  return false;
}

function GetAssignmentDataFromInput()
{
  //Gets Input Data
  let AssignmentInput = document.getElementById("assignmentInput").value
  let DueDateInput = document.getElementById("DueDateInput").value;
  // let [year, month, day] = DueDateInput.split("-").map(Number);
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
  SetHomeworkList(AssignmentsList)
  return "Added"
}

function DeleteAssignment(index)
{
  AssignmentsList.splice(index, 1)
  SetHomeworkList(AssignmentsList)
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
    let [year, month, day] = AssignmentData.DueDate.split("-").map(Number);
    let AssignmentDueDate = new Date(year, month - 1, day);
    AssignmentDueDate.setHours(0, 0, 0, 0); // Set hours to 0 to get local midnight
    let AssignmentPoints = AssignmentData.AssignmentPoints
    let AssignmentNotes = AssignmentData.AssignmentNotes

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
    DueDateText.innerText = ` Due ${AssignmentDueDate.getMonth()}-${AssignmentDueDate.getDate()}-${AssignmentDueDate.getFullYear()}`

    //Check if passed due
    var pastDueText = document.createElement("p")

    if(AssignmentDueDate.getTime() == CurrentDate.getTime())
    {
      console.log('Same')
      pastDueText.style.color = "yellow"
      pastDueText.innerText = "Due Today"
    }
    else if(AssignmentDueDate < CurrentDate)
    {
      pastDueText.style.color = "red"
      pastDueText.innerText = "Passed Due"
    }

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

    //Appends Past Due Text
    if(AssignmentDueDate <= CurrentDate)
    {
      Left3.appendChild(pastDueText)
    }

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

async function GetData()
{
  AssignmentsList = await GetHomeworkList()
  if(AssignmentsList.length > 0)
  {
    ShowAssignments()
  }
}

GetData()