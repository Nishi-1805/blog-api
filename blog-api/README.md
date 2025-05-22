📝 Blog API
A RESTful API for a blog application that allows users to register, authenticate, create blog posts, and manage comments. It includes role-based access control and is fully tested and documented using Swagger.

  ---

📌 Project Overview
Project ID: SCR845NGFF
Duration: 25 days
Objective: Develop a RESTful API for a blog application with full CRUD operations for posts and comments, user authentication, and role-based access control.

  ---

🛠️ Technologies Used
| Tech | Purpose |
|------|---------|
| Node.js | Backend Runtime |
| Express.js | Web Framework |
| PostgreSQL | Database |
| Sequelize | ORM |
| JWT | Authentication |
| Jest + Supertest | Testing |
| Swagger | API Documentation |

  ---

📂 Project Structure
SCR845NGFF
├──blog-api/
    ├── controllers/
    ├── middlewares/
    ├── models/
    ├── routes/
    ├── config/
    ├── tests/
    ├── app.js
    ├── package-lock.json
    ├── package.json
    ├── server.js
    ├── swagger.js
    └── README.md

  ---

⚙️ Setup Instructions
Clone the repository:


git clone https://github.com/Nishi-1805/blog-api.git
cd blog-api


Install dependencies:
npm install


Configure environment variables:
Create a .env file in the root directory and add the following:
SERVER_PORT=4000
DB_PORT=5432
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=your_db_password
DB_NAME=blogdb
JWT_SECRET=your_jwt_secret


Start the server:
npm start


The server will run on http://localhost:4000.

  ---


🔐 Authentication & Roles
JWT-based login system

Roles: user and admin

Only post/comment authors or admins can modify/delete their content


📬 API Endpoints
🔐 Auth
Method	   Endpoint	           Description
POST	/api/auth/register	Register a new user
POST	/api/auth/login	    Login and receive JWT

📝 Posts
Method	 Endpoint	           Description
POST	/api/posts	        Create post (auth required)
GET	    /api/posts	        Fetch all posts
GET	    /api/posts/:id	    Get post by ID
PUT	    /api/posts/:id	    Update post (auth & owner)
DELETE	/api/posts/:id	    Delete post (auth & owner/admin)

💬 Comments
Method	  Endpoint	                    Description
POST	/api/comments	          Create comment (auth required)
GET	    /api/comments?post_id=1	  Get comments for post
GET	    /api/comments/:id	      Get comment by ID
PUT	    /api/comments/:id	      Update comment (auth & owner)
DELETE	/api/comments/:id	      Delete comment (auth & owner/admin)


🚀 Swagger Documentation
Accessible at:

http://localhost:4000/api-docs
Includes all route definitions, request/response formats, and live testing support.


🧪 Running Tests
Run unit and integration tests using:

npm test
Test environment is configured with a separate database (testDB).


🧠 Key Features Implemented
✅ JWT Authentication & Role-Based Authorization

✅ Full CRUD for Posts & Comments

✅ Sequelize Models & Relationships

✅ Input Validation (express-validator)

✅ Swagger API Docs

✅ Unit & Integration Tests

✅ Separate Test DB (.env.test)



🧾 Example curl Request

curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "nishi123",
    "email": "nishi@example.com",
    "password": "mypassword"
}'


🧑‍💻 Developer
Nishi Mishra
Backend Developer (Node.js, Express.js, SQL)
GitHub Profile : https://github.com/Nishi-1805/


📄 License
This project is licensed under the MIT License.

You are free to use, modify, and distribute this software with attribution. It is provided "as-is" without any warranty.