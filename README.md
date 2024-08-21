Sports Facility Booking API
Overview
This project provides a RESTful API for managing sports facility bookings. Users can sign up, log in, create and view bookings, and admins can manage facilities and view all bookings.

Project Setup and Running Instructions
Prerequisites
Ensure you have the following installed on your machine:

Node.js (latest version)
npm or yarn
MongoDB (running locally or a cloud instance)
Installation
Clone the Repository:


git clone https://github.com/yourusername/sports-facility-booking.git
cd sports-facility-booking
Install Dependencies:

npm install
# or
yarn install
Environment Variables:
Create a .env file in the root of the project and add the following environment variables:

env

PORT=3000
MONGO_URI=your_url
JWT_SECRET=your_jwt_secret
Start the Server:



npm start
# or
yarn start
The server should now be running on http://localhost:3000.

API Endpoints
User Routes
1. User Sign Up
Route: POST /api/auth/signup
Request Body:
json
Copy code
{
  "name": "Programming Hero",
  "email": "web@programming-hero.com",
  "password": "programming-hero",
  "phone": "01322901105",
  "role": "admin", // or 'user'
  "address": "Level-4, 34, Awal Centre, Banani, Dhaka"
}
Response:
json

{
  "success": true,
  "statusCode": 200,
  "message": "User registered successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c4",
    "name": "Programming Hero",
    "email": "web@programming-hero.com",
    "role": "admin",
    "phone": "01322901105",
    "address": "Level-4, 34, Awal Centre, Banani, Dhaka"
  }
}
2. User Login
Route: POST /api/auth/login
Request Body:
json
Copy code
{
  "email": "web@programming-hero.com",
  "password": "programming-hero"
}
Response:
json

{
  "success": true,
  "statusCode": 200,
  "message": "User logged in successfully",
  "token": "JWT_TOKEN",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c4",
    "name": "Programming Hero",
    "email": "web@programming-hero.com",
    "role": "admin",
    "phone": "01322901105",
    "address": "Level-4, 34, Awal Centre, Banani, Dhaka"
  }
}
Facility Routes
3. Create a Facility (Admin Only)
Route: POST /api/facility
Headers:
json
{
  "Authorization": "Bearer JWT_TOKEN"
}
Request Body:
json

{
  "name": "Tennis Court",
  "description": "Outdoor tennis court with synthetic surface.",
  "pricePerHour": 30,
  "location": "456 Sports Ave, Springfield"
}
Response:
json

{
  "success": true,
  "statusCode": 200,
  "message": "Facility added successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c5",
    "name": "Tennis Court",
    "description": "Outdoor tennis court with synthetic surface.",
    "pricePerHour": 30,
    "location": "456 Sports Ave, Springfield",
    "isDeleted": false
  }
}
4. Update a Facility (Admin Only)
Route: PUT /api/facility/:id
Headers:
json

{
  "Authorization": "Bearer JWT_TOKEN"
}
Request Body:
json
Copy code
{
  "name": "Updated Tennis Court",
  "description": "Updated outdoor tennis court with synthetic surface.",
  "pricePerHour": 35,
  "location": "789 Sports Ave, Springfield"
}
Response:
json
Copy code
{
  "success": true,
  "statusCode": 200,
  "message": "Facility updated successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c5",
    "name": "Updated Tennis Court",
    "description": "Updated outdoor tennis court with synthetic surface.",
    "pricePerHour": 35,
    "location": "789 Sports Ave, Springfield",
    "isDeleted": false
  }
}
5. Delete a Facility - Soft Delete (Admin Only)
Route: DELETE /api/facility/:id
Headers:
json

{
  "Authorization": "Bearer JWT_TOKEN"
}
Response:
json

{
  "success": true,
  "statusCode": 200,
  "message": "Facility deleted successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c5",
    "name": "Updated Tennis Court",
    "description": "Updated outdoor tennis court with synthetic surface.",
    "pricePerHour": 35,
    "location": "789 Sports Ave, Springfield",
    "isDeleted": true
  }
}
6. Get All Facilities
Route: GET /api/facility
Response:
json
Copy code
{
  "success": true,
  "statusCode": 200,
  "message": "Facilities retrieved successfully",
  "data": [
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c5",
      "name": "Tennis Court",
      "description": "Outdoor tennis court with synthetic surface.",
      "pricePerHour": 30,
      "location": "456 Sports Ave, Springfield",
      "isDeleted": false
    }
  ]
}
Booking Routes
7. Check Availability
Route: GET /api/check-availability
or 
GET /api/check-availability?date=2024-06-15

Response:
json

{
  "success": true,
  "statusCode": 200,
  "message": "Availability checked successfully",
  "data": [
    {
      "startTime": "08:00 AM",
      "endTime": "10:00 AM"
    },
    {
      "startTime": "02:00 PM",
      "endTime": "04:00 PM"
    }
  ]
}
8. Create a Booking (User Only)
Route: POST /api/bookings
Headers:
json

{
  "Authorization": "Bearer JWT_TOKEN"
}
Request Body:
json

{
  "facility": "60d9c4e4f3b4b544b8b8d1c5",
  "date": "2024-06-15",
  "startTime": "10:00 AM",
  "endTime": "01:00 PM"
}
Response:
json

{
  "success": true,
  "statusCode": 200,
  "message": "Booking created successfully",
  "data": {
    "_id": "60d9c4e4f3b4b544b8b8d1c6",
    "facility": "60d9c4e4f3b4b544b8b8d1c5",
    "date": "2024-06-15",
    "startTime": "10:00",
    "endTime": "13:00",
    "user": "60d9c4e4f3b4b544b8b8d1c4",
    "payableAmount": 90,
    "isBooked": "confirmed"
  }
}
9. View All Bookings (Admin Only)
Route: GET /api/bookings
Headers:
json
Copy code
{
  "Authorization": "Bearer JWT_TOKEN"
}
Response:
json

{
  "success": true,
  "statusCode": 200,
  "message": "Bookings retrieved successfully",
  "data": [
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c6",
      "facility": {
        "_id": "60d9c4e4f3b4b544b8b8d1c5",
        "name": "Tennis Court"
      },
      "date": "2024-06-15",
      "startTime": "10:00",
      "endTime": "13:00",
      "user": {
        "_id": "60d9c4e4f3b4b544b8b8d1c4",
        "name": "Programming Hero"
      },
      "payableAmount": 90,
      "isBooked": "confirmed"
    }
  ]
}
10. View Bookings for a Specific User (User Only)
Route: GET /api/bookings/user
Headers:
json

{
  "Authorization": "Bearer JWT_TOKEN"
}
Response:
json

{
  "success": true,
  "statusCode": 200,
  "message": "Bookings retrieved successfully",
  "data": [
    {
      "_id": "60d9c4e4f3b4b544b8b8d1c6",
      "facility": {
        "_id": "60d9c4e4f3b4b544b8b8d1c5",
        "name": "Tennis Court"
      },
      "date": "2024-06-15",
      "startTime": "10:00",
      "endTime": "13:00",
      "payableAmount": 90,
      "isBooked": "confirmed"
    }
  ]
}
Models and Interfaces
Facility
User
Booking
Testing
To run tests, use:


npm test
# or
yarn test
Error Handling
All errors are handled through middleware to ensure consistent error messages.

Authentication & Authorization
JWT is used for user authentication. Users must be authenticated for all actions except for the Check Availability endpoint. Admins have additional privileges to manage facilities and view all bookings.

License
This project is licensed under the MIT License - see the LICENSE file for details.
