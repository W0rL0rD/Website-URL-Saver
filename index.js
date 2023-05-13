// initialized an empty array to store links.
let Links = []
// added the buttons as constants for code convenience and style.
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")

// initialized unordered list as const to render out the stored links on screen later.
const ulEl = document.getElementById("ul-el")
// elements stored in local storage are strings so converted them back to elements of an array.
// JSON.parse converts a JSON array to a javascript array.
const linksFromLocalStorage = JSON.parse(localStorage.getItem("Links"))

// Conditions to render the links on the screen if there are any present in the local storage.
if (linksFromLocalStorage) {
	Links = linksFromLocalStorage
	render(Links)
}

// A generic render function which renders out the argument given to it onto the screen.
function render(mylinks) {
  let listItems = ""

  for (let i = 0; i < mylinks.length; ++i) {
		// Creates list elements from the links present in the Links array.
		// Use of template strings here.
    listItems += `
			<li>
				<a target = '_blank' href='${mylinks[i]}'>
					${mylinks[i]}
				</a>
			</li>
		` 
  }
  
	// Makes the created list elements a part of the unordered list initialized earlier.
  ulEl.innerHTML = listItems
}

// Watches for double click on the DElETE ALL button. Clears out the Links array, local storage, and the links rendered on the screen.
deleteBtn.addEventListener("dblclick", function() {
	localStorage.clear()
	Links = []
	render(Links)
})

// Watches for a click on the SAVE INPUT button. Pushes the link entered in the input element (box) to the Links array and enters the link into the local storage after converting it from a javascript array to a JSON array. Then prints the Links array by calling the render function.
inputBtn.addEventListener("click", function() {
  Links.push(inputEl.value)
  inputEl.value = ''
	localStorage.setItem("Links", JSON.stringify(Links))
  render(Links)
})

// Watches for a click on the SAVE TAB button. Uses Chrome API to access the url of the current active chrome window and push the url to the Links array as well as store it in the local storage. Then prints the Links array by calling the render function.
tabBtn.addEventListener("click", function() {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		Links.push(tabs[0].url)
		localStorage.setItem("Links", JSON.stringify(Links))
		render(Links)
	})
})
