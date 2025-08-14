---
title: "SQL COALESCE Function: Handling NULL Values"
date: "2024-12-18"
excerpt: "Learn how to use SQL's COALESCE function to handle NULL values and provide fallback defaults."
tags: ["SQL", "Database", "Functions", "NULL"]
---

The `COALESCE` function returns the first non-NULL value from a list of expressions.

## Basic Syntax

```sql
COALESCE(expression1, expression2, expression3, ...)
```

## Example: User Profiles

```sql
-- Sample users table
CREATE TABLE users (
    id INTEGER,
    username VARCHAR(50),
    email VARCHAR(100),
    phone VARCHAR(15),
    display_name VARCHAR(100)
);

-- Insert test data with some NULL values
INSERT INTO users VALUES
(1, 'john_doe', 'john@email.com', NULL, 'John Smith'),
(2, 'jane', NULL, '555-0123', NULL),
(3, 'bob', 'bob@email.com', '555-0456', 'Bob Johnson');
```

## Using COALESCE for Default Values

```sql
-- Get contact info with fallback
SELECT 
    username,
    COALESCE(email, phone, 'No contact info') as contact,
    COALESCE(display_name, username) as name
FROM users;

-- Result:
-- john_doe | john@email.com | John Smith
-- jane     | 555-0123       | jane
-- bob      | bob@email.com  | Bob Johnson
```

## Common Use Cases

**Default values in calculations:**

```sql
-- Handle NULL prices with 0
SELECT 
    product_name,
    COALESCE(discount_price, regular_price, 0) as final_price
FROM products;
```

**Safe string concatenation:**

```sql
-- Avoid NULL contamination
SELECT 
    first_name,
    COALESCE(middle_name, '') as middle,
    last_name
FROM customers;
```

COALESCE is essential for handling NULL values gracefully in SQL queries.
