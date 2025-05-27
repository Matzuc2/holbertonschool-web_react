interface Teacher {
    readonly firstName: string;
    readonly lastName: string;
    location: string;
    [key: string]: any;
}

const teacher3: Teacher = {
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
