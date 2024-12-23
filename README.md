<!--

1. Project Setup:

Code editor: Visual Studio.
Initialize a Node.js project:
Create a new directory for your project.
Open your terminal and navigate to the project directory.
Run npm init -y to create a package.json file.   
Install dependencies:

npm install express mongoose bcryptjs jsonwebtoken cookie-parser pdfkit dotenv

2. API Routes and Endpoints:

User Routes:
/api/user/register: POST - Create a new user account.
/api/user/login: POST - Authenticate a user and generate a JWT.
/api/user/profile: GET - Get the authenticated user's profile.

Invoice Routes:
/api/invoice/create: POST - Create a new invoice.
/api/invoice/get: GET - Get a list of invoices (for admin or the logged-in user).
/api/invoice/update/:id: PUT - Update an existing invoice.
/api/invoice/delete/:id: DELETE - Delete an invoice.
/api/invoice/generate-pdf/:id: GET - Generate and download a PDF of the specified invoice.

3. Data Modeling (Mongoose):

Define Mongoose schemas for User and Invoice models.
Specify data types, required fields, and validation rules for each field.

4. Controllers:

Create separate controllers for User and Invoice to handle business logic for each route.
Implement functions for creating, reading, updating, and deleting users and invoices.
Handle user authentication and authorization (e.g., checking for admin privileges).

5. Middleware:

Create middleware for:
Authentication: Verify JWTs in protected routes.
Authorization: Check if the user has the necessary permissions (e.g., admin access).

6. PDF Generation:

Use the pdfkit library to generate PDF documents.
Retrieve invoice data from the database.
Create a PDF with customer details, invoice items, taxes, and total amount.
Provide a download link or stream the PDF to the client.

7. Error Handling:

Implement proper error handling and return appropriate HTTP status codes.
Use try-catch blocks to catch exceptions and log errors.

8. Testing:

Write unit tests to ensure the functionality of individual components.
Write integration tests to verify the end-to-end behavior of the API.

Explanation of Choices:

Express.js: A popular and lightweight framework for building Node.js web applications and APIs.
Mongoose: An Object Data Modeling (ODM) library for MongoDB, providing a convenient way to interact with the database.
bcrypt: A strong password hashing library for security.
jsonwebtoken: For creating and verifying JSON Web Tokens for authentication.
cookie-parser: For handling cookies, which can be used to store session information or authentication tokens.
pdfkit: A powerful library for generating PDF documents in Node.js.


Challenges:

Data validation and sanitization: Ensuring that user input is valid and safe to process.
Security: Implementing proper authentication, authorization, and data protection measures.
PDF generation: Designing and implementing a clean and visually appealing PDF layout.
Error handling: Creating robust error handling mechanisms to provide informative and helpful error messages. -->
