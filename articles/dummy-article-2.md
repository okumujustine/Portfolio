---
title: "Dummy Article 2: React Performance Optimization"
date: "2024-12-15"
excerpt: "A sample article showcasing different code examples and syntax highlighting features."
tags: ["React", "Performance", "Frontend", "Sample"]
---

## Dummy Article 2: React Performance Optimization

React apps can become slow as they grow. Let's explore proven techniques to keep your React applications fast and responsive.

## Understanding React Rendering

React re-renders components when state or props change. Understanding this is key to optimization:

```jsx
// Problematic component - re-renders on every parent update
function ExpensiveComponent({ data, onUpdate }) {
  console.log('ExpensiveComponent rendered');
  
  // Expensive calculation runs on every render
  const processedData = data.map(item => ({
    ...item,
    processed: performExpensiveCalculation(item)
  }));
  
  return (
    <div>
      {processedData.map(item => (
        <div key={item.id}>{item.processed}</div>
      ))}
    </div>
  );
}

function performExpensiveCalculation(item) {
  // Simulate expensive operation
  let result = 0;
  for (let i = 0; i < 1000000; i++) {
    result += item.value * Math.random();
  }
  return result;
}
```

## React.memo for Component Memoization

Use React.memo to prevent unnecessary re-renders:

```jsx
import React, { memo, useMemo } from 'react';

// Optimized component with memo
const OptimizedComponent = memo(function ExpensiveComponent({ data, onUpdate }) {
  console.log('OptimizedComponent rendered');
  
  // Memoize expensive calculation
  const processedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      processed: performExpensiveCalculation(item)
    }));
  }, [data]); // Only recalculate when data changes
  
  return (
    <div>
      {processedData.map(item => (
        <div key={item.id}>{item.processed}</div>
      ))}
    </div>
  );
});

// Custom comparison function for memo
const ProductCard = memo(function ProductCard({ product, onAddToCart }) {
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button onClick={() => onAddToCart(product.id)}>
        Add to Cart
      </button>
    </div>
  );
}, (prevProps, nextProps) => {
  // Custom comparison: only re-render if product data changes
  return (
    prevProps.product.id === nextProps.product.id &&
    prevProps.product.name === nextProps.product.name &&
    prevProps.product.price === nextProps.product.price
  );
});
```

## useMemo and useCallback Hooks

Optimize expensive calculations and function references:

```jsx
import React, { useState, useMemo, useCallback } from 'react';

function ShoppingCart({ items, discounts }) {
  const [filter, setFilter] = useState('all');
  
  // Memoize expensive calculations
  const totalPrice = useMemo(() => {
    console.log('Calculating total price...');
    return items.reduce((total, item) => {
      const discount = discounts[item.category] || 0;
      return total + (item.price * item.quantity * (1 - discount));
    }, 0);
  }, [items, discounts]);
  
  // Memoize filtered items
  const filteredItems = useMemo(() => {
    if (filter === 'all') return items;
    return items.filter(item => item.category === filter);
  }, [items, filter]);
  
  // Memoize event handlers
  const handleRemoveItem = useCallback((itemId) => {
    // This function reference stays the same between renders
    // if the dependency array doesn't change
    onRemoveItem(itemId);
  }, [onRemoveItem]);
  
  const handleFilterChange = useCallback((newFilter) => {
    setFilter(newFilter);
  }, []);
  
  return (
    <div>
      <h2>Total: ${totalPrice.toFixed(2)}</h2>
      
      <FilterButtons 
        currentFilter={filter} 
        onFilterChange={handleFilterChange} 
      />
      
      <ItemList 
        items={filteredItems}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
}

// Child components benefit from stable references
const FilterButtons = memo(function FilterButtons({ currentFilter, onFilterChange }) {
  const filters = ['all', 'electronics', 'clothing', 'books'];
  
  return (
    <div>
      {filters.map(filter => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={currentFilter === filter ? 'active' : ''}
        >
          {filter}
        </button>
      ))}
    </div>
  );
});
```

## Code Splitting with React.lazy

Split your app into smaller chunks that load on demand:

```jsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Lazy load components
const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));
const Analytics = lazy(() => 
  import('./pages/Analytics').then(module => ({
    default: module.AnalyticsPage
  }))
);

// Loading component
function LoadingSpinner() {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
}

// Error boundary for lazy components
class LazyComponentErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('Lazy component failed to load:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h2>Something went wrong loading this page.</h2>
          <button onClick={() => window.location.reload()}>
            Reload Page
          </button>
        </div>
      );
    }
    
    return this.props.children;
  }
}

function App() {
  return (
    <Router>
      <div className="app">
        <nav>
          {/* Navigation */}
        </nav>
        
        <main>
          <LazyComponentErrorBoundary>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/analytics" element={<Analytics />} />
              </Routes>
            </Suspense>
          </LazyComponentErrorBoundary>
        </main>
      </div>
    </Router>
  );
}
```

## Virtual Scrolling for Large Lists

Handle thousands of items efficiently:

```jsx
import React, { useState, useMemo, useCallback } from 'react';

function VirtualizedList({ items, itemHeight = 50, containerHeight = 400 }) {
  const [scrollTop, setScrollTop] = useState(0);
  
  // Calculate which items to render
  const visibleRange = useMemo(() => {
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(
      startIndex + Math.ceil(containerHeight / itemHeight) + 1,
      items.length
    );
    
    return { startIndex, endIndex };
  }, [scrollTop, itemHeight, containerHeight, items.length]);
  
  // Get visible items
  const visibleItems = useMemo(() => {
    return items.slice(visibleRange.startIndex, visibleRange.endIndex);
  }, [items, visibleRange]);
  
  // Handle scroll
  const handleScroll = useCallback((e) => {
    setScrollTop(e.target.scrollTop);
  }, []);
  
  return (
    <div
      className="virtual-list-container"
      style={{ height: containerHeight, overflow: 'auto' }}
      onScroll={handleScroll}
    >
      <div style={{ height: items.length * itemHeight, position: 'relative' }}>
        <div
          style={{
            transform: `translateY(${visibleRange.startIndex * itemHeight}px)`,
            position: 'absolute',
            top: 0,
            width: '100%'
          }}
        >
          {visibleItems.map((item, index) => (
            <ListItem
              key={visibleRange.startIndex + index}
              item={item}
              style={{
                height: itemHeight,
                display: 'flex',
                alignItems: 'center',
                borderBottom: '1px solid #eee'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const ListItem = memo(function ListItem({ item, style }) {
  return (
    <div style={style}>
      <span>{item.name}</span>
      <span>{item.value}</span>
    </div>
  );
});
```

## State Management Optimization

Optimize state updates and minimize re-renders:

```jsx
import React, { useReducer, useContext, createContext } from 'react';

// Create separate contexts for different concerns
const UserContext = createContext();
const ThemeContext = createContext();
const NotificationsContext = createContext();

// Reducer for complex state management
function appReducer(state, action) {
  switch (action.type) {
    case 'USER_LOGIN':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true
      };
    
    case 'UPDATE_USER_PREFERENCES':
      return {
        ...state,
        user: {
          ...state.user,
          preferences: {
            ...state.user.preferences,
            ...action.payload
          }
        }
      };
    
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [...state.notifications, action.payload]
      };
    
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(
          n => n.id !== action.payload
        )
      };
    
    default:
      return state;
  }
}

// Provider component
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, {
    user: null,
    isAuthenticated: false,
    notifications: [],
    theme: 'light'
  });
  
  // Memoize context values to prevent unnecessary re-renders
  const userContextValue = useMemo(() => ({
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    login: (user) => dispatch({ type: 'USER_LOGIN', payload: user }),
    updatePreferences: (prefs) => 
      dispatch({ type: 'UPDATE_USER_PREFERENCES', payload: prefs })
  }), [state.user, state.isAuthenticated]);
  
  const notificationsContextValue = useMemo(() => ({
    notifications: state.notifications,
    addNotification: (notification) => 
      dispatch({ type: 'ADD_NOTIFICATION', payload: notification }),
    removeNotification: (id) => 
      dispatch({ type: 'REMOVE_NOTIFICATION', payload: id })
  }), [state.notifications]);
  
  return (
    <UserContext.Provider value={userContextValue}>
      <NotificationsContext.Provider value={notificationsContextValue}>
        {children}
      </NotificationsContext.Provider>
    </UserContext.Provider>
  );
}
```

## Performance Monitoring

Monitor and measure your React app's performance:

```jsx
import React, { Profiler } from 'react';

// Performance profiler component
function onRenderCallback(id, phase, actualDuration, baseDuration, startTime, commitTime) {
  // Log performance metrics
  console.log('Profiler:', {
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime
  });
  
  // Send to analytics service
  if (actualDuration > 100) {
    analytics.track('slow_component_render', {
      componentId: id,
      duration: actualDuration,
      phase
    });
  }
}

// Wrap components you want to profile
function App() {
  return (
    <Profiler id="App" onRender={onRenderCallback}>
      <Header />
      <Profiler id="MainContent" onRender={onRenderCallback}>
        <MainContent />
      </Profiler>
      <Footer />
    </Profiler>
  );
}

// Custom hook for performance monitoring
function usePerformanceMonitor(componentName) {
  React.useEffect(() => {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      if (duration > 50) {
        console.warn(`${componentName} took ${duration.toFixed(2)}ms to mount`);
      }
    };
  }, [componentName]);
}
```

## Best Practices Summary

1. **Use React.memo** for components that receive the same props frequently
2. **Memoize expensive calculations** with useMemo
3. **Stabilize function references** with useCallback
4. **Implement code splitting** for route-based components
5. **Use virtual scrolling** for large datasets
6. **Optimize context usage** by splitting concerns
7. **Profile your app** to identify bottlenecks
8. **Avoid inline objects and functions** in JSX
9. **Use production builds** for performance testing
10. **Implement proper loading states** for better perceived performance

These techniques will help you build React applications that stay fast as they scale!
