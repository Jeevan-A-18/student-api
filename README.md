# Student Management REST API

A complete RESTful API for managing student records, built with **Node.js**, **Express.js**, and **MongoDB**. Designed as a beginner-friendly project to learn backend development fundamentals.

---

## Features

- Full CRUD operations (Create, Read, Update, Delete)
- Search students by name
- Filter students by department
- Pagination support
- Mongoose schema validation
- Duplicate roll number and email detection
- Centralized error handling
- Request logging middleware
- Clean MVC-style folder structure

---

## Technologies Used

| Technology | Purpose              |
| ---------- | -------------------- |
| Node.js    | JavaScript runtime   |
| Express.js | Web framework        |
| MongoDB    | NoSQL database       |
| Mongoose   | MongoDB ODM          |
| dotenv     | Environment variables|
| cors       | Cross-origin support |
| nodemon    | Auto-restart on save |

---

## Folder Structure

```
student-api/
│
├── src/
│   ├── config/
│   │   └── db.js                  # MongoDB connection
│   │
│   ├── controllers/
│   │   └── studentController.js   # Business logic for each route
│   │
│   ├── middleware/
│   │   ├── errorMiddleware.js     # Global error handler
│   │   ├── loggerMiddleware.js    # Request logger
│   │   └── notFoundMiddleware.js  # 404 handler for unknown routes
│   │
│   ├── models/
│   │   └── Student.js             # Mongoose schema & model
│   │
│   ├── routes/
│   │   └── studentRoutes.js       # Route definitions
│   │
│   ├── app.js                     # Express app setup
│   └── server.js                  # Entry point (starts server)
│
├── .env                           # Environment variables
├── .gitignore                     # Files to ignore in Git
├── package.json                   # Project metadata & scripts
└── README.md                      # This file
```

---

## Installation

### 1. Navigate to the project folder

```bash
cd "C:\Users\Jeevan Ashok\OneDrive\Desktop\Project\student-api"
```

### 2. Install dependencies

```bash
npm install
```

---

## MongoDB Setup

Make sure MongoDB is installed and running on your machine.

- **Download MongoDB**: https://www.mongodb.com/try/download/community
- **Start MongoDB** (if not running as a service):

```bash
mongod
```

The API connects to:

```
mongodb://127.0.0.1:27017/studentDB
```

The `studentDB` database will be created automatically when you insert the first student.

---

## Environment Variables

The `.env` file contains:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/studentDB
```

You can change the port or MongoDB URI as needed.

---

## How to Run

### Development mode (auto-restart on file changes)

```bash
npm run dev
```

### Production mode

```bash
npm start
```

You should see:

```
MongoDB Connected: 127.0.0.1
Server is running on http://localhost:5000
```

---

## API Endpoints

| Method | Endpoint             | Description          |
| ------ | -------------------- | -------------------- |
| GET    | `/`                  | API health check     |
| GET    | `/api/students`      | Get all students     |
| GET    | `/api/students/:id`  | Get student by ID    |
| POST   | `/api/students`      | Create a student     |
| PUT    | `/api/students/:id`  | Update a student     |
| DELETE | `/api/students/:id`  | Delete a student     |

---

## Testing with Postman

### 1. GET all students

- **Method**: `GET`
- **URL**: `http://localhost:5000/api/students`

### 2. POST – Create a student

- **Method**: `POST`
- **URL**: `http://localhost:5000/api/students`
- **Headers**: `Content-Type: application/json`
- **Body** (raw JSON):

```json
{
  "rollNo": 1,
  "name": "Jeevan",
  "age": 20,
  "department": "CSE",
  "email": "jeevan@example.com",
  "phone": "9876543210",
  "cgpa": 8.5
}
```

### 3. GET student by ID

- **Method**: `GET`
- **URL**: `http://localhost:5000/api/students/<student_id_here>`

Replace `<student_id_here>` with the `_id` from the POST response.

### 4. PUT – Update a student

- **Method**: `PUT`
- **URL**: `http://localhost:5000/api/students/<student_id_here>`
- **Headers**: `Content-Type: application/json`
- **Body** (raw JSON):

```json
{
  "cgpa": 9.0,
  "age": 21
}
```

### 5. DELETE a student

- **Method**: `DELETE`
- **URL**: `http://localhost:5000/api/students/<student_id_here>`

### 6. Search by name

```
GET http://localhost:5000/api/students?search=Jeevan
```

Searches are case-insensitive and support partial matches (e.g., `?search=jee` will match "Jeevan").

### 7. Filter by department

```
GET http://localhost:5000/api/students?department=CSE
```

### 8. Pagination

```
GET http://localhost:5000/api/students?page=1&limit=5
```

### Combined example

```
GET http://localhost:5000/api/students?department=CSE&search=jee&page=1&limit=5
```

---

## Sample Student Data

Use these JSON objects to test the POST endpoint:

### Student 1 – Jeevan

```json
{
  "rollNo": 1,
  "name": "Jeevan",
  "age": 20,
  "department": "CSE",
  "email": "jeevan@example.com",
  "phone": "9876543210",
  "cgpa": 8.5
}
```

### Student 2 – Rahul

```json
{
  "rollNo": 2,
  "name": "Rahul",
  "age": 21,
  "department": "ECE",
  "email": "rahul@example.com",
  "phone": "9123456780",
  "cgpa": 7.8
}
```

### Student 3 – Ananya

```json
{
  "rollNo": 3,
  "name": "Ananya",
  "age": 19,
  "department": "ISE",
  "email": "ananya@example.com",
  "phone": "9988776655",
  "cgpa": 9.2
}
```

### Student 4 – Arjun

```json
{
  "rollNo": 4,
  "name": "Arjun",
  "age": 22,
  "department": "ME",
  "email": "arjun@example.com",
  "phone": "9001122334",
  "cgpa": 6.5
}
```

### Student 5 – Priya

```json
{
  "rollNo": 5,
  "name": "Priya",
  "age": 20,
  "department": "CIVIL",
  "email": "priya@example.com",
  "phone": "9556677889",
  "cgpa": 8.0
}
```

---

## HTTP Status Codes

| Code | Meaning                                   |
| ---- | ----------------------------------------- |
| 200  | Successful GET / PUT / DELETE              |
| 201  | Successful creation (POST)                |
| 400  | Bad request / validation error / invalid ID|
| 404  | Resource not found                        |
| 409  | Duplicate resource (roll number or email)  |
| 500  | Internal server error                     |

---

## Future Improvements

- Add JWT-based authentication and authorization
- Add role-based access control (Admin, Student)
- Add file upload for student profile pictures
- Add unit and integration tests (Jest / Mocha)
- Add rate limiting middleware
- Add request body sanitization
- Add Swagger / OpenAPI documentation
- Deploy to cloud (Render, Railway, AWS)
- Build a React frontend
- Add bulk import/export (CSV)

---

## License

ISC
