// This file contains two interfaces, MajorCredits and MinorCredits. Each interface defines a property credits of type number and a property brand of type string for unique identification. It also includes two functions: sumMajorCredits and sumMinorCredits. The sumMajorCredits function takes two arguments, subject1 and subject2, and returns a MajorCredits value by summing the credits of the two subjects. The sumMinorCredits function similarly takes two arguments and returns a MinorCredits value by summing the credits.

interface MajorCredits {
    credits: number;
    brand: string;
}

interface MinorCredits {
    credits: number;
    brand: string;
}

function sumMajorCredits(subject1: MajorCredits, subject2: MajorCredits): MajorCredits {
    return {
        credits: subject1.credits + subject2.credits,
        brand: `${subject1.brand}+${subject2.brand}`//return name of two subjects
    };
}

function sumMinorCredits(subject1: MinorCredits, subject2: MinorCredits): MinorCredits {
    return {
        credits: subject1.credits + subject2.credits,
        brand: `${subject1.brand}+${subject2.brand}`//return name of two subjects
    };
}