import { fireEvent, screen } from '@testing-library/react';
import CourseList from './CourseList';
import { renderWithProviders } from '../../tests/testUtils';

test('it should render the CourseList component with 5 rows', () => {
  renderWithProviders(<CourseList />, {
    preloadedState: {
      courses: {
        courses: [
          { id: 1, name: 'ES6', credit: 60 },
          { id: 2, name: 'Webpack', credit: 20 },
          { id: 3, name: 'React', credit: 40 },
        ],
      },
    },
  });

  const rowElements = screen.getAllByRole('row');

  expect(rowElements).toHaveLength(5)
})

test('checkboxes update the selected course state', () => {
  const { store } = renderWithProviders(<CourseList />, {
    preloadedState: {
      courses: {
        courses: [
          { id: 1, name: 'ES6', credit: 60, isSelected: false },
          { id: 2, name: 'Webpack', credit: 20, isSelected: false },
        ],
      },
    },
  });
  const checkbox = screen.getByRole('checkbox', { name: 'ES6' });

  fireEvent.click(checkbox);
  expect(store.getState().courses.courses[0].isSelected).toBe(true);
  expect(checkbox).toBeChecked();

  fireEvent.click(checkbox);
  expect(store.getState().courses.courses[0].isSelected).toBe(false);
  expect(checkbox).not.toBeChecked();
});

test('it should render the CourseList component with 1 row', () => {
  renderWithProviders(<CourseList />);

  const rowElement = screen.getAllByRole('row');
  const rowText = screen.getByText(/No course available yet/i);

  expect(rowElement).toHaveLength(1)
  expect(rowText).toBeInTheDocument()
});
