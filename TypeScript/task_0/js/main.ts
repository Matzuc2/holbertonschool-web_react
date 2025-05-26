// je créer mon interface
interface Student{
    firstName: String;
    lastName: String;
    age: Number;
    location: String;
}
// puis mes deux objets
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

// je créer ma liste avec les deux objets précédents
let studentList = [student1, student2];

// puis je créer mon HTML
const body = document.body;
const tbl = document.createElement('table');

// d'abord le header de ma table
const header = tbl.insertRow()
const th1 = document.createElement("th");
th1.textContent = 'First Name'
const th2 = document.createElement("th")
th2.textContent = 'Last Name'
header.append(th1)
header.append(th2)

// ensuite ce que contient les deux premiers champs
//je boucle autant que le nombre d'objets dans ma list
for (let i in studentList) {
    const tr = tbl.insertRow();
    const td1 = tr.insertCell();
    td1.textContent = studentList[i].firstName.toString();
    const td2 = tr.insertCell();
    td2.textContent = studentList[i].location.toString();
}

//j'ajoute ma table dans ma list
body.appendChild(tbl);