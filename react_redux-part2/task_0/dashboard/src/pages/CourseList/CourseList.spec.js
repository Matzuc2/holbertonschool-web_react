import { screen } from '@testing-library/react';
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

test('it should render the CourseList component with 1 row', () => {
  renderWithProviders(<CourseList />);

  const rowElement = screen.getAllByRole('row');
  const rowText = screen.getByText(/No course available yet/i);

  expect(rowElement).toHaveLength(1)
  expect(rowText).toBeInTheDocument()
});
