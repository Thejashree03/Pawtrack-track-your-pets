
# PawTrack Backend Requirements

## Technology Stack
- **Framework**: Spring Boot
- **Database**: MySQL
- **Authentication**: Spring Security with JWT tokens
- **API Documentation**: OpenAPI/Swagger

## API Endpoints

### Authentication
- `POST /api/auth/login`: Authenticate user and return JWT token
- `POST /api/auth/register`: Register new user
- `GET /api/auth/validate`: Validate JWT token
- `POST /api/auth/refresh`: Refresh JWT token

### Users
- `GET /api/users/{id}`: Get user by ID
- `PUT /api/users/{id}`: Update user information
- `DELETE /api/users/{id}`: Delete user (admin only)
- `GET /api/users`: Get all users (admin only)

### Products
- `GET /api/products`: Get all products with pagination and filtering
- `GET /api/products/{id}`: Get product by ID
- `POST /api/products`: Add new product (admin only)
- `PUT /api/products/{id}`: Update product (admin only)
- `DELETE /api/products/{id}`: Delete product (admin only)

### Orders
- `GET /api/orders/{userId}`: Get orders for a user
- `POST /api/orders`: Create new order
- `GET /api/orders/{id}`: Get order details by ID
- `PUT /api/orders/{id}/status`: Update order status (admin only)

### Reviews
- `GET /api/products/{productId}/reviews`: Get reviews for a product
- `POST /api/products/{productId}/reviews`: Add a review
- `PUT /api/reviews/{id}`: Update a review
- `DELETE /api/reviews/{id}`: Delete a review

### Payment Integration
- `POST /api/payments/create`: Create payment session
- `POST /api/payments/verify`: Verify payment status
- `GET /api/payments/{orderId}`: Get payment details for an order

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  phone VARCHAR(15),
  bio TEXT,
  role ENUM('USER', 'ADMIN') DEFAULT 'USER',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Products Table
```sql
CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category VARCHAR(50) NOT NULL,
  brand VARCHAR(50),
  image_url VARCHAR(255),
  in_stock BOOLEAN DEFAULT TRUE,
  manufacturing_date DATE,
  expiry_date DATE,
  stock_quantity INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Orders Table
```sql
CREATE TABLE orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  status ENUM('PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED') DEFAULT 'PENDING',
  shipping_address TEXT NOT NULL,
  payment_method VARCHAR(50) NOT NULL,
  payment_status ENUM('PENDING', 'COMPLETED', 'FAILED') DEFAULT 'PENDING',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### Order Items Table
```sql
CREATE TABLE order_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);
```

### Reviews Table
```sql
CREATE TABLE reviews (
  id INT PRIMARY KEY AUTO_INCREMENT,
  product_id INT NOT NULL,
  user_id INT NOT NULL,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### Payment Details Table
```sql
CREATE TABLE payment_details (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT NOT NULL UNIQUE,
  payment_method VARCHAR(50) NOT NULL,
  transaction_id VARCHAR(100),
  amount DECIMAL(10,2) NOT NULL,
  status ENUM('PENDING', 'COMPLETED', 'FAILED') DEFAULT 'PENDING',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id)
);
```

## Integration Requirements

1. **Email Notifications**:
   - Send order confirmation emails
   - Send payment confirmation emails
   - Send shipping updates
   
2. **Payment Gateway Integration**:
   - Integrate with Razorpay for payment processing
   - Support for UPI payments (Google Pay, PhonePe)
   - Support for credit/debit card payments

3. **Security Requirements**:
   - Implement JWT-based authentication
   - Password encryption
   - Input validation to prevent SQL injection and XSS attacks
   - Rate limiting for API endpoints

4. **Deployment Requirements**:
   - Dockerized application for easy deployment
   - Separate environments for development, staging, and production
   - CI/CD pipeline integration

5. **Monitoring and Logging**:
   - Implement centralized logging
   - Performance monitoring
   - Error tracking

## API Response Format

All API responses should follow this standard format:

```json
{
  "status": "success",
  "data": {},
  "message": "Operation successful",
  "timestamp": "2023-05-10T12:30:45Z"
}
```

For errors:

```json
{
  "status": "error",
  "error": {
    "code": "ERROR_CODE",
    "message": "Error description"
  },
  "timestamp": "2023-05-10T12:30:45Z"
}
```
