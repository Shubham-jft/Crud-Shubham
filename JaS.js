var row;
var pa;
var selectedRow = null;
function delete1()
{
    console.log(pa);
    document.getElementById("Tdata").deleteRow(pa);
    rowcount1();
}
var x=1;
function rowcount()
{
       x=document.getElementById("Tdata").rows.length;
        console.log(x);
}

function onformsubmit()
{
        validation();
        if(document.getElementById("name").value!=""&&document.getElementById("username").value!=""&&document.getElementById("email").value!=""&&document.getElementById("phone").value!="")
        {
        var formdata=getdata();
        if(selectedRow==null)
        {
        insertdata(formdata);
        console.log("insert")

        }
        else
        {
        updateRecord(formdata);
        console.log("edit")
        }
        rowcount();
        resetdata();
        rowcount1();
        }
        else
        document.getElementById("val").innerHTML=" Please fill all information";
}
function getdata()
{
        var formdata={};
        formdata["id"]=x;
        formdata["name"]=document.getElementById("name").value;
        formdata["username"]=document.getElementById("username").value;
        formdata["email"]=document.getElementById("email").value;
        formdata["phone"]=document.getElementById("phone").value;
        return formdata;
}
function insertdata(data)
{
        var table = document.getElementById("Tdata").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.id;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.name;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.username;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.phone;
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = data.email;
    cell6 = newRow.insertCell(5);
    cell6.innerHTML = '<td><button onClick="onEdit(this)"  data-toggle="modal" data-target="#exampleModal" data-keyboard="false" data-backdrop="static">Edit</button> <button onClick="onDelete(this)" data-toggle="modal" data-target="#exampleModal1" data-keyboard="false" data-backdrop="static">Delete</button></td></tr>'
    
}
function resetdata()
{
        document.getElementById("name").value="";
        document.getElementById("username").value="";
        document.getElementById("email").value="";
        document.getElementById("phone").value="";
        selectedRow = null;
}

function onEdit(td) {
        document.getElementById("exampleModalLabel").innerHTML="Edit Details";
        document.getElementById("add").innerHTML="Edit";
        document.getElementById("val").innerHTML=""
        selectedRow = td.parentElement.parentElement;
        document.getElementById("name").value = selectedRow.cells[1].innerHTML;
        document.getElementById("username").value = selectedRow.cells[2].innerHTML;
        document.getElementById("email").value = selectedRow.cells[4].innerHTML;
        document.getElementById("phone").value = selectedRow.cells[3].innerHTML;
    }

function updateRecord(formdata) {
        selectedRow.cells[1].innerHTML = formdata.name;
        selectedRow.cells[2].innerHTML = formdata.username;
        selectedRow.cells[4].innerHTML = formdata.email;
        selectedRow.cells[3].innerHTML = formdata.phone;
    }

function onDelete(td) {
            row = td.parentElement.parentElement;
            pa=row.rowIndex;
            console.log(pa);
}

function fetchData(){
        
        fetch("https://jsonplaceholder.typicode.com/users")
        .then(res => {res.json()
        .then(data =>{console.log(data);
        if(data.length>0)
            {
              var temp="";
              var local_data="";
              if(!localStorage.getItem("data")){
                localStorage.setItem('data',data)
              }
              else
              {
              let newData= localStorage.getItem('data')
              let newData2=JSON.parse(newData);
              for(let i=0;i<data.length;i++)
              {
                temp+="<tr>";
                temp+="<td>"+newData2[i].id+"</td>";
                temp+="<td>"+newData2[i].name+"</td>";
                temp+="<td>"+newData2[i].username+"</td>";
                temp+="<td>"+newData2[i].phone+"</td>";
                temp+="<td>"+newData2[i].email+"</td>";
                temp+='<td><button onClick="onEdit(this)" data-toggle="modal" data-target="#exampleModal" data-keyboard="false" data-backdrop="static">Edit</button> <button data-toggle="modal" onClick="onDelete(this)" data-target="#exampleModal1" data-keyboard="false" data-backdrop="static">Delete</button></td></tr>';
                document.getElementById("total").innerHTML="count="+(i+1);
              }
              }
              x= data.length + 1;
                document.getElementById("data").innerHTML = temp;
                let myobj=JSON.stringify(data);
                localStorage.setItem("data",myobj)

        }
      }
        )
}
        )
}
      fetchData();
      function rowcount1()
      {
              var y=document.getElementById("Tdata").rows.length;
              if((y-1)===0)
              document.getElementById("data").innerHTML="<td colspan = '6' style='text-align:center;'>No Record Found!</td>";
              document.getElementById("total").innerHTML="total rows ="+(y-1);
      }
      function Modaldata() //to change the button name while edit and add
      {
              resetdata();
        document.getElementById("exampleModalLabel").innerHTML="Enter Details";
        document.getElementById("add").innerHTML="Add";
      }

      function validation(){
        'use strict'

        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.querySelectorAll('.needs-validation')
      
        // Loop over them and prevent submission
        Array.prototype.slice.call(forms)
          .forEach(function (form) {
            form.addEventListener('submit', function (event) {
              if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
              }
      
              form.classList.add('was-validated')
            }, false)
          })
      }


     
    