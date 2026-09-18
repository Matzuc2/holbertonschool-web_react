function CourseListRow({isHeader = false, textFirstCell= "", textSecondCell = null}){
    return (
        <tr>
            {isHeader == true ? (
                textSecondCell ? 
                <>
                    <th>
                        {textFirstCell}
                    </th>
                    <th>
                        {textSecondCell}
                    </th>
                </>
                :
                <th colSpan={2}>
                    {textFirstCell}
                </th>
            ):
            (<>
                <td>{textFirstCell}</td>
                <td>{textSecondCell}</td>
            </>)
            }
        </tr>
    )
}

export default CourseListRow