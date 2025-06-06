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

console.log(teachClass("Math"));
console.log(teachClass("History"));
