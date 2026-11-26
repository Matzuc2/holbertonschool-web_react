import { Profiler } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import mockAxios from 'jest-mock-axios';
import Notifications from './Notifications';
import notificationsSlice, { fetchNotifications } from '../../features/notifications/notificationsSlice';


describe('Notifications', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        notifications: notificationsSlice,
      },
    });
  });

  afterEach(() => {
    mockAxios.reset();
  });

  test('renders without crashing', async () => {
    const promise = store.dispatch(fetchNotifications());

    mockAxios.mockResponse({
      data: {
        notifications: [
          { id: 1, type: 'default', value: 'New course available' },
          { id: 2, type: 'urgent', value: 'New resume available' },
          { id: 3, type: 'urgent', value: 'Placeholder' },
        ],
      },
    });

    await promise;

    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    expect(screen.getByText(/your notifications/i)).toBeInTheDocument();
    expect(screen.getByText('New course available')).toBeInTheDocument();
    expect(screen.getByText('New resume available')).toBeInTheDocument();
  });

  test('toggles the Aphrodite visible class when clicking the title', async() => {
    const promise = store.dispatch(fetchNotifications());

    mockAxios.mockResponse({
      data: {
        notifications: [
          { id: 1, type: 'default', value: 'New course available' },
          { id: 2, type: 'urgent', value: 'New resume available' },
          { id: 3, type: 'urgent', value: 'Placeholder' },
        ],
      },
    });

    await promise;

    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    const drawer = screen.getByText(/here is the list of notifications/i).parentElement;
    const initialClassName = drawer.className;

    fireEvent.click(screen.getByText(/your notifications/i));
    expect(drawer.className).not.toBe(initialClassName);

    fireEvent.click(screen.getByText(/your notifications/i));
    expect(drawer.className).toBe(initialClassName);
  });

  test('close drawer on close button', async () => {
    const promise = store.dispatch(fetchNotifications());

    mockAxios.mockResponse({
      data: {
        notifications: [
          { id: 1, type: 'default', value: 'New course available' },
          { id: 2, type: 'urgent', value: 'New resume available' },
          { id: 3, type: 'urgent', value: 'Placeholder' },
        ],
      },
    });

    await promise;

    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    expect(screen.getByText('New course available')).toBeInTheDocument();
  });

  test('marks notification as read', async () => {
    const promise = store.dispatch(fetchNotifications());

    mockAxios.mockResponse({
      data: {
        notifications: [
          { id: 1, type: 'default', value: 'New course available' },
          { id: 2, type: 'urgent', value: 'New resume available' },
          { id: 3, type: 'urgent', value: 'Placeholder' },
        ],
      },
    });

    await promise;

    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    const firstNotification = screen.getByText('New course available');

    fireEvent.click(firstNotification);

    await waitFor(() => {
      const updatedNotifications = screen.getAllByRole('listitem');
      expect(updatedNotifications).toHaveLength(2);
    });
  });

  test('renders with displayDrawer true', async () => {
    const promise = store.dispatch(fetchNotifications());

    mockAxios.mockResponse({
      data: {
        notifications: [
          { id: 1, type: 'default', value: 'New course available' },
          { id: 2, type: 'urgent', value: 'New resume available' },
          { id: 3, type: 'urgent', value: 'Placeholder' },
        ],
      },
    });

    await promise;

    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    expect(screen.getByText(/your notifications/i)).toBeInTheDocument();
  });

  test('does not commit another render when drawer visibility is toggled', async () => {
    const promise = store.dispatch(fetchNotifications());

    mockAxios.mockResponse({
      data: {
        notifications: [
          { id: 1, type: 'default', value: 'New course available' },
          { id: 2, type: 'urgent', value: 'New resume available' },
          { id: 3, type: 'urgent', value: 'Placeholder' },
        ],
      },
    });

    await promise;
    const onRender = jest.fn();

    render(
      <Provider store={store}>
        <Profiler id="notifications" onRender={onRender}>
          <Notifications />
        </Profiler>
      </Provider>
    );

    fireEvent.click(screen.getByText(/your notifications/i));
    fireEvent.click(screen.getByText(/your notifications/i));

    expect(onRender).toHaveBeenCalledTimes(1);
  });
});