const inputButton = document.querySelector("#input-btn");
const tabBtn = document.getElementById("save-btn");
const deleteButton = document.querySelector("#delete-btn");
const inputField = document.querySelector("#input-el");
const leads_El = document.querySelector("#ShowMyleads");
const ul_El = document.querySelector("#UL");
let myLeads = [];

let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
});

// });
inputButton.addEventListener("click", function () {
  insertLeadinArray();
  storeLeadsinLocalStorage();
  render(myLeads);
});

function insertLeadinArray() {
  myLeads.push(inputField.value);
  inputField.value = "";
}

function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    listItems += `<li>
    <a target='_blank' href='${leads[i]}'>
    ${leads[i]}
    </a>
    </li>
    `;
    // console.log(listItems);
  }
  ul_El.innerHTML = listItems;
}

function storeLeadsinLocalStorage() {
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
}

deleteButton.addEventListener("click", function deleteAllLeads() {
  localStorage.clear();
  console.log("Button Delete Clicked");
  myLeads = [];
  render(myLeads);
});
