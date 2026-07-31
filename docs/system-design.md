# Horizon System Design Summary

## 1. Architecture Overview

Horizon is a React + TypeScript dashboard-style application built with Vite. Its structure is intentionally modular so each feature can be developed and reasoned about independently.

### Core architectural layers

- Presentation layer: page components, feature screens, and reusable UI primitives such as cards, inputs, form wrappers, and layout components
- State layer: Redux Toolkit for application-wide state and React Context for UI-specific state that does not need global persistence
- Data layer: Axios-based API client with mocked backend responses through MSW during development
- Routing layer: React Router for navigation and query-string synchronization

This separation keeps page logic focused on user interaction while leaving data access and state updates to dedicated layers.

## 2. Runtime Composition

The application boots through a small provider chain inside the app entry point.

### Startup sequence

1. The entry point initializes MSW in development mode.
2. The app root is wrapped with providers:
   - Redux Provider for shared state access
   - BrowserRouter for client-side routing
   - DataProvider for dashboard-oriented UI state
   - LayoutProvider for sidebar state
3. The shell layout renders the shared navigation and delegates content to the active route component.

### Why this structure is used

- The Redux store provides a predictable central state model for cross-page behavior.
- Context is used only where local component trees benefit from state sharing without full store complexity.
- The route shell keeps the app UI consistent across all pages.

## 3. Component Responsibilities

### App shell

The main app shell renders the common layout, including the sidebar, drawer, main content area, and toast container. It also reads the current theme from Redux and applies the correct visual theme to the whole application.

### Page components

Each page handles a specific business concern:

- Dashboard: displays workspace summary cards and manages active dashboard tabs
- Projects: renders project-related information and uses theme-aware UI elements
- Analytics: presents a reporting form and validates user input through a custom hook
- Tasks: provides filtering, searching, and derived task-list rendering
- Settings: exposes preferences for theme, language, and font size
- NotFound: acts as a fallback page for invalid routes

### Reusable UI layer

Shared components such as Form, Card, Input, Select, Sidebar, Drawer, and Workspace provide consistent presentation and reduce duplication across pages.

## 4. Global Store Topology

The project uses Redux Toolkit with a compact state topology that is easy to extend.

| Concern | Slice | Purpose |
| --- | --- | --- |
| Dashboard | dashboard | Tracks active dashboard tab, navigation history, and history index |
| Filters | filter | Stores search text, priority, and status filters used by the tasks page |
| Preferences | settings | Stores theme, language, font size, and collapsed sidebar state |
| Notification | notification | Stores transient UI feedback state for toasts and alerts |

### State persistence pattern

The settings slice reads from localStorage during initialization and writes back whenever preferences are changed. This makes the app feel more personalized and prevents the user from losing choices on refresh.

### Why not everything is in Redux

Shared UI state such as sidebar openness and panel layout is kept in React Context because it is local to the UI tree and does not require the full Redux lifecycle.

## 5. Custom Hooks Design

The hooks encapsulate reusable behavior and keep pages easier to read.

### useAnalyticsForm

This hook owns:

- form field state
- validation rules and error messages
- touched-field tracking
- debounced validation for smoother UX
- final form submission handling

It also dispatches a notification action when the form passes validation, which keeps the page component focused on rendering instead of business logic.

### useDebounce

This hook delays updates to a derived value so expensive or repetitive logic does not run on every keystroke. It is used to avoid repeated validation work as the user types.

### useUnsafeContent

This hook detects suspicious input patterns such as embedded scripts or inline JavaScript. It is used as a defensive guard before accepting user-entered content.

### useValidatedRoute

This hook centralizes query-parameter validation. It makes sure the search filters always resolve to allowed values and safely normalizes invalid query values back to defaults.

## 6. Routing Logic

Routing is centralized in the app routes module and is intentionally simple.

### Route map

- / → Dashboard
- /projects → Projects
- /analytics → Analytics
- /tasks → Tasks
- /settings → Settings
- /not-found → NotFound
- * → Catch-all NotFound

### Routing behavior

- Dashboard tab selection is synchronized with the URL query string so the current tab can be shared or restored later.
- Task filters are mirrored into the URL so the current view remains bookmarkable.
- Unknown or invalid routes fall back to the not-found page.

### Navigation design choice

The route setup keeps navigation declarative and easy to extend. New pages can be added by introducing a new route definition without changing the app shell structure.

## 7. Data Flow Architecture

### Request lifecycle

1. A page component initiates a data request through a feature-specific API helper.
2. The helper calls the shared Axios client.
3. The Axios client applies interceptors for authentication, error handling, and simulated error modes.
4. In development, MSW intercepts the request and returns mock data.
5. The page stores the response in local component state or a Redux slice and re-renders the UI.

### Example: tasks page flow

- The Tasks page reads filter values from the Redux store.
- It uses those values to derive the visible list of tasks.
- The URL query string is updated to reflect the current filter state.
- The page renders the filtered list using the derived data.

### Example: analytics form flow

- The Analytics page uses the custom form hook.
- The hook validates fields and updates errors.
- Once the form is valid, it dispatches a notification action.
- The notification state is consumed by the toast container and shown to the user.

## 8. Data Access Patterns

### Local component state

Used for page-specific concerns that do not need to be shared outside that view, such as loading flags, request errors, and temporary UI data.

### Redux state

Used for cross-page concerns such as theme, dashboard context, task filters, and notifications.

### Context state

Used for UI-specific concerns such as sidebar toggling and panel layout metadata.

## 9. Implementation Notes

### Strengths

- Clear separation of concerns between UI, state, and data access
- Flexible structure that can grow as new features are added
- Good support for mock-driven development through MSW
- Reusable hooks reduce duplication in form and routing logic

### Areas for future improvement

- Introduce a more formal feature-based folder structure for larger-scale growth
- Centralize API request logic further with a dedicated service layer
- Consider replacing some context state with Redux if the app grows more complex
- Add stronger typing around shared data models to reduce any ambiguity in API responses

## 10. Summary

Horizon is a well-structured React application that combines Redux, React Router, custom hooks, and mock API services into a cohesive dashboard experience. The architecture is intentionally simple but modular, which makes it suitable for continued feature growth while remaining easy to understand for developers working on the project.