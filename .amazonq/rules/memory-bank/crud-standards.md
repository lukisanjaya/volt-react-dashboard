# Volt React Dashboard - CRUD Standards

## Overview
This document outlines the standardized patterns for implementing CRUD (Create, Read, Update, Delete) operations in the Volt React Dashboard, based on the products module implementation.

## Architecture Patterns

### 1. API Service Layer
- **Centralized API management** using Axios with interceptors
- **Token-based authentication** with automatic header injection
- **Consistent error handling** across all API calls
- **RESTful endpoint structure** following standard conventions

### 2. State Management
- **Local component state** using React hooks
- **Loading states** for better UX during API calls
- **Error handling** with user-friendly messages
- **Toast notifications** for operation feedback

### 3. Form Handling
- **Controlled components** with useState for form data
- **Validation** at form submission level
- **Loading states** during form submission
- **Success/Error feedback** via toast notifications

## Implementation Standards

### File Organization
```
src/
├── services/
│   └── api.js                 # Centralized API service
├── components/
│   └── Toast.js              # Reusable toast component
├── pages/
│   └── [module]/
│       ├── index.js          # Export all module components
│       ├── [Module]List.js   # List/index page
│       ├── [Module]Detail.js # Detail/view page
│       ├── Create[Module].js # Create form page
│       └── Edit[Module].js   # Edit form page
```

### Required Components for CRUD

#### 1. List Page Components
- **Search functionality** with debounced input
- **Pagination** with configurable page sizes
- **Action buttons** (View, Edit, Delete)
- **Delete confirmation modal**
- **Toast notifications**
- **Loading states**

#### 2. Form Page Components (Create/Edit)
- **Form validation** with required field indicators
- **Loading states** during submission
- **Cancel/Save buttons** with proper navigation
- **Toast notifications** for success/error
- **Auto-redirect** after successful operations

#### 3. Detail Page Components
- **Read-only data display** with proper formatting
- **Action buttons** (Edit, Delete)
- **Delete confirmation modal**
- **Navigation breadcrumbs**

### UI/UX Standards

#### Pagination Standards
- **Bottom placement** outside of card component
- **Left side**: Item count display and per-page selector
  ```
  Showing X to Y of Z items
  [Dropdown: X per page]
  ```
- **Right side**: Page navigation with numbered buttons
  ```
  [First] [<] [1] [2] [3] [4] [5] [>] [Last]
  ```
- **Page numbers**: Show maximum 5 pages centered around current page
- **Navigation arrows**: Use FontAwesome faChevronLeft and faChevronRight
- **First/Last buttons**: Navigate to first and last page respectively
- **Active page**: Primary variant button, others outline-primary
- **Disabled states**: For first/last page navigation (First/Prev disabled on page 1, Next/Last disabled on last page)

#### Search Layout Standards
- **Card header layout** with search form
- **Left column (md-10)**: Search input with icon
- **Right column (md-2)**: Search button with loading state
- **Search button**: Primary variant, full width, disabled during loading
- **Loading text**: "Searching..." when in progress

#### Modal Confirmations
- **Centered positioning** for better focus
- **Clear action description** with item name
- **Warning text** about irreversible actions
- **Consistent button styling** (Cancel: secondary, Delete: danger)

#### Toast Notifications
- **Fixed positioning** (top-right corner)
- **Auto-hide** after 3 seconds
- **Manual dismissible** with close button
- **Type-based styling** (success: green, error: red, warning: yellow, info: blue)
- **Icon integration** based on notification type

#### Loading States
- **Button loading text** ("Creating...", "Updating...", "Deleting...")
- **Disabled state** during operations
- **Consistent loading indicators** across components

#### Responsive Design
- **Mobile-first approach** with Bootstrap grid system
- **Collapsible sidebar** with proper content margin adjustment
- **Touch-friendly buttons** and form elements
- **Responsive tables** with horizontal scroll when needed

### Error Handling Standards

#### API Error Handling
```javascript
try {
  const response = await ApiService.operation();
  // Success handling
} catch (error) {
  console.error('Operation failed:', error);
  setToast({
    show: true,
    type: 'error',
    title: 'Error',
    message: 'Operation failed. Please try again.'
  });
}
```

#### Form Validation
- **Client-side validation** for immediate feedback
- **Server-side validation** handling with error display
- **Required field indicators** with asterisks (*)
- **Field-level error messages** when applicable

### Navigation Standards

#### URL Structure
- **RESTful URLs** without hash routing
- **Consistent naming** following `/module/action/id` pattern
- **Breadcrumb navigation** for better user orientation

#### Route Protection
- **Authentication guards** for protected routes
- **Automatic redirect** to login for unauthenticated users
- **Token validation** with refresh token handling

### Performance Considerations

#### Data Fetching
- **Pagination** to limit data load
- **Search debouncing** to reduce API calls
- **Loading states** to improve perceived performance
- **Error boundaries** for graceful error handling

#### Component Optimization
- **Memoization** for expensive calculations
- **Key props** for efficient list rendering
- **Conditional rendering** to avoid unnecessary DOM updates

## Testing Standards

### Unit Testing
- **Component rendering** tests
- **User interaction** simulation
- **API service** mocking
- **Error scenario** coverage

### Integration Testing
- **End-to-end workflows** (Create → Read → Update → Delete)
- **Authentication flow** testing
- **Error handling** validation
- **Responsive behavior** verification

## Security Standards

### Data Protection
- **Input sanitization** for XSS prevention
- **CSRF protection** with proper token handling
- **Sensitive data** masking in logs
- **Secure token storage** with proper expiration

### API Security
- **Authentication headers** for all protected endpoints
- **Request/Response validation** 
- **Rate limiting** consideration
- **HTTPS enforcement** in production

This standardization ensures consistency, maintainability, and scalability across all CRUD implementations in the Volt React Dashboard.