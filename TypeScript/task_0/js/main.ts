interface Student{
    firstName: String;
    lastName: String;
    age: Number;
    location: String;
}

const student1: Student = {
    firstName: "Josh",
    lastName: "Dawn",
    age: 19,
    location: "New-York"
}

const student2: Student = {
    firstName: "Joush",
    lastName: "Down",
    age: 19,
    location: "New-York"
}

let studentList = [student1, student2]

const body = document.body,
      tbl = document.createElement('table');

      for(let i in studentList) {
        const tr = tbl.insertRow()
        const td = tr.insertCell();
        td.appendChild(document.createTextNode(`Cell I${i}/J${j}`));
      }