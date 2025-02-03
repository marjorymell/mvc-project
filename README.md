# Arquitetura Baseada em Microsserviço

This project implements a microservices-based Order Management System using Node.js. The system is composed of four main microservices: Authentication, Product Catalog, Orders, and Payments.

## Microservices

### 1. Authentication Service

- Manages user registration and login
- Handles user authentication and authorization
- Provides admin access control

### 2. Product Catalog Service

- Manages product data (name, price, stock)
- Provides CRUD operations for products
- Ensures only admins can modify product data

### 3. Order Service

- Manages order creation and retrieval
- Calculates order totals
- Updates product stock upon order creation

### 4. Payment Service

- Processes payments for orders
- Updates order status based on payment result
- Simulates payment failures and insufficient funds scenarios

## Key Features

- Microservices architecture with clear separation of concerns
- Dependency injection for loose coupling between services
- Simulated inter-service communication
- CLI-based user interface for interaction
- Admin and regular user roles with different permissions
- Simulated payment processing with failure scenarios

## How to Run the Project

1. Ensure you have Node.js installed on your system.
2. Run the application: node index.js

## Default Login Credentials

### Admin User

- Username: admin
- Password: admin123
- Access: Full system permissions

### Regular User

- Username: user
- Password: user123
- Access: Order creation and payment processing

## Usage

Upon running the application, you'll be presented with a main menu:

1. Register
2. Login
3. Exit

- Use option 1 to register a new user
- Use option 2 to login with existing credentials
- After logging in, you'll have access to different menus based on your role (admin or regular user)

### Admin Menu

1. Manage Product Catalog
2. Manage Orders
3. Logout

### User Menu

1. Create a new order
2. View my orders
3. Process payment for an order
4. Return to main menu

## Meeting Project Requirements

1. **Microservices**: The system is composed of four main microservices (Authentication, Product Catalog, Orders, and Payments), each with its own responsibility.

2. **Service Communication**: Services communicate through method calls, simulating real microservice communication.

3. **Separation of Concerns**: Each service contains only functions related to its responsibility. For example, the Product Catalog service doesn't modify order data.

4. **Flow Simulation**: The system simulates a complete flow from user authentication to order creation and payment processing.

5. **Failure Simulation**: The Payment Service includes mechanisms to simulate payment failures and insufficient funds scenarios.

6. **Logging**: Each service includes console logs to describe the steps and interactions between services.

7. **Access Control**: The system implements different access levels for admin and regular users.
