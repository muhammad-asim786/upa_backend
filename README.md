# UPA Backend - Production-Ready Node.js Backend

A complete, production-ready Node.js backend with authentication and user profile management.

## 🚀 Features

- **User Registration** - Email-based registration with OTP verification
- **OTP Verification** - Secure 6-digit OTP sent via email (hashed in database)
- **Password Management** - Secure password hashing with bcrypt
- **JWT Authentication** - Token-based authentication
- **User Profile** - Get and update user profile (name, image)
- **Email Integration** - Nodemailer for sending OTP emails

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- Gmail account with App Password (for email sending)

## 🛠️ Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd upa_backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables**
   Edit `.env` file with your configuration:
   - `MONGODB_URI` - Your MongoDB connection string
   - `JWT_SECRET` - A strong secret key for JWT signing
   - `EMAIL_USER` - Your Gmail address
   - `EMAIL_PASS` - Your Gmail App Password (not regular password)

   **How to get Gmail App Password:**
   1. Go to your Google Account settings
   2. Enable 2-Step Verification
   3. Go to App Passwords
   4. Generate a new app password for "Mail"
   5. Use that password in `EMAIL_PASS`

5. **Start the server**
   ```bash
   npm start
   ```

   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

## 📡 API Endpoints

### Authentication Routes

#### 1. Register User
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "OTP sent to your email. Please check your inbox.",
  "data": {
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "isVerified": false
    },
    "verificationToken": "jwt_token_here"
  }
}
```

#### 2. Verify OTP
```http
POST /auth/verify-otp
Content-Type: application/json

{
  "otp": "123456",
  "verificationToken": "jwt_token_from_register"
}
```

**Response:**
```json
{
  "success": true,
  "message": "OTP verified successfully. You can now set your password.",
  "data": {
    "verificationToken": "jwt_token_here"
  }
}
```

#### 3. Set Password
```http
POST /auth/set-password
Content-Type: application/json

{
  "password": "your_password",
  "verificationToken": "jwt_token_from_verify_otp"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password set successfully. You can now login.",
  "data": {
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "name": "",
      "image": "",
      "isVerified": true,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

#### 4. Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "your_password"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "jwt_access_token",
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "name": "",
      "image": "",
      "isVerified": true,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

### User Profile Routes (Protected)

#### 5. Get Profile
```http
GET /user/profile
Authorization: Bearer jwt_access_token
```

**Response:**
```json
{
  "success": true,
  "message": "Profile retrieved successfully",
  "data": {
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "name": "John Doe",
      "image": "https://example.com/image.jpg",
      "isVerified": true,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

#### 6. Update Profile
```http
PUT /user/profile
Authorization: Bearer jwt_access_token
Content-Type: application/json

{
  "name": "John Doe",
  "image": "https://example.com/image.jpg"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "name": "John Doe",
      "image": "https://example.com/image.jpg",
      "isVerified": true,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

## 🔒 Security Features

- **Password Hashing** - All passwords are hashed using bcrypt (10 salt rounds)
- **OTP Hashing** - OTPs are hashed before storing in database
- **JWT Tokens** - Secure token-based authentication
- **OTP Expiration** - OTPs expire after 5 minutes
- **Input Validation** - Joi validation for all inputs
- **Email Verification** - Users must verify email before setting password

## 📁 Project Structure

```
upa_backend/
├── src/
│   ├── config/
│   │   ├── db.js          # MongoDB connection
│   │   ├── env.js         # Environment configuration
│   │   └── mail.js        # Email transporter setup
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── user.controller.js
│   ├── services/
│   │   ├── auth.service.js
│   │   ├── otp.service.js
│   │   └── user.service.js
│   ├── models/
│   │   ├── User.js
│   │   └── Otp.js
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   └── validate.middleware.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   └── user.routes.js
│   └── utils/
│       ├── jwt.js
│       ├── hash.js
│       └── sendEmail.js
├── app.js
├── server.js
├── package.json
├── env.template           # Environment variables template
├── UPA_Backend.postman_collection.json  # Postman collection for API testing
└── README.md
```

## 🧪 Testing the API with Postman

### Quick Start - Import Postman Collection

**Option 1: Import Pre-built Collection (Recommended)**
1. Open Postman
2. Click "Import" button (top left)
3. Select the file `UPA_Backend.postman_collection.json` from the project root
4. The collection will be imported with all requests pre-configured
5. Set up environment variables (see below)

**Option 2: Manual Setup**

1. **Create a New Collection**
   - Open Postman
   - Click "New" → "Collection"
   - Name it "UPA Backend API"

2. **Set Up Environment Variables (Required)**
   - Click the "Environments" icon (eye icon) in the top right
   - Click "+" to create a new environment
   - Name it "UPA Backend Local"
   - Add these variables:
     - `base_url` = `http://localhost:3000`
     - `verification_token` = (leave empty, will be set automatically)
     - `access_token` = (leave empty, will be set automatically)
   - Save and select this environment
   - **Note:** If you imported the collection, these variables are already in the collection variables, but environment variables are recommended for easier management

3. **Create Requests in Collection**
   - Create a folder "Authentication" for auth endpoints
   - Create a folder "User Profile" for profile endpoints
   - Or use the imported collection which already has these organized

---

### 📋 Postman Collection - Step by Step Guide

#### **Step 1: Register User**

**Request Setup:**
- **Method:** `POST`
- **URL:** `{{base_url}}/auth/register`
- **Headers:**
  - `Content-Type: application/json`
- **Body (raw JSON):**
  ```json
  {
    "email": "test@example.com"
  }
  ```

**Response Handling:**
- Copy the `verificationToken` from the response
- Go to your email inbox and copy the 6-digit OTP
- Save `verificationToken` to environment variable:
  - In Postman, go to Tests tab
  - Add this script to auto-save token:
  ```javascript
  if (pm.response.code === 201) {
      const jsonData = pm.response.json();
      pm.environment.set("verification_token", jsonData.data.verificationToken);
  }
  ```

**Expected Response:**
```json
{
  "success": true,
  "message": "OTP sent to your email. Please check your inbox.",
  "data": {
    "user": {
      "id": "user_id",
      "email": "test@example.com",
      "isVerified": false
    },
    "verificationToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

#### **Step 2: Verify OTP**

**Request Setup:**
- **Method:** `POST`
- **URL:** `{{base_url}}/auth/verify-otp`
- **Headers:**
  - `Content-Type: application/json`
- **Body (raw JSON):**
  ```json
  {
    "otp": "123456",
    "verificationToken": "{{verification_token}}"
  }
  ```
  > **Note:** Replace `123456` with the actual OTP from your email

**Response Handling:**
- The response will return a new `verificationToken` (same or updated)
- Save it to environment variable (Tests tab):
  ```javascript
  if (pm.response.code === 200) {
      const jsonData = pm.response.json();
      pm.environment.set("verification_token", jsonData.data.verificationToken);
  }
  ```

**Expected Response:**
```json
{
  "success": true,
  "message": "OTP verified successfully. You can now set your password.",
  "data": {
    "verificationToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

#### **Step 3: Set Password**

**Request Setup:**
- **Method:** `POST`
- **URL:** `{{base_url}}/auth/set-password`
- **Headers:**
  - `Content-Type: application/json`
- **Body (raw JSON):**
  ```json
  {
    "password": "password123",
    "verificationToken": "{{verification_token}}"
  }
  ```

**Expected Response:**
```json
{
  "success": true,
  "message": "Password set successfully. You can now login.",
  "data": {
    "user": {
      "id": "user_id",
      "email": "test@example.com",
      "name": "",
      "image": "",
      "isVerified": true,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

---

#### **Step 4: Login**

**Request Setup:**
- **Method:** `POST`
- **URL:** `{{base_url}}/auth/login`
- **Headers:**
  - `Content-Type: application/json`
- **Body (raw JSON):**
  ```json
  {
    "email": "test@example.com",
    "password": "password123"
  }
  ```

**Response Handling:**
- Copy the `token` from response
- Save `access_token` to environment variable (Tests tab):
  ```javascript
  if (pm.response.code === 200) {
      const jsonData = pm.response.json();
      pm.environment.set("access_token", jsonData.data.token);
  }
  ```

**Expected Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "user_id",
      "email": "test@example.com",
      "name": "",
      "image": "",
      "isVerified": true,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

---

#### **Step 5: Get User Profile (Protected)**

**Request Setup:**
- **Method:** `GET`
- **URL:** `{{base_url}}/user/profile`
- **Headers:**
  - `Authorization: Bearer {{access_token}}`
  - Or use Postman's Authorization tab:
    - Type: `Bearer Token`
    - Token: `{{access_token}}`

**Expected Response:**
```json
{
  "success": true,
  "message": "Profile retrieved successfully",
  "data": {
    "user": {
      "id": "user_id",
      "email": "test@example.com",
      "name": "",
      "image": "",
      "isVerified": true,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

---

#### **Step 6: Update User Profile (Protected)**

**Request Setup:**
- **Method:** `PUT`
- **URL:** `{{base_url}}/user/profile`
- **Headers:**
  - `Authorization: Bearer {{access_token}}`
  - `Content-Type: application/json`
- **Body (raw JSON):**
  ```json
  {
    "name": "John Doe",
    "image": "https://example.com/image.jpg"
  }
  ```
  > **Note:** Both fields are optional. You can update just `name` or just `image`.

**Expected Response:**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "user": {
      "id": "user_id",
      "email": "test@example.com",
      "name": "John Doe",
      "image": "https://example.com/image.jpg",
      "isVerified": true,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

---

### 🔄 Complete Workflow in Postman

**Quick Reference Table:**

| Step | Endpoint | Method | Auth Required | Token Used |
|------|----------|--------|---------------|------------|
| 1 | `/auth/register` | POST | No | - |
| 2 | `/auth/verify-otp` | POST | No | verification_token |
| 3 | `/auth/set-password` | POST | No | verification_token |
| 4 | `/auth/login` | POST | No | - |
| 5 | `/user/profile` | GET | Yes | access_token |
| 6 | `/user/profile` | PUT | Yes | access_token |

**Workflow Steps:**
1. ✅ Register → Get `verificationToken` and OTP via email
2. ✅ Verify OTP → Use OTP from email + `verificationToken`
3. ✅ Set Password → Use `verificationToken` from step 2
4. ✅ Login → Get `access_token`
5. ✅ Get Profile → Use `access_token` in Authorization header
6. ✅ Update Profile → Use `access_token` in Authorization header

---

### 💡 Postman Tips & Tricks

1. **Auto-save Tokens:**
   - Add the Tests scripts mentioned above to automatically save tokens
   - Tokens will be available as `{{verification_token}}` and `{{access_token}}`

2. **Collection Variables:**
   - You can also use Collection Variables instead of Environment Variables
   - Right-click collection → Variables tab

3. **Pre-request Scripts:**
   - Use Pre-request Scripts to set dynamic values
   - Example: Generate random email for testing

4. **Tests Tab:**
   - Add assertions to validate responses
   ```javascript
   pm.test("Status code is 200", function () {
       pm.response.to.have.status(200);
   });
   
   pm.test("Response has success field", function () {
       var jsonData = pm.response.json();
       pm.expect(jsonData.success).to.eql(true);
   });
   ```

5. **Organizing Requests:**
   - Use folders: "Authentication" and "User Profile"
   - Add descriptions to each request
   - Save example responses

---

### 🧪 Alternative: Testing with cURL

You can also test using curl commands:

```bash
# Register
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'

# Verify OTP (use OTP from email and token from register response)
curl -X POST http://localhost:3000/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{"otp":"123456","verificationToken":"your_token_here"}'

# Set Password
curl -X POST http://localhost:3000/auth/set-password \
  -H "Content-Type: application/json" \
  -d '{"password":"password123","verificationToken":"your_token_here"}'

# Login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Get Profile (use token from login)
curl -X GET http://localhost:3000/user/profile \
  -H "Authorization: Bearer your_access_token"

# Update Profile
curl -X PUT http://localhost:3000/user/profile \
  -H "Authorization: Bearer your_access_token" \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","image":"https://example.com/image.jpg"}'
```

## 📝 Notes

- OTPs are automatically deleted after successful verification
- Expired OTPs are automatically cleaned up by MongoDB TTL index
- Previous OTPs are deleted when a new one is generated
- All user responses exclude `passwordHash` field
- JWT tokens expire after 7 days (configurable via `JWT_EXPIRES_IN`)

## 🐛 Troubleshooting

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check `MONGODB_URI` in `.env`

2. **Email Not Sending**
   - Verify Gmail App Password is correct
   - Check `EMAIL_USER` and `EMAIL_PASS` in `.env`
   - Ensure 2-Step Verification is enabled on Gmail

3. **JWT Token Errors**
   - Verify `JWT_SECRET` is set in `.env`
   - Check token expiration time

## 📄 License

ISC



## ngrok http

ngrok http 3000# upa_backend
