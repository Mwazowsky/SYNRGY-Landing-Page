[# BINAR Car Rental RESTAPI Docs

These examples were taken from projects mainly using [Django Rest
Framework](https://github.com/tomchristie/django-rest-framework) and so the
JSON responses are often similar to the way in which DRF makes responses.

Where full URLs are provided in responses they will be rendered as if service
is running on 'http://testserver/'.

## Open Endpoints

Open endpoints require no Authentication.

# API Binar Car Rental

## API Endpoints

### Cars

- **GET /api/cars**
  - Description: Get a list of cars.
  - Example Request: `GET http://localhost:8000/api/cars`
  - Example Response:
    ```json
    {
      "type": "success",
      "message": "Berhasil mengambil data dari database!",
      "data": [
        {
          "car_id": 1,
          "name": "honda",
          "price": 5500,
          "picture": "img",
          "start_rent": "2023-11-08T07:07:32.214Z",
          "finish_rent": "2023-10-08T12:00:00.000Z",
          "created_at": "2023-11-08T07:07:32.214Z",
          "updated_at": "2023-11-08T07:07:32.214Z"
        },
        {
          "car_id": 2,
          "name": "suzuki",
          "price": 4500,
          "picture": "http://res.cloudinary.com/dqhdxgqyc/image/upload/v1699506566/tz44yqqyyswasyhecrqy.jpg",
          "start_rent": "2023-11-09T05:09:27.700Z",
          "finish_rent": null,
          "created_at": "2023-11-09T05:09:27.700Z",
          "updated_at": "2023-11-09T05:09:27.700Z"
        }]
    }
    ```

- **POST /api/users**
  - Description: Create a new car.
  - Example Request: `POST http://localhost:8000/api/cars`
    - Request Body:
      ```json
      {
        "name" : "honda",
        "price" : 2500,                
        "picture" : "https://res.cloudinary.com/dqhdxgqyc/image/upload/v1699507003/rzrg3r7qkn1xh2jwflk5.jpg",
        "start_rent" : "CURRENT_TIMESTAMP",
        "finish_rent" : "CURRENT_TIMESTAMP"
      }
      ```
  - Example Response:
    ```json
    { 
      "type": "success",
      "message": "Upload gambar dan data berhasil!",
      "data": [
        "name" : "honda",
        "price" : 2500,                
        "picture" : "https://res.cloudinary.com/dqhdxgqyc/image/upload/v1699507003/rzrg3r7qkn1xh2jwflk5.jpg",
        "start_rent" : "CURRENT_TIMESTAMP",
        "finish_rent" : "CURRENT_TIMESTAMP"
      ],
    }
    ```

- **PUT /api/users/:carId**
  - Description: Update a car.
  - Example Request: `PUT http://localhost:8000/api/cars/1`
    - Request Body:
      ```json
      {
        "name" : "honda",
        "price" : 2500,                
        "picture" : "https://res.cloudinary.com/dqhdxgqyc/image/upload/v1699507003/rzrg3r7qkn1xh2jwflk5.jpg",
        "start_rent" : "CURRENT_TIMESTAMP",
        "finish_rent" : "CURRENT_TIMESTAMP"
      }
      ```
  - Example Response:
    ```json
    { 
      "type" : "success",
      "message" : "Data berhasil diperbarui!",
      "data" : [
        "name" : "honda",
        "price" : 2500,                
        "picture" : "https://res.cloudinary.com/dqhdxgqyc/image/upload/v1699507003/rzrg3r7qkn1xh2jwflk5.jpg",
        "start_rent" : "CURRENT_TIMESTAMP",
        "finish_rent" : "CURRENT_TIMESTAMP"
      ],
    }
    ```

- **DELETE /api/users/:carId**
  - Description: Delete a car.
  - Example Request: `DELETE http://localhost:8000/api/cars/1`
    
  - Example Response:
    ```json
    { 
      "type" : "success",
      "message" : "Data berhasil dihapus!",
      "id" : carId
    }
    ```

* [Login](login.md) : `POST /api/login/`

## Endpoints that require Authentication

Closed endpoints require a valid Token to be included in the header of the
request. A Token can be acquired from the Login view above.

### Current User related

Each endpoint manipulates or displays information related to the User whose
Token is provided with the request:

* [Show info](user/get.md) : `GET /api/user/`
* [Update info](user/put.md) : `PUT /api/user/`

### Account related

Endpoints for viewing and manipulating the Accounts that the Authenticated User
has permissions to access.

* [Show Accessible Accounts](accounts/get.md) : `GET /api/accounts/`
* [Create Account](accounts/post.md) : `POST /api/accounts/`
* [Show An Account](accounts/pk/get.md) : `GET /api/accounts/:pk/`
* [Update An Account](accounts/pk/put.md) : `PUT /api/accounts/:pk/`
* [Delete An Account](accounts/pk/delete.md) : `DELETE /api/accounts/:pk/`
](url)
