import CourseListRow from "./CourseListRow"

function CourseList({courses = []}){
    return(
        <table id="CourseList">
            <thead>
                <CourseListRow textFirstCell="Available courses" isHeader={true}/>
                <CourseListRow textFirstCell="Course name" textSecondCell="Credit" isHeader={true}/>
            </thead>
            <tbody>
                {courses[0] ?
                    courses.map((course)=>{
                        return(<CourseListRow textFirstCell={course.name} textSecondCell={course.credit}/>)
                    }):

                    <CourseListRow textFirstCell="No course available yet"isHeader={true}/>
                    
                }
            </tbody>
        </table>
    )
}
export default CourseList