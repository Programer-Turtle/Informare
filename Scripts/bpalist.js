const TestHolder = document.getElementById("TestHolder");

async function GetTests() {
  const response = await fetch("Data/tests.json");
  if (response.ok) {
    return await response.json();
  }
}

async function Main() {
  const Tests = await GetTests();
  for (let i = 0; i < Tests.length; i++) {
    const TestShow = document.createElement("div");
    TestShow.className = "TestBox";
    TestShow.innerHTML = `<h1>${Tests[i]["name"]}</h1>`;
    TestShow.onclick = () => {
      window.location = `testing.html?id=${Tests[i]["name"].replaceAll(" ", "")}`;
    };
    TestHolder.appendChild(TestShow);
  }
}

Main();
