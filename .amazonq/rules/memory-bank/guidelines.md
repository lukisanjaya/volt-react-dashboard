# Volt React Dashboard - Development Guidelines

## Code Quality Standards

### Component Structure
- **Functional Components**: Use arrow function exports as default pattern
  ```javascript
  export default () => {
    // Component logic
  };
  ```
- **Named Exports**: Use for reusable widgets and utilities
  ```javascript
  export const ProfileCardWidget = () => {
    // Widget implementation
  };
  ```
- **Component Composition**: Build complex components from simpler ones using nested components

### Import Organization
- **React imports first**: Always import React at the top
- **Third-party libraries**: FontAwesome, Bootstrap components, external libraries
- **Internal components**: Local components and utilities
- **Assets**: Images, data files, and static resources
- **Consistent spacing**: Group related imports with blank lines

### Naming Conventions
- **Components**: PascalCase for all component names (ProfileCardWidget, TeamMembersWidget)
- **Props**: camelCase for prop names (iconColor, statusKey, btnText)
- **CSS Classes**: kebab-case following Bootstrap conventions (text-center, shadow-sm, mb-4)
- **File Names**: PascalCase for component files, camelCase for utility files

### Data Handling Patterns
- **Default Parameters**: Use destructuring with defaults
  ```javascript
  const { title, data = [] } = props;
  ```
- **Data Transformation**: Map data arrays to components using consistent key patterns
  ```javascript
  {data.map(d => <Component key={`prefix-${d.id}`} {...d} />)}
  ```
- **Conditional Rendering**: Use ternary operators for simple conditions
  ```javascript
  const percentageIcon = percentage < 0 ? faAngleDown : faAngleUp;
  ```

## Semantic Patterns

### Bootstrap Integration
- **Responsive Grid**: Use Bootstrap's Col and Row components with responsive props
  ```javascript
  <Col xs={12} sm={6} xl={4} className="mb-4">
  ```
- **Utility Classes**: Leverage Bootstrap utilities for spacing, colors, and layout
- **Component Variants**: Use variant props for consistent styling
  ```javascript
  <Button variant="primary" size="sm">
  ```

### FontAwesome Usage
- **Icon Integration**: Import specific icons from appropriate packages
- **Icon Sizing**: Use size prop or CSS classes for consistent icon sizing
- **Icon Colors**: Apply colors through CSS classes or component variants

### Chart Implementation
- **Chartist Integration**: Use react-chartist wrapper with consistent data structure
- **Plugin Configuration**: Apply tooltips and other plugins uniformly
- **Responsive Charts**: Different chart configurations for mobile and desktop

### State Management
- **Local State**: Use React hooks for component-level state
- **Props Flow**: Pass data down through props hierarchy
- **Event Handling**: Use inline arrow functions for simple event handlers

## Architectural Approaches

### Component Hierarchy
- **Page Components**: Top-level pages that compose multiple widgets
- **Widget Components**: Reusable dashboard components with specific functionality
- **Utility Components**: Small, focused components for specific UI elements

### Data Layer Separation
- **Static Data**: Store sample data in separate files under `data/` directory
- **Data Transformation**: Transform data at component level using map/filter operations
- **API Ready**: Structure components to easily accept API data

### Styling Strategy
- **Bootstrap First**: Use Bootstrap classes for primary styling
- **Custom SCSS**: Add custom styles in modular SCSS files
- **Component Scoping**: Keep styles close to components when possible

### Performance Patterns
- **Key Props**: Always provide unique keys for mapped components
- **Default Props**: Use default parameters to prevent undefined errors
- **Conditional Classes**: Build dynamic class names using template literals

## CRUD Implementation Standards

### API Service Pattern
```javascript
// services/api.js
class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: 'https://api.example.com',
      headers: { 'Content-Type': 'application/json' }
    });
    
    // Token interceptor
    this.api.interceptors.request.use(config => {
      const token = localStorage.getItem('accessToken');
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
  }

  async getItems(params = {}) {
    const { data } = await this.api.get('/items', { params });
    return data;
  }

  async createItem(item) {
    const { data } = await this.api.post('/items', item);
    return data;
  }

  async updateItem(id, item) {
    const { data } = await this.api.put(`/items/${id}`, item);
    return data;
  }

  async deleteItem(id) {
    const { data } = await this.api.delete(`/items/${id}`);
    return data;
  }
}
```

### List Page Pattern
```javascript
export default () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [toast, setToast] = useState({ show: false, type: 'success', title: '', message: '' });

  const fetchItems = async (searchQuery = '', page = currentPage) => {
    setLoading(true);
    try {
      const params = { limit, skip: (page - 1) * limit, ...(searchQuery && { q: searchQuery }) };
      const response = await ApiService.getItems(params);
      setItems(response.items || []);
      setTotalItems(response.total || 0);
    } catch (error) {
      console.error('Failed to fetch items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await ApiService.deleteItem(itemToDelete.id);
      setShowDeleteModal(false);
      setItemToDelete(null);
      fetchItems();
      setToast({ show: true, type: 'success', title: 'Success', message: 'Item deleted successfully.' });
    } catch (error) {
      setToast({ show: true, type: 'error', title: 'Error', message: 'Failed to delete item.' });
    }
  };

  return (
    <>
      {/* Search & Add Button */}
      {/* Data Table */}
      {/* Pagination */}
      {/* Delete Modal */}
      <ToastNotification {...toast} onClose={() => setToast({ ...toast, show: false })} />
    </>
  );
};
```

### Form Page Pattern (Create/Edit)
```javascript
export default () => {
  const { id } = useParams(); // For edit mode
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, type: 'success', title: '', message: '' });
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    // ... other fields
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (id) {
        await ApiService.updateItem(id, formData);
        setToast({ show: true, type: 'success', title: 'Success', message: 'Item updated successfully!' });
      } else {
        await ApiService.createItem(formData);
        setToast({ show: true, type: 'success', title: 'Success', message: 'Item created successfully!' });
      }
      
      setTimeout(() => history.push('/items'), 2000);
    } catch (error) {
      setToast({ show: true, type: 'error', title: 'Error', message: 'Operation failed.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* Form fields */}
      <ToastNotification {...toast} onClose={() => setToast({ ...toast, show: false })} />
    </Form>
  );
};
```

### Modal Confirmation Pattern
```javascript
<Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
  <Modal.Header closeButton>
    <Modal.Title>Confirm Delete</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    Are you sure you want to delete <strong>{itemToDelete?.title}</strong>?
    <br />
    <small className="text-muted">This action cannot be undone.</small>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
    <Button variant="danger" onClick={handleDeleteConfirm}>
      <FontAwesomeIcon icon={faTrash} className="me-1" />Delete
    </Button>
  </Modal.Footer>
</Modal>
```

### Toast Notification Pattern
```javascript
// components/Toast.js
const ToastNotification = ({ show, onClose, type = 'success', title, message, delay = 3000 }) => {
  // Auto-hide with delay
  // Fixed positioning (top-right)
  // Icon based on type
  // Dismissible
};

// Usage
const [toast, setToast] = useState({ show: false, type: 'success', title: '', message: '' });
setToast({ show: true, type: 'success', title: 'Success', message: 'Operation completed!' });
```

## Code Examples

### Widget Pattern
```javascript
export const ExampleWidget = (props) => {
  const { title, data = [], variant = "primary" } = props;
  
  return (
    <Card border="light" className="shadow-sm">
      <Card.Header>
        <h5 className="mb-0">{title}</h5>
      </Card.Header>
      <Card.Body>
        {data.map(item => (
          <div key={`item-${item.id}`}>
            {item.label}
          </div>
        ))}
      </Card.Body>
    </Card>
  );
};
```

### Responsive Layout Pattern
```javascript
<Row>
  <Col xs={12} lg={6} className="mb-4">
    <DesktopComponent />
  </Col>
  <Col xs={12} lg={6} className="mb-4 d-lg-none">
    <MobileComponent />
  </Col>
</Row>
```