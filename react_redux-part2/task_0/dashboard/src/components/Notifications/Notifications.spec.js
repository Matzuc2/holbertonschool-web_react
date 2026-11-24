import { configureStore } from "@reduxjs/toolkit";
import { fireEvent, render, screen, act } from "@testing-library/react";
import { Provider } from "react-redux";
import Notifications from "./Notifications";
import notificationsReducer, {
  markNotificationAsRead,
} from "../../features/notifications/notificationsSlice";
import { getLatestNotification } from "../../utils/utils";

jest.mock("../../utils/utils", () => ({
  getLatestNotification: jest.fn(),
}));

const renderNotifications = (notifications = []) => {
  const store = configureStore({
    reducer: {
      notifications: notificationsReducer,
    },
    preloadedState: {
      notifications: {
        notifications,
      },
    },
  });

  return {
    store,
    ...render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    ),
  };
};

describe("Notifications component", () => {
  beforeEach(() => {
    getLatestNotification.mockReturnValue(
      "<strong>Urgent requirement</strong> - complete by EOD"
    );
  });

  test("renders the notifications title", () => {
    renderNotifications([
      { id: 1, type: "default", value: "New course available" },
    ]);

    expect(
      screen.getByText(/Here is the list of notifications/i)
    ).toBeInTheDocument();
  });

  test("renders the close button", () => {
    renderNotifications([
      { id: 1, type: "default", value: "New course available" },
    ]);

    expect(
      screen.getByRole("button", { name: /close/i })
    ).toBeInTheDocument();
  });

  test("displays 3 notification items", () => {
    renderNotifications([
      { id: 1, type: "default", value: "New course available" },
      { id: 2, type: "urgent", value: "New resume available" },
      { id: 3, type: "urgent", html: { __html: getLatestNotification() } },
    ]);

    expect(screen.getAllByRole("listitem")).toHaveLength(3);
  });

  test("displays the empty notifications paragraph", () => {
    renderNotifications([]);

    expect(
      screen.getByText(/no new notifications for now/i)
    ).toBeInTheDocument();
    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
  });

  test('always displays "Your notifications"', () => {
    const { rerender } = renderNotifications([]);

    expect(
      screen.getByText(/your notifications/i)
    ).toBeInTheDocument();

    rerender(
      <Provider
        store={configureStore({
          reducer: { notifications: notificationsReducer },
          preloadedState: {
            notifications: {
              notifications: [
                { id: 1, type: "default", value: "New course available" },
              ],
            },
          },
        })}
      >
        <Notifications />
      </Provider>
    );

    expect(
      screen.getByText(/your notifications/i)
    ).toBeInTheDocument();
  });

  test("toggles the drawer using the Aphrodite visible style", () => {
    renderNotifications([
      { id: 1, type: "default", value: "New course available" },
    ]);

    const title = screen.getByText(/here is the list of notifications/i);
    const drawer = title.closest("div");

    const initialClassName = drawer.className;

    fireEvent.click(screen.getByText(/your notifications/i));
    expect(drawer.className).not.toBe(initialClassName);

    fireEvent.click(screen.getByRole("button", { name: /close/i }));
    expect(drawer.className).toBe(initialClassName);
  });

  test("marks a notification as read", () => {
    renderNotifications([
      { id: 1, type: "default", value: "New course available" },
    ]);

    fireEvent.click(screen.getByRole("listitem"));

    expect(
      screen.queryByText("New course available")
    ).not.toBeInTheDocument();
  });

  test("marks the clicked notification as read in the Redux store", () => {
    const { store } = renderNotifications([
      { id: 1, type: "default", value: "New course available" },
      { id: 2, type: "urgent", value: "New resume available" },
    ]);

    act(() => {
      store.dispatch(markNotificationAsRead(1));
    });

    expect(
      screen.queryByText("New course available")
    ).not.toBeInTheDocument();

    expect(
      screen.getByText("New resume available")
    ).toBeInTheDocument();
  });

  test("updates when notification data changes", () => {
    const { store } = renderNotifications([
      { id: 1, type: "default", value: "Notification 1" },
    ]);

    expect(screen.getAllByRole("listitem")).toHaveLength(1);

    act(() => {
      store.dispatch({
        type: "notifications/fetchNotifications/fulfilled",
        payload: [
          { id: 1, type: "default", value: "Notification 1" },
          { id: 2, type: "urgent", value: "Notification 2" },
        ],
      });
    });

    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  test("maintains notification content when data is unchanged", () => {
    const notifications = [
      { id: 1, type: "default", value: "Notification 1" },
      { id: 2, type: "urgent", value: "Notification 2" },
    ];

    renderNotifications(notifications);

    const firstListItems = screen.getAllByRole("listitem");

    expect(firstListItems).toHaveLength(2);
    expect(firstListItems[0].textContent).toBe("Notification 1");
    expect(firstListItems[1].textContent).toBe("Notification 2");
  });
});
