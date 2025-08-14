---
title: "React useCallback Hook: Optimizing Function References"
date: "2024-12-18"
excerpt: "Learn how to use React's useCallback hook to optimize performance by memoizing function references."
tags: ["React", "Hooks", "Performance", "JavaScript"]
---

The `useCallback` hook returns a memoized function that only changes when its dependencies change, preventing unnecessary re-renders.

## Basic Syntax

```jsx
const memoizedCallback = useCallback(
  () => {
    // Function body
  },
  [dependency1, dependency2] // Dependencies array
);
```

## Example: Todo List

```jsx
import React, { useState, useCallback } from 'react';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');

  // Without useCallback - function recreated every render
  const addTodo = (text) => {
    setTodos(prev => [...prev, { id: Date.now(), text, done: false }]);
  };

  // With useCallback - function memoized
  const toggleTodo = useCallback((id) => {
    setTodos(prev => 
      prev.map(todo => 
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  }, []); // No dependencies - function never changes

  return (
    <div>
      <AddTodo onAdd={addTodo} />
      <TodoList todos={todos} onToggle={toggleTodo} />
    </div>
  );
}
```

## When to Use useCallback

**Passing callbacks to child components:**

```jsx
// Child won't re-render unnecessarily
const handleClick = useCallback(() => {
  doSomething();
}, []);

return <ExpensiveChild onClick={handleClick} />;
```

**Dependencies matter:**

```jsx
const handleSearch = useCallback((query) => {
  searchAPI(query, filter);
}, [filter]); // Re-create when filter changes
```

Use `useCallback` when passing functions to memoized child components or when functions are expensive to create.
      <ExpensiveChildComponent onClick={handleClick} />
    </div>
  );
}

// This component re-renders unnecessarily
const ExpensiveChildComponent = React.memo(({ onClick }) => {
  console.log('ExpensiveChildComponent rendered');
  
  return (
    <button onClick={onClick}>
      Click me (Expensive Component)
    </button>
  );
});
```

### Solution: Using useCallback

```jsx
import React, { useState, useCallback } from 'react';

// With useCallback - function reference stays stable
function OptimizedParentComponent() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  // Function reference stays the same between renders
  const handleClick = useCallback(() => {
    console.log('Button clicked!');
    setCount(prev => prev + 1);
  }, []); // Empty dependency array - function never changes

  const handleInputChange = useCallback((e) => {
    setText(e.target.value);
  }, []); // No dependencies needed for this

  return (
    <div>
      <input 
        value={text} 
        onChange={handleInputChange}
        placeholder="Type something..."
      />
      <p>Count: {count}</p>
      <OptimizedChildComponent onClick={handleClick} />
    </div>
  );
}

// This component only re-renders when onClick actually changes
const OptimizedChildComponent = React.memo(({ onClick }) => {
  console.log('OptimizedChildComponent rendered');
  
  return (
    <button onClick={onClick}>
      Click me (Optimized Component)
    </button>
  );
});
```

## Common Use Cases

### 1. Event Handlers with Dependencies

```jsx
import React, { useState, useCallback } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build a project', completed: false }
  ]);
  const [filter, setFilter] = useState('all');

  // useCallback with dependencies
  const toggleTodo = useCallback((id) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []); // No external dependencies

  const deleteTodo = useCallback((id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  }, []);

  // This callback depends on the filter state
  const getFilteredTodos = useCallback(() => {
    switch (filter) {
      case 'completed':
        return todos.filter(todo => todo.completed);
      case 'active':
        return todos.filter(todo => !todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]); // Dependencies: todos and filter

  const filteredTodos = getFilteredTodos();

  return (
    <div>
      <FilterButtons currentFilter={filter} onFilterChange={setFilter} />
      <TodoItems 
        todos={filteredTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />
    </div>
  );
}

const TodoItems = React.memo(({ todos, onToggle, onDelete }) => {
  console.log('TodoItems rendered');
  
  return (
    <ul>
      {todos.map(todo => (
        <TodoItem 
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
});

const TodoItem = React.memo(({ todo, onToggle, onDelete }) => {
  return (
    <li>
      <span 
        style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
        onClick={() => onToggle(todo.id)}
      >
        {todo.text}
      </span>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </li>
  );
});
```

### 2. Custom Hooks with useCallback

```jsx
import { useState, useCallback, useEffect } from 'react';

// Custom hook for API calls
function useApi(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Memoize the fetch function to prevent infinite loops in useEffect
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [url]); // Dependency on url

  // Refetch function that can be called manually
  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch };
}

// Usage of the custom hook
function UserProfile({ userId }) {
  const { data: user, loading, error, refetch } = useApi(`/api/users/${userId}`);

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>{user?.name}</h1>
      <p>{user?.email}</p>
      <button onClick={handleRefresh}>Refresh</button>
    </div>
  );
}
```

### 3. Form Handling with useCallback

```jsx
import React, { useState, useCallback } from 'react';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generic field change handler
  const handleFieldChange = useCallback((fieldName) => {
    return (e) => {
      const value = e.target.value;
      setFormData(prev => ({
        ...prev,
        [fieldName]: value
      }));
      
      // Clear error when user starts typing
      if (errors[fieldName]) {
        setErrors(prev => ({
          ...prev,
          [fieldName]: null
        }));
      }
    };
  }, [errors]); // Depends on errors state

  // Validation function
  const validateForm = useCallback(() => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]); // Depends on formData

  // Submit handler
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setFormData({ name: '', email: '', message: '' });
        alert('Message sent successfully!');
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateForm]);

  return (
    <form onSubmit={handleSubmit}>
      <FormField
        label="Name"
        value={formData.name}
        onChange={handleFieldChange('name')}
        error={errors.name}
      />
      <FormField
        label="Email"
        type="email"
        value={formData.email}
        onChange={handleFieldChange('email')}
        error={errors.email}
      />
      <FormField
        label="Message"
        as="textarea"
        value={formData.message}
        onChange={handleFieldChange('message')}
        error={errors.message}
      />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}

const FormField = React.memo(({ label, error, as = 'input', ...props }) => {
  console.log(`FormField ${label} rendered`);
  
  const Component = as;
  
  return (
    <div>
      <label>{label}</label>
      <Component {...props} />
      {error && <span style={{ color: 'red' }}>{error}</span>}
    </div>
  );
});
```

### 4. Working with Context

```jsx
import React, { createContext, useContext, useState, useCallback } from 'react';

// Theme context
const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const [fontSize, setFontSize] = useState('medium');

  // Memoize context functions to prevent unnecessary re-renders
  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  const updateFontSize = useCallback((size) => {
    setFontSize(size);
  }, []);

  const resetSettings = useCallback(() => {
    setTheme('light');
    setFontSize('medium');
  }, []);

  // Memoize context value
  const contextValue = React.useMemo(() => ({
    theme,
    fontSize,
    toggleTheme,
    updateFontSize,
    resetSettings
  }), [theme, fontSize, toggleTheme, updateFontSize, resetSettings]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use theme context
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

// Component using the context
const ThemedButton = React.memo(({ children, onClick }) => {
  const { theme, toggleTheme } = useTheme();
  
  console.log('ThemedButton rendered');
  
  return (
    <button
      onClick={onClick || toggleTheme}
      style={{
        backgroundColor: theme === 'dark' ? '#333' : '#fff',
        color: theme === 'dark' ? '#fff' : '#333',
        border: `1px solid ${theme === 'dark' ? '#555' : '#ccc'}`,
        padding: '8px 16px',
        cursor: 'pointer'
      }}
    >
      {children}
    </button>
  );
});
```

## Advanced Patterns

### 1. useCallback with Debouncing

```jsx
import { useState, useCallback, useRef } from 'react';

function SearchInput({ onSearch }) {
  const [query, setQuery] = useState('');
  const timeoutRef = useRef();

  // Debounced search function
  const debouncedSearch = useCallback((searchQuery) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      onSearch(searchQuery);
    }, 300);
  }, [onSearch]);

  const handleInputChange = useCallback((e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  }, [debouncedSearch]);

  return (
    <input
      type="text"
      value={query}
      onChange={handleInputChange}
      placeholder="Search..."
    />
  );
}
```

### 2. Dynamic Event Handlers

```jsx
function DynamicList({ items, onItemAction }) {
  // Create memoized handlers for each item
  const createItemHandler = useCallback((itemId, action) => {
    return () => onItemAction(itemId, action);
  }, [onItemAction]);

  return (
    <ul>
      {items.map(item => (
        <ListItem
          key={item.id}
          item={item}
          onEdit={createItemHandler(item.id, 'edit')}
          onDelete={createItemHandler(item.id, 'delete')}
          onToggle={createItemHandler(item.id, 'toggle')}
        />
      ))}
    </ul>
  );
}

const ListItem = React.memo(({ item, onEdit, onDelete, onToggle }) => {
  return (
    <li>
      <span onClick={onToggle}>{item.name}</span>
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </li>
  );
});
```

## Best Practices

### 1. Don't Overuse useCallback

```jsx
// Don't do this - unnecessary optimization
const Component = () => {
  const [count, setCount] = useState(0);
  
  // This is overkill for simple inline handlers
  const handleClick = useCallback(() => {
    setCount(count + 1);
  }, [count]);
  
  return <button onClick={handleClick}>Count: {count}</button>;
};

// Do this instead - simple inline handler is fine
const Component = () => {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
};
```

### 2. Use Functional Updates

```jsx
// Better - no dependency on count
const handleIncrement = useCallback(() => {
  setCount(prevCount => prevCount + 1);
}, []);

// Less optimal - depends on count
const handleIncrement = useCallback(() => {
  setCount(count + 1);
}, [count]);
```

### 3. Combine with React.memo

```jsx
// useCallback works best with React.memo
const ExpensiveComponent = React.memo(({ onAction }) => {
  // This component only re-renders when onAction reference changes
  return <button onClick={onAction}>Action</button>;
});

function Parent() {
  const handleAction = useCallback(() => {
    // Action logic
  }, []);

  return <ExpensiveComponent onAction={handleAction} />;
}
```

## Common Pitfalls

### 1. Missing Dependencies

```jsx
// Wrong - missing dependency
const handleSubmit = useCallback(() => {
  apiCall(formData);
}, []); // Should include formData

// Right - include all dependencies
const handleSubmit = useCallback(() => {
  apiCall(formData);
}, [formData]);
```

### 2. Stale Closures

```jsx
// Problem - stale closure
const [count, setCount] = useState(0);

const handleClick = useCallback(() => {
  console.log(count); // Always logs initial value
}, []);

// Solution - use functional update or include dependency
const handleClick = useCallback(() => {
  setCount(prevCount => {
    console.log(prevCount); // Gets current value
    return prevCount + 1;
  });
}, []);
```

## Conclusion

Use `useCallback` when:
- Passing functions to optimized child components
- Functions are dependencies of other hooks
- Creating expensive function references
- Working with context providers

Remember: `useCallback` is an optimization, not a requirement. Use it judiciously to improve performance without over-optimizing your code.
