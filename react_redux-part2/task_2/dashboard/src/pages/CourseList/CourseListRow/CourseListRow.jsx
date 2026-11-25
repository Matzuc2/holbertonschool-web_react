import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  headerRow: {
    backgroundColor: '#deb5b545'
  },
  row: {
    backgroundColor: '#f5f5f5ab'
  }
});

export default function CourseListRow(
{
    id = '',
    isHeader = false,
    textFirstCell = '',
    textSecondCell = null,
    changeRow = () => {},
    isSelected = Boolean
}
) {
  const rowStyle = isHeader ? styles.headerRow : styles.row;

  return (
    isHeader ? (
      <tr className={css(rowStyle)}>
        <th colSpan={textSecondCell ? 1 : 2}>{textFirstCell}</th>
        {textSecondCell ? <th>{textSecondCell}</th> : null}
      </tr>
    ) : (
      <tr className={css(rowStyle)}>
        <td>{textFirstCell}</td>
        <td>{textSecondCell}</td>
        <td><input type='checkbox' checked={isSelected} onChange={(event) => changeRow(id, event.target.checked)}></input></td>
      </tr>
    )
  )
}
