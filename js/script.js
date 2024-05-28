let form = document.querySelector("form");
let ntnSave = document.querySelector("#ntnSave");
let fName = document.querySelector("#fullname");
let phone = document.querySelector("#phone");
let email = document.querySelector("#email");
let myData = document.querySelector("table");
let mytbody = myData.childNodes[3];
let id = 0;
let tableContent = '';
let data = [{}];
let isUpdate = false;
form.addEventListener("submit", function(e){
    e.preventDefault();
    acceptData()
    if (btnSave.value == "Update"){
        isUpdate = true
    }
})


function acceptData() {
    data.push({
      fullname: fName.value,
      phone: phone.value,
      email: email.value,
    });
  
    console.log(data);
    localStorage.setItem("data", JSON.stringify(data));
    addData()
};

let addData = () => {
    mytbody.innerHTML = "";
    data.map((data, index) => {
      return (mytbody.innerHTML += `
        <tr id=${index}>
            <td>${id+=1}</td>
            <td>${data.fullname}</td>
            <td>${data.phone}</td>
            <td>${data.email}</td>
            <td>${new Date().toUTCString()}</td>
            <td>
                <button class="btn btn-success" onclick="editData(this)">Edit</button>
                <button class="btn btn-danger" onclick="deleteConfirmation(this)">Delete</button>
            </td>
        </tr>
      `);
    });
  
    resetForm();
};

function deleteData(button){
    button.parentElement.parentElement.remove();
    data.splice(button.parentElement.parentElement.id, 1);
    localStorage.setItem("data", JSON.stringify(data));
}
function editData(button){
    // set value of each row to input
    let selectedData = button.parentElement.parentElement;
    fName.value = selectedData.children[1].innerHTML;
    phone.value = selectedData.children[2].innerHTML;
    email.value = selectedData.children[3].innerHTML;
    // Change title of button
    btnSave.value = "Update";
    deleteData(button)
}
function resetForm(){
    fName.value = "";
    phone.value = "";
    email.value = "";
}

(() => {
    data = JSON.parse(localStorage.getItem("data")) || []
    addData();
})();

function deleteConfirmation(button){
    let isDelete = confirm("Are you sure to delete?");
    if (isDelete){
       deleteData(button)
    }
}