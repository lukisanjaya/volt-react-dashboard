# Volt React Dashboard - Project Structure

## Directory Organization

### Root Level
- **public/**: Static assets and HTML template
- **src/**: Main application source code
- **package.json**: Project dependencies and scripts
- **README.md**: Project documentation

### Source Structure (`src/`)

#### Core Application
- **index.js**: Application entry point and React DOM rendering
- **routes.js**: React Router configuration and route definitions

#### Components (`src/components/`)
- **Widgets.js**: Reusable dashboard widgets (counters, charts, profiles)
- **Charts.js**: Chart components using Chartist library
- **Forms.js**: Form components and input elements
- **Tables.js**: Data table components with sorting and pagination
- **Navbar.js**: Top navigation bar component
- **Sidebar.js**: Side navigation menu component
- **Footer.js**: Application footer component
- **Documentation.js**: Documentation and help components

#### Pages (`src/pages/`)
- **dashboard/**: Dashboard-specific pages (overview, analytics)
- **examples/**: Authentication pages (sign-in, sign-up, forgot password)
- **tables/**: Table demonstration pages
- **components/**: Component showcase pages
- **documentation/**: Documentation pages
- **HomePage.js**: Landing page component
- **Presentation.js**: Product presentation page
- **Settings.js**: User settings and preferences
- **Transactions.js**: Transaction management interface

#### Data Layer (`src/data/`)
- **charts.js**: Chart configuration and sample data
- **transactions.js**: Transaction data models
- **teamMembers.js**: Team member data structures
- **notifications.js**: Notification data
- **tables.js**: Table data and configurations
- **features.js**: Feature definitions and descriptions

#### Styling (`src/scss/`)
- **volt.scss**: Main stylesheet entry point
- **volt/**: Modular SCSS files for components and utilities

#### Assets (`src/assets/`)
- **img/**: Images, icons, and graphics
- **syntax-themes/**: Code syntax highlighting themes

## Architectural Patterns

### Component Architecture
- **Functional Components**: Modern React hooks-based approach
- **Prop-Driven Design**: Components receive data via props for flexibility
- **Composition Pattern**: Complex components built from simpler ones
- **Container/Presentation**: Separation of data logic and UI rendering

### Data Flow
- **Top-Down Data Flow**: Data flows from parent to child components
- **Static Data Sources**: JSON files in `data/` directory provide sample data
- **API-Ready Structure**: Components designed for easy backend integration

### Routing Structure
- **React Router**: Client-side routing for single-page application
- **Nested Routes**: Hierarchical route organization
- **Protected Routes**: Authentication-aware route handling

### Styling Architecture
- **SCSS Preprocessing**: Modular stylesheet organization
- **Bootstrap 5 Integration**: Utility-first CSS framework
- **Component-Scoped Styles**: Styles organized by component
- **Theme Customization**: Centralized theme variables and mixins