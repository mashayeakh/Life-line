
# Life-Line Student Management API

A backend API built with **Express.js** and **MongoDB Atlas** for managing student profiles. The API supports creating, fetching, and storing student data, including file uploads.

---

## Table of Contents
- [Features](#features)
- [Folder Structure](#folder-structure)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [File Access](#file-access)

---

## Features
- Create new student profiles with detailed information
- Upload student profile images
- Retrieve all students
- Filter students by mode (Online / Offline)
- Search students by Name, Email, Mobile Number, or ID
- MongoDB Atlas integration for cloud database storage
- Ready for deployment on Vercel

---

## Folder Structure
```text
Server/
├─ api/
│  └─ index.js              # Entry point for Vercel serverless deployment
├─ Routes/
│  └─ StudentProfileRouter/
│     └─ StudentProfileRouter.js
├─ Controller/
│  └─ StudentProfileController/
│     ├─ CreateInformationController.js
│     └─ FilteringInformationController.js
├─ Model/
│  └─ StudentProfileModel/
│     └─ StudentProfileModel.js
├─ uploads/                 # Folder to store uploaded images
├─ .env                     # Environment variables
├─ .gitignore
├─ package.json
└─ vercel.json
```

git clone <your-repo-url>
npm install
nodemon api/index.js

---

## Installation

1. **Clone the repository:**
  ```bash
  git clone <your-repo-url>
  cd Server
  ```

2. **Install dependencies:**
  ```bash
  npm install
  ```

3. **Create a `.env` file in the root:**
  ```env
  PORT=5000
  MONGO_URI=<your-mongodb-atlas-uri>
  ```

4. **Run the server locally:**
  ```bash
  nodemon api/index.js
  ```

---

## Base URL
```
http://localhost:5000/api/v1
```


---

## API Endpoints

### 1. Create Student Profile
- **URL:** `/students`
- **Method:** `POST`
- **Content-Type:** `multipart/form-data`
- **Description:** Creates a new student profile. Supports uploading a profile image (`profileImage`) and a resume (`resume`).

#### Body Parameters (form-data)
| Key                   | Type   | Required | Notes                                      |
|-----------------------|--------|----------|--------------------------------------------|
| studentName           | Text   | Yes      | Student's full name                        |
| fathersName           | Text   | Yes      | Father's full name                         |
| mothersName           | Text   | Yes      | Mother's full name                         |
| dateOfBirth           | Date   | Yes      | Format: YYYY-MM-DD                         |
| gender                | Text   | Yes      | Male / Female / Other                      |
| email                 | Text   | Yes      | Valid email address                        |
| mobileNumber          | Text   | Yes      | 11 digits                                  |
| mode                  | Text   | Yes      | Online / Offline                           |
| offlineCourseAccess   | Text   | Yes*     | Lab Access / Library Access (Offline only)  |
| offlineCourseDuration | Text   | Yes*     | 3/6/12 months (Offline only)                |
| offlineSession        | Text   | Yes*     | Morning / Evening / Night (Offline only)    |
| admissionDate         | Date   | Yes      | Format: YYYY-MM-DD                         |
| batchNumber           | Text   | Yes      | Batch identifier                            |
| courseFee             | Number | Yes      | Must be ≥ 0                                 |
| due                   | Number | No       | Defaults to 0                               |
| paymentStatus         | Text   | No       | Paid / Pending, defaults to Pending         |
| onlineCourseName      | Text   | Yes*     | Web/App/Graphic Design (Online only)        |
| onlineCourseDuration  | Text   | Yes*     | 1/3/6 months (Online only)                  |
| onlineSession         | Text   | Yes*     | Morning / Evening / Weekend (Online only)   |
| profileImage          | File   | No       | Profile image file                          |
| resume                | File   | No       | Resume file                                 |

\* Required only for the respective mode.

#### Example Response
```json
{
  "success": true,
  "message": "Student profile created successfully",
  "data": {
    "_id": "68b1276683dd1516b3bca2a9",
    "studentName": "John Doe",
    "fathersName": "Richard Doe",
    "mothersName": "Mary Doe",
    "dateOfBirth": "2000-01-01T00:00:00.000Z",
    "gender": "Male",
    "email": "john.doe@example.com",
    "mobileNumber": "01712345678",
    "mode": "Offline",
    "offlineCourseAccess": "Lab Access",
    "offlineCourseDuration": "3 months",
    "offlineSession": "Morning",
    "admissionDate": "2025-08-26T00:00:00.000Z",
    "batchNumber": "B001",
    "courseFee": 5000,
    "due": 0,
    "paymentStatus": "Paid",
    "imageUrl": "uploads/1693328471234-profile.jpg",
    "createdAt": "2025-08-29T04:07:02.160Z",
    "updatedAt": "2025-08-29T04:07:02.160Z"
  }
}
```

---

### 2. Get All Students
- **URL:** `/students`
- **Method:** `GET`
- **Description:** Fetch all student profiles.

#### Example Response
```json
{
  "success": true,
  "message": "All students fetched successfully",
  "count": 3,
  "data": [
    {
      "_id": "68b1276683dd1516b3bca2a9",
      "studentName": "Nicole Tesla",
      "mode": "Offline",
      "imageUrl": "uploads/12345-profile.jpg"
      // ...
    }
  ]
}
```

---

### 3. Get Students by Mode
- **URL:** `/students/mode?mode=Online`
- **Method:** `GET`
- **Query Parameter:** `mode` (Online / Offline)
- **Description:** Fetch students filtered by their mode.

#### Example Response
```json
{
  "success": true,
  "message": "2 students found",
  "data": [
    {
      "_id": "68b12bd18b2dd585ae91f11a",
      "studentName": "Alice Smith",
      "mode": "Online",
      "onlineCourseName": "Web Development",
      "imageUrl": "uploads/67890-profile.jpg",
      ...
    }
  ]
}


---

### 4. Search Students
- **URL:** `/students/search?query=<text-or-id>`
- **Method:** `GET`
- **Query Parameter:** `query` (Student Name, Email, Mobile Number, or MongoDB ID)
- **Description:** Search students by name, email, phone number, or MongoDB `_id`.

#### Example Response
```json
{
  "success": true,
  "message": "1 student(s) found",
  "data": [
    {
      "_id": "68b1276683dd1516b3bca2a9",
      "studentName": "John Doe",
      "email": "john.doe@example.com",
      "mobileNumber": "01712345678",
      "mode": "Offline",
      "imageUrl": "uploads/1693328471234-profile.jpg"
      // ...
    }
  ]
}
```

---

## File Access

Uploaded files (profile images and resumes) can be accessed via:
```
http://localhost:5000/<imageUrl-or-resume-path>
```

**Example:**
```
http://localhost:5000/uploads/1693328471234-profile.jpg
```
