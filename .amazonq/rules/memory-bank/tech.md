# Volt React Dashboard - Technology Stack

## Core Technologies

### Frontend Framework
- **React.js 16.13.1**: Component-based UI library
- **React DOM**: React rendering for web browsers
- **React Router DOM 5.2.0**: Client-side routing and navigation

### UI Framework
- **Bootstrap 5.0.0-beta1**: CSS framework with utility classes
- **@themesberg/react-bootstrap 1.4.1**: React Bootstrap components
- **Sass 1.50.0**: CSS preprocessing with variables and mixins

### Icons & Graphics
- **FontAwesome 5.15.4**: Icon library with React integration
  - Solid icons, brand icons, regular icons
- **React FontAwesome 0.1.17**: React wrapper for FontAwesome

### Charts & Visualization
- **Chartist 0.11.4**: Lightweight charting library
- **React Chartist 0.14.4**: React wrapper for Chartist
- **Chartist Plugin Tooltips**: Enhanced chart tooltips

### Development Tools
- **React Scripts 3.4.3**: Build toolchain and development server
- **Create React App**: Project bootstrapping and configuration

### Additional Libraries
- **Moment Timezone 0.5.31**: Date and time manipulation
- **React DateTime 3.0.4**: Date/time picker components
- **React Copy to Clipboard 5.0.3**: Clipboard functionality
- **React Live 2.2.3**: Live code editing and preview
- **React Transition Group 4.4.1**: Animation and transitions
- **Simplebar React 2.3.0**: Custom scrollbar components
- **React GitHub Button 1.2.0**: GitHub integration widgets

## Build System

### Package Management
- **NPM**: Primary package manager
- **Yarn**: Alternative package manager (yarn.lock present)

### Development Scripts
```bash
npm start          # Development server (localhost:3000)
npm run build      # Production build
npm run build-local # Local production build
npm test           # Run test suite
npm run eject      # Eject from Create React App
```

### Build Configuration
- **Webpack**: Module bundling (via React Scripts)
- **Babel**: JavaScript transpilation
- **ESLint**: Code linting with React app configuration
- **Browserslist**: Target browser configuration

## Browser Support
- **Production**: >0.2%, not dead, not op_mini all
- **Development**: Latest Chrome, Firefox, Safari versions

## Development Environment
- **Node.js**: >= 8.10 required
- **NPM**: >= 5.6 required
- **Hot Reloading**: Automatic browser refresh on code changes
- **Source Maps**: Debugging support in development

## Testing Framework
- **Jest**: JavaScript testing framework
- **React Testing Library**: React component testing utilities
- **User Event Testing**: User interaction simulation

## Deployment
- **Static Build**: Generates optimized static files
- **GitHub Pages**: Deployment target configuration
- **Public URL**: Configurable for different hosting environments