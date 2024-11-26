///////////////////////////////////
///////////////////////////////////

var employeeNameInput = document.getElementById("employeeName");
var employeePositionInput = document.getElementById("employeePosition");
var employeeEmailInput = document.getElementById("employeeEmail");
var employeeAddressInput = document.getElementById("employeeAddress");
var employeePhoneInput = document.getElementById("employeePhone");

var searchInput = document.getElementById("serachEmployeeInfo");
var btnAdd = document.getElementById("addEmployeeData");
var btnUpdate = document.getElementById("updEmployeeData");
var currentIndex = 0;
var employeeList = [];

if (localStorage.getItem("EmployeeContainer") !== null) {
  employeeList = JSON.parse(localStorage.getItem("EmployeeContainer"));
}
displayEmpployeeInfo();


//Add Employee Data
function addEmplyee() {
  if (
    validationInputs(employeeNameInput, "msgName") &&
    validationInputs(employeePositionInput, "msgPosition") &&
    validationInputs(employeeEmailInput, "msgEmail") &&
    validationInputs(employeeAddressInput, "msgAddress") &&
    validationInputs(employeePhoneInput, "msgPhone")
  ) {
    employee = {
      name: employeeNameInput.value.trim(),
      position: employeePositionInput.value.trim(),
      email: employeeEmailInput.value.trim(),
      address: employeeAddressInput.value.trim(),
      phone: employeePhoneInput.value.trim(),
    };

    employeeList.push(employee);
    localStorage.setItem("EmployeeContainer", JSON.stringify(employeeList));
    displayEmpployeeInfo();

  }
  clearForm();
}

// Clear Form From Data
function clearForm() {
  employeeNameInput.value = null;
  employeePositionInput.value = null;
  employeeEmailInput.value = null;
  employeeAddressInput.value = null;
  employeePhoneInput.value = null;

  employeeNameInput.classList.remove("is-valid");
  employeePositionInput.classList.remove("is-valid");
  employeeEmailInput.classList.remove("is-valid");
  employeeAddressInput.classList.remove("is-valid");
  employeePhoneInput.classList.remove("is-valid");
}

// Display Employee Data
function displayEmpployeeInfo() {
  var employeeData = "";

  for (var i = 0; i < employeeList.length; i++) {
    employeeData += columnsData(i);
  }

  document.getElementById("tEmployeeData").innerHTML = employeeData;
}

// Search By Position
function searchData() {
  var term = searchInput.value;
  var employeeData = "";
  for (var i = 0; i < employeeList.length; i++) {
    if (employeeList[i].position.toLowerCase().includes(term.toLowerCase())) {
      employeeData += columnsData(i);
    }
  }
  document.getElementById("tEmployeeData").innerHTML = employeeData;
}

function columnsData(i) {
  return `
            <tr>
              <td><input type="checkbox" /></td>
              <td>${i + 1}</td>
              <td>${employeeList[i].name}</td>
              <td>${employeeList[i].position}</td>
              <td>${employeeList[i].email}</td>
              <td>${employeeList[i].address}</td>
              <td>${employeeList[i].phone}</td>
              <td>
                <button onclick="setUpdate(${i})" class="btn btn-outline-warning mb-1 mb-md-0">
                  <i class="fa-solid fa-pen"></i>
                </button>
                <button onclick="deleteEmployeeData(${i})" class="btn btn-outline-danger">
                  <i class="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>
        `;
}

// Delete Employee Data
function deleteEmployeeData(index) {
  employeeList.splice(index, 1);
  localStorage.setItem("EmployeeContainer", JSON.stringify(employeeList));
  displayEmpployeeInfo();
}

// Set Update in Form

function setUpdate(index) {
  currentIndex = index;

  employeeNameInput.value = employeeList[index].name;
  employeePositionInput.value = employeeList[index].position;
  employeeEmailInput.value = employeeList[index].email;
  employeeAddressInput.value = employeeList[index].address;
  employeePhoneInput.value = employeeList[index].phone;

  btnAdd.classList.add("d-none");
  btnUpdate.classList.remove("d-none");
}

// Update Data In Table
function updateData() {
  employee = {
    name: employeeNameInput.value,
    position: employeePositionInput.value,
    email: employeeEmailInput.value,
    address: employeeAddressInput.value,
    phone: employeePhoneInput.value,
  };
  employeeList.splice(currentIndex, 1, employee);
  localStorage.setItem("EmployeeContainer", JSON.stringify(employeeList));
  displayEmpployeeInfo();

  clearForm();

  btnAdd.classList.remove("d-none");
  btnUpdate.classList.add("d-none");
}

// Delete All Data
function deleteAllData() {
  employeeList = [];
  localStorage.removeItem("EmployeeContainer");
  displayEmpployeeInfo();
}

//  Validation Inputs
function validationInputs(element, msgId) {
  var regex = {
    employeeName: /^[A-Z][a-zA-Z ]{6,18}$/,
    employeePosition: /^[A-Z][a-zA-Z-]{2,14}\s(designer|developer|analyst)$/i,
    employeeEmail: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
    employeeAddress: /^[A-Za-z0-9\s,.-]{4,}$/,
    employeePhone: /^(?:\+20|0)(10|11|12|15)[0-9]{8}$/,
  };
  var text = element.value;
  var msginput = document.getElementById(msgId);

  if (regex[element.id].test(text)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    msginput.classList.add("d-none");

    return true;
  } else {
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
    msginput.classList.remove("d-none");

    return false;
  }
}
