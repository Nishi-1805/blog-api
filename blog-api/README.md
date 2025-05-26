# 📝 Blog API

A RESTful API for a blog application that allows users to register, authenticate, create blog posts, and manage comments. It includes role-based access control and is fully tested and documented using Swagger.

---

## 📌 Project Overview

- **Project ID:** SCR845NGFF  
- **Duration:** 25 days  
- **Objective:** Develop a RESTful API for a blog application with full CRUD operations for posts and comments, user authentication, and role-based access control.

---

## 🛠️ Technologies Used

| Tech            | Purpose                |
|-----------------|------------------------|
| Node.js         | Backend Runtime        |
| Express.js      | Web Framework          |
| PostgreSQL      | Database               |
| Sequelize       | ORM                    |
| JWT             | Authentication         |
| Jest + Supertest| Testing                |
| Swagger         | API Documentation      |

---

## 📂 Project Structure

SCR845NGFF
├── blog-api/
│ ├── controllers/
│ ├── middlewares/
│ ├── models/
│ ├── routes/
│ ├── config/
│ ├── tests/
│ ├── app.js
│ ├── package-lock.json
│ ├── package.json
│ ├── server.js
│ ├── swagger.js
│ └── README.md


---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Nishi-1805/blog-api.git 
cd blog-api

2️⃣ Install dependencies
npm install

3️⃣ Configure environment variables
Create a .env file in the root directory:

SERVER_PORT=4000
DB_PORT=5432
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=your_db_password
DB_NAME=blogdb
JWT_SECRET=your_jwt_secret

4️⃣ Start the server
npm start

App runs at:
http://localhost:4000



🔐 Authentication & Roles
✅ JWT-based login system

✅ Role-based access: user and admin

✅ Only post/comment authors or admins can modify/delete their own content

⚠️ Note: All newly registered users are assigned the role user by default.
To grant admin privileges, the user's role must be manually updated in the database (e.g., via pgAdmin or SQL query).



📬 API Endpoints
🔐 Auth
Method	  Endpoint	            Description
POST	/api/auth/register	  Register a new user
POST	/api/auth/login	      Login and receive JWT

📝 Posts
Method	  Endpoint       	     Description
POST	   /api/posts	      Create post (auth required)
GET	     /api/posts	      Fetch all posts
GET	     /api/posts/:id	  Get post by ID
PUT	     /api/posts/:id	  Update post (auth & owner)
DELETE	 /api/posts/:id	  Delete post (auth & owner/admin)

💬 Comments
Method     	Endpoint                      	Description
POST	    /api/comments	             Create comment (auth required)
GET	      /api/comments?post_id=1	   Get comments for a specific post
GET	      /api/comments/:id	         Get comment by ID
PUT	      /api/comments/:id	         Update comment (auth & owner)
DELETE	  /api/comments/:id	         Delete comment (auth & owner/admin)


🚀 Swagger Documentation
API documentation is available at:
http://localhost:4000/api-docs


Includes:
Route details
Request & response schemas
Live Try-it-out feature


🧪 Running Tests
This project includes both unit and integration tests using Jest and Supertest.

🧪 Test Environment Setup
A separate .env.test file is used to define the test database connection and environment variables specifically for testing.

The database defined in .env.test (testDB) is completely isolated from your main app database.

Create a .env.test file in the project root with:

 .env.test

SERVER_PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=testDB
DB_USER=postgres
DB_PASSWORD=yourpassword
JWT_SECRET=your_test_jwt_secret

📦 Running Tests
Run all tests:
npm test

The test DB is automatically synced and cleared.
Temporary test data (users, posts, comments) is created.
All functionalities are tested independently and safely.

✅ Ensures tests are reliable and don’t interfere with real application data.



🧠 Key Features Implemented
✅ JWT Authentication & Role-Based Authorization

✅ Full CRUD for Posts & Comments

✅ Sequelize Models & Relationships

✅ Input Validation (express-validator)

✅ Swagger API Docs with live try-out

✅ Unit & Integration Testing

✅ Separate .env.test and testDB for safe testing



🧾 Example curl Request
bash

curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "nishi123",
    "email": "nishi@example.com",
    "password": "mypassword"
}'



👩‍💻 Developer
Nishi Mishra
Backend Developer (Node.js, Express.js, SQL)
GitHub: https://github.com/Nishi-1805

📄 License
This project is licensed under the MIT License.

You are free to use, modify, and distribute this software with attribution. It is provided "as-is" without any warranty.