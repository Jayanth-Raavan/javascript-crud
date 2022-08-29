
let url = "https://jsonplaceholder.typicode.com/posts";
let updatedUrl = 'https://jsonplaceholder.typicode.com/posts/1';
let deleteUrl = 'https://jsonplaceholder.typicode.com/posts/1';

var data = [];

function getPosts() {
  fetch(url)
    .then((response) => response.json())
    .then((json) => {
      var data = json;
      console.log(data);
      var table = document.getElementById("myTable");
      for (var i = 0; i < data.length; i++) {
        var row = `<tr>
                          <td>${data[i].userId}</td>
                          <td>${data[i].id}</td>
                          <td>${data[i].title}</td>
                          <td>${data[i].body}</td>
                          <td><button class="btn btn-info" onclick="onEdit(this)"><i class="fa fa-pencil"><i></button></td>
                          <td><button class="btn btn-danger" onclick="onDelete(this)"><i class="fa fa-trash"><i></button></td>

                  </tr>`;

        table.innerHTML += row;
      }
    });
}
//**************************************************************** */
var selectedRow = null

function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();
        if (selectedRow == null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
    }
}

function readFormData() {
    var formData = {};
    formData["userId"] = document.getElementById("userId").value;
    formData["id"] = document.getElementById("id").value;
    formData["title"] = document.getElementById("title").value;
    formData["body"] = document.getElementById("body").value;
    return formData;
}

// create new record

  const insertNewRecord = () => {
      
  let inputValue1 = document.querySelector("#userId").value;
  let inputValue2 = document.querySelector("#title").value;
  let inputValue3 = document.querySelector("#body").value;
  console.log(`${inputValue1}-${inputValue2}-${inputValue3}`);

  fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      title: {inputValue2},
      body: {inputValue3},
      userId: {inputValue1},
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((json) => {
      var createdData = json;
      console.log(createdData);
      var table = document.getElementById("myTable");

      var row = `<tr>
                          <td>${inputValue1}</td>
                          <td>${createdData.id}</td>
                          <td>${inputValue2}</td>
                          <td>${inputValue3}</td>
                          <td><button class="btn btn-info" onclick="onEdit(this)"><i class="fa fa-pencil"><i></button></td>
                          <td><button class="btn btn-danger" onclick="onDelete(this)"><i class="fa fa-trash"><i></button></td>
                          </td>
                  </tr>`

      table.innerHTML += row;
    });
  }


function resetForm() {
    document.getElementById("userId").value = "";
    document.getElementById("id").value = "";
    document.getElementById("title").value = "";
    document.getElementById("body").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("userId").value = selectedRow.cells[0].innerHTML;
    document.getElementById("id").value = selectedRow.cells[1].innerHTML;
    document.getElementById("title").value = selectedRow.cells[2].innerHTML;
    document.getElementById("body").value = selectedRow.cells[3].innerHTML;
}
//update posts..........
const updateRecord = (formData) =>{
    let updateValue1 = document.querySelector("#userId").value;
    let updateValue2 = document.querySelector("#id").value;

    let updateValue3 = document.querySelector("#title").value;
    let updateValue4 = document.querySelector("#body").value;

    console.log(`${updateValue1}-${updateValue2}-${updateValue3}-${updateValue4}`);
    fetch(updatedUrl, {
  method: 'PUT',
  body: JSON.stringify({
    id: {updateValue2},
    title: {updateValue3},
    body: {updateValue4},
    userId: {updateValue1},
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((json) => {
    var updatedData = json;
    console.log(updatedData);
    var table = document.getElementById("myTable");

    var row = `<tr>
                        <td>${updateValue1}</td>
                        <td>${updateValue2}</td>
                        <td>${updateValue3}</td>
                        <td>${updateValue4}</td>
                        <td><button class="btn btn-info" onclick="onEdit(this)"><i class="fa fa-pencil"><i></button></td>
                        <td><button class="btn btn-danger" onclick="onDelete(this)"><i class="fa fa-trash"><i></button></td>
                </tr>`

    table.innerHTML += row;
  });

}
//Delete posts............

let onDelete = (td) =>{
    fetch(deleteUrl, {
  method: 'DELETE',
}).then((res) => {
    if (confirm('Are you sure to delete this ?')) {
            row = td.parentElement.parentElement;
            deletePost = document.getElementById("myTable").deleteRow(row.rowIndex);
            resetForm();
        } 
    console.log("data deleted", res);
  });
}

//Validate Posts...........

function validate() {
    isValid = true;
    if (document.getElementById("userId").value == "") {
        isValid = false;
        document.getElementById("userIdValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("userIdValidationError").classList.contains("hide"))
            document.getElementById("userIdValidationError").classList.add("hide");
    }
    return isValid;
}