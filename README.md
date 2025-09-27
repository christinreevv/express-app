Postman

GET

http://localhost:5002/api/users
http://localhost:5002/api/users/68d8081158d45d005c5026b9

POST

http://localhost:5002/api/auth/register

{
  "fullName": "Кристина",
  "birthDate": "2000-01-01",
  "email": "chris@example.com",
  "password": "123456"
}

http://localhost:5002/api/auth/login

{
  "email": "ivan@example.com",
  "password": "123456"
}

PATCH

http://localhost:5002/api/users/68d8081158d45d005c5026b9/block
