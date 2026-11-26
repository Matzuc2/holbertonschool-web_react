import { fireEvent, render, screen, within } from '@testing-library/react';
import CourseListRow from './CourseListRow';

test('it should display 1 "th" element with colspan=2 when isHeader is true and textSecondCell is null', () => {
  render(
    <table>
      <tbody>
        <CourseListRow isHeader={true} textFirstCell="First" textSecondCell={null} />
      </tbody>
    </table>
  )

  const thElement = screen.getByRole('columnheader');

  expect(thElement).toHaveAttribute('colSpan', '2');
});

test('it should display 2 "th" elements when isHeader is true and textSecondCell is not null', () => {
  render(
    <table>
      <tbody>
        <CourseListRow isHeader={true} textFirstCell="First" textSecondCell="Second" />
      </tbody>
    </table>
  )

  const thElements = screen.getAllByRole('columnheader');

  expect(thElements).toHaveLength(2);
});

test('it should render 2 "td" elements inside a "tr" element when isHeader is false', () => {
  render(
    <table>
      <tbody>
        <CourseListRow isHeader={false} textFirstCell="Data1" textSecondCell="Data2" />
      </tbody>
    </table>
  )

  const trElement = screen.getByRole('row');
  const tdElements = within(trElement).getAllByRole('cell');

  expect(trElement).toBeInTheDocument();
  expect(tdElements).toHaveLength(2);
});

test('checkbox changes call onChangeRow with the course id and checked state', () => {
  const onChangeRow = jest.fn();
  render(
    <table>
      <tbody>
        <CourseListRow
          id="course-1"
          textFirstCell="ES6"
          textSecondCell="60"
          onChangeRow={onChangeRow}
        />
      </tbody>
    </table>
  );
  const checkbox = screen.getByRole('checkbox', { name: 'ES6' });

  fireEvent.click(checkbox);
  expect(onChangeRow).toHaveBeenCalledWith('course-1', true);
});
