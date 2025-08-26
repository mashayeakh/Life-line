# Life-Line Student Management API

A backend API built with **Express.js** and **MongoDB Atlas** for managing student profiles. The API supports creating, fetching, and storing student data, including file uploads.

---

## Features

- Add new students with detailed profiles
- Upload student images
- Retrieve all students
- MongoDB Atlas integration for cloud database storage
- Ready for deployment on **Vercel**

---

## Folder Structure

Server/
│
├─ api/
│ └─ index.js # Entry point for Vercel serverless deployment
│
├─ Routes/
│ └─ StudentProfileRouter/
│ └─ StudentProfileRouter.js
│
├─ Controller/
│ └─ StudentProfileController/
│ └─ CreateInformationController.js
│
├─ Model/
│ └─ StudentProfileModel/
│ └─ StudentProfileModel.js
│
├─ Uploads/ # Folder to store uploaded images
│
├─ .env # Environment variables
├─ .gitignore
├─ package.json
└─ vercel.json


---

## Installation

1. Clone the repository:

```
git clone <your-repo-url>
cd Server
```

2. Install dependencies:

```
npm install
```

3. Create a .env file in the root:

```
PORT=5000
MONGO_URI=<your-mongodb-atlas-uri>
```

Running Locally

```
nodemon api/index.js
```

Visit the API at:
```
http://localhost:5000/api/v1/students
```

API Endpoints:

Get All Students
URL: /api/v1/students
Method: GET

Response:
```
{
  "success": true,
  "message": "Students retrieved successfully",
  "data": [
    {
      "_id": "68ad6a0050577fd07e714042",
      "studentName": "John Doe",
      "email": "john.doe@example.com",
      ...
    }
  ]
}
```