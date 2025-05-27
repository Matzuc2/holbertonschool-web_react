interface Teachers {
    readonly firstName: string;
    readonly lastName: string;
    location: string;
    [key: string]: any;
}

const teacher3: Teachers = {
  firstName: 'John',
  fullTimeEmployee: false,
  lastName: 'Doe',
  location: 'London',
  contract: false,
};

console.log(teacher3);

// should print
// Object
// contract: false+
// firstName: "John"
// fullTimeEmployee: false
// lastName: "Doe"
// location: "London"
interface Directors {
    readonly firstName: string;
    readonly lastName: string;
    location: string;
    numberOfReports: number;
    [key: string]: any;
}

const director1: Directors = {
  firstName: 'John',
  lastName: 'Doe',
  location: 'London',
  fullTimeEmployee: true,
  numberOfReports: 17,
};

console.log(director1);


interface printTeacherFunction {
  (firstName: string , lastName: string): string;
}

const printTeacher: printTeacherFunction = (firstName, lastName) => {
  const chara = firstName[0];
  return (`${chara}. ${lastName}`) 
}

console.log(printTeacher(teacher3.firstName, teacher3.lastName));

interface StudentClassI{
  firstName: string,
  lastName: string,
  workOnHomework(): string,
  displayName(): string
}
class StudentClass implements StudentClassI{
  firstName: string;
  lastName: string;

  constructor(firstName: string, lastName: string) 
  {
    this.lastName = lastName
    this.firstName = firstName 
  }

  workOnHomework(): string {
    return ("Currently working")
  }

  displayName(): string {
   return this.firstName
  }
}
// Interface for the class methods and properties
interface StudentClassInterface {
  firstName: string;
  lastName: string;
  workOnHomework(): string;
  displayName(): string;
}

// Interface for the constructor arguments
interface StudentConstructorArgs {
  firstName: string;
  lastName: string;
}


const student = new StudentClass('John', 'Doe');
console.log(student.displayName());
console.log(student.workOnHomework());

interface DirectorInterface{
  workFromHome(): string;
  getCoffeeBreak(): string;
  workDirectorTasks(): string;
}

interface TeacherInterface{
  workFromHome(): string;
  getCoffeeBreak(): string;
  workTeacherTasks(): string;
}


class Director implements DirectorInterface{
workFromHome(): string{
  return ("Working from home")
}
getCoffeeBreak(): string{
  return ("Getting a coffee break")
}
workDirectorTasks(): string{
  return ("Getting to director tasks")
}
}

class Teacher implements TeacherInterface{
workFromHome(): string{
  return ("Working from home")
}
getCoffeeBreak(): string{
  return ("Getting a coffee break")
}
workTeacherTasks(): string{
  return ("Getting to work")
}
}

function createEmployee(salary: number | string): Teacher | Director{
  if (typeof(salary) === "number" && salary < 500){
    return (new Teacher)
  }
  else{
    return (new Director)
  }
}
console.log(createEmployee(200));
console.log(createEmployee(1000));
console.log(createEmployee('$500'));

function isDirector(employee: Teacher | Director): employee is Director {
  return employee instanceof Director;
}

function executeWork(employee: Teacher | Director): string{
  if (isDirector(employee)){
    return employee.workDirectorTasks();
  }
  else{
    return employee.workTeacherTasks();
  }
}


console.log(executeWork(createEmployee(200)));
console.log(executeWork(createEmployee(1000)));

type Subjects = "Math" | "History";

function teachClass(todayClass: Subjects): string {
  if (todayClass === "Math") {
    return "Teaching Math";
  } else if (todayClass === "History") {
    return "Teaching History";
  } else {
    return "Invalid subject";
  }
}

// Test cases
console.log(teachClass("Math"));
console.log(teachClass("History"));