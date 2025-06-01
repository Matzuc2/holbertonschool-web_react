/// <reference path="Subject.ts" />

namespace Subjects {
    // Using declaration merging to add an optional attribute to Teacher interface
    export interface Teacher {
        experienceTeachingJava?: number;
    }
    
    export class Java extends Subject {
        getRequirements(): string {
            return "Here is the list of requirements for Java";
        }
        
        getAvailableTeacher(): string {
            if (this.teacher.experienceTeachingJava && this.teacher.experienceTeachingJava > 0) {
                return `Available Teacher: ${this.teacher.firstName}`;
            } else {
                return "No available teacher";
            }
        }
    }
}
