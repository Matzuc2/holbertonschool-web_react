import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import rootReducer from '../app/rootReducer';

export function renderWithProviders(
  ui,
  { preloadedState, store = configureStore({ reducer: rootReducer, preloadedState }) } = {}
) {
  const Wrapper = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );

  return { store, ...render(ui, { wrapper: Wrapper }) };
}
