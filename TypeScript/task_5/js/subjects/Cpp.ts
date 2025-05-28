/// <reference path="Subject.ts" />

namespace Subjects {
    // Using declaration merging to add an optional attribute to Teacher interface
    export interface Teacher {
        experienceTeachingC?: number; //optional for every teacher
    }
    
    export class Cpp extends Subject {
    getRequirements(): string {
      return "Here is the list of requirements for Cpp";
    }

    getAvailableTeacher(): string {
      if (this.teacher.experienceTeachingC && this.teacher.experienceTeachingC > 0) {
        //verify if teacher has experience in c or not 
        return `Available Teacher: ${this.teacher.firstName}`;
      }
      else{
        return "No available teacher";
      }
    }
  }
}