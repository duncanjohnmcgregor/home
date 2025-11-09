# Life Manager Frontend

A comprehensive React application built with TypeScript and Material-UI for managing various aspects of life including finances, health, home tasks, and social connections.

## Tech Stack

- **Framework**: React 18.2.0 with TypeScript
- **UI Library**: Material-UI (MUI) v5
- **State Management**: Redux Toolkit
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Form Management**: React Hook Form
- **Date Utilities**: date-fns
- **Charts**: Recharts

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── common/         # Common components (Header, Sidebar, Loading, etc.)
│   ├── forms/          # Form components
│   └── charts/         # Chart components
├── pages/              # Route components
│   ├── auth/           # Authentication pages (Login, Register, ForgotPassword)
│   ├── dashboard/      # Dashboard page
│   ├── finances/       # Finance management pages
│   ├── health/         # Health tracking pages
│   ├── home/           # Home management pages
│   └── social/         # Social contacts pages
├── store/              # Redux store
│   ├── slices/         # Redux slices (auth, notification)
│   ├── store.ts        # Store configuration
│   └── hooks.ts        # Typed Redux hooks
├── services/           # API services
│   ├── apiClient.ts    # Axios instance with interceptors
│   └── authService.ts  # Authentication API calls
├── utils/              # Utility functions
│   ├── validators.ts   # Form validation functions
│   └── formatters.ts   # Data formatting functions
├── hooks/              # Custom React hooks
│   └── useAuth.ts      # Authentication hook
├── types/              # TypeScript type definitions
│   ├── auth.types.ts   # Authentication types
│   ├── common.types.ts # Common types
│   └── modules.types.ts # Module-specific types
└── theme/              # Material-UI theme configuration
    └── theme.ts        # Custom theme
```

## Key Features

### 1. Authentication System
- **Login**: Email/password authentication with validation
- **Register**: User registration with form validation
- **Forgot Password**: Password reset functionality
- **Protected Routes**: Automatic redirect to login for unauthenticated users

### 2. Responsive Design
- **Mobile-first approach**: Optimized for mobile (360px+), tablet (768px+), and desktop (1200px+)
- **Responsive navigation**: Drawer navigation on mobile, permanent sidebar on desktop
- **Material-UI Grid system**: Flexible layout across all breakpoints

### 3. State Management
- **Redux Toolkit**: Centralized state management
- **Auth Slice**: User authentication state
- **Notification Slice**: Global notification system
- **Typed Hooks**: Type-safe Redux hooks (useAppDispatch, useAppSelector)

### 4. API Integration
- **Axios Client**: Configured with base URL and interceptors
- **Request Interceptor**: Automatically adds JWT token to requests
- **Response Interceptor**: Handles common errors (401, 403, 404, 500)
- **Error Handling**: Graceful error handling with user notifications

### 5. Component Library

#### Common Components
- **LoadingSpinner**: Loading indicator with optional fullscreen mode
- **ErrorBoundary**: Catches and displays React errors gracefully
- **NotificationSnackbar**: Global notification system with auto-dismiss
- **Header**: Top navigation bar with user menu
- **Sidebar**: Responsive sidebar navigation
- **MainLayout**: Main application layout with Header and Sidebar
- **PrivateRoute**: Route wrapper for protected pages

#### Page Components
- **Dashboard**: Overview of all modules with summary cards
- **Finances**: Income/expense tracking with transaction list
- **Health**: Fitness, nutrition, and wellness tracking
- **Home**: Household task and inventory management
- **Social**: Contact management and event tracking

### 6. Form Validation
- **Email validation**: RFC-compliant email format checking
- **Password validation**: Minimum 8 characters with letters and numbers
- **Required field validation**: Ensures all required fields are filled
- **Custom validators**: Extensible validation system

### 7. Utility Functions

#### Validators
- `validateEmail()`: Email format validation
- `validatePassword()`: Password strength validation
- `validateRequired()`: Required field validation
- `validateNumber()`: Number validation
- `validatePositiveNumber()`: Positive number validation

#### Formatters
- `formatCurrency()`: Currency formatting (default USD)
- `formatDate()`: Date formatting with custom patterns
- `formatDateTime()`: Date and time formatting
- `formatRelativeTime()`: Relative time (e.g., "2 hours ago")
- `truncateText()`: Text truncation with ellipsis
- `capitalize()`: First letter capitalization

## Available Scripts

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### `npm test`
Launches the test runner in interactive watch mode

### `npm run build`
Builds the app for production to the `build` folder

### `npm run eject`
**Note: this is a one-way operation!** Ejects from Create React App

## Environment Variables

Create a `.env` file in the frontend directory:

```env
REACT_APP_API_URL=http://localhost:3000/api
```

## Responsive Breakpoints

- **xs**: 0px - 599px (Mobile)
- **sm**: 600px - 899px (Tablet)
- **md**: 900px - 1199px (Small Desktop)
- **lg**: 1200px - 1535px (Desktop)
- **xl**: 1536px+ (Large Desktop)

## Theme Configuration

The app uses a custom Material-UI theme with:
- **Primary Color**: Blue (#1976d2)
- **Secondary Color**: Purple (#9c27b0)
- **Custom Typography**: System font stack
- **Consistent Spacing**: 8px base unit
- **Border Radius**: 8px default

## Redux Store Structure

```typescript
{
  auth: {
    user: User | null,
    token: string | null,
    isAuthenticated: boolean,
    isLoading: boolean,
    error: string | null
  },
  notification: {
    notifications: Notification[]
  }
}
```

## API Service Layer

All API calls go through the centralized `apiClient` which:
1. Adds JWT token to all requests
2. Handles 401 errors by redirecting to login
3. Provides consistent error handling
4. Supports request/response interceptors

## Custom Hooks

### `useAuth()`
Provides authentication functionality:
- `login(credentials)`: Login user
- `register(data)`: Register new user
- `logout()`: Logout current user
- `user`: Current user object
- `isAuthenticated`: Authentication status
- `isLoading`: Loading state
- `error`: Error message

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.example .env
   # Edit .env with your API URL
   ```

3. **Start development server**:
   ```bash
   npm start
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## Development Guidelines

### Adding a New Page
1. Create page component in `src/pages/[module-name]/`
2. Add route in `src/App.tsx`
3. Add navigation item in `src/components/common/Sidebar.tsx`

### Adding a New Redux Slice
1. Create slice in `src/store/slices/`
2. Add reducer to `src/store/store.ts`
3. Export actions from `src/store/index.ts`

### Adding a New API Service
1. Create service in `src/services/`
2. Import and use `apiClient` for requests
3. Define TypeScript types in `src/types/`

## Testing Responsiveness

Test the application at these viewport widths:
- **Mobile**: 360px, 375px, 414px
- **Tablet**: 768px, 834px
- **Desktop**: 1200px, 1440px, 1920px

Use Chrome DevTools or Firefox Responsive Design Mode for testing.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Considerations

- **Code Splitting**: React.lazy() for route-based code splitting
- **Memoization**: Use React.memo() for expensive components
- **Redux Performance**: Selectors for derived state
- **Image Optimization**: Use appropriate image formats and sizes

## Accessibility

- Semantic HTML elements
- ARIA labels where needed
- Keyboard navigation support
- Color contrast compliance
- Screen reader friendly

## Future Enhancements

- [ ] Dark mode support
- [ ] Internationalization (i18n)
- [ ] PWA capabilities
- [ ] Offline support
- [ ] Advanced data visualization
- [ ] Export data functionality
- [ ] Real-time updates with WebSockets
- [ ] Advanced filtering and search

## Troubleshooting

### Build Errors
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Clear cache: `npm cache clean --force`

### TypeScript Errors
- Check type definitions in `src/types/`
- Ensure imports are correct

### Redux Errors
- Verify store configuration
- Check action creators and reducers
- Use Redux DevTools for debugging

## License

This project is part of the Life Manager Application.

## Support

For issues and questions, please refer to the main project repository.
