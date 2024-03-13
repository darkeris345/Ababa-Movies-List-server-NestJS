# Movie List Server

The server-side code for the Movie List application. This server provides the necessary backend functionality to support the client-side application, allowing users to browse and manage their favorite movies. You can download client-side code [here](https://github.com/darkeris345/Movies-List-FE)

## Getting Started

To get started, first, you need git, Node.js, and NestJS  installed, and to create the MongoDB database.


## Installation
1. Clone the repository:

   ```bash
   git clone https://github.com/darkeris345/Movies-List-server-NestJS.git
   ```

2. Navigate to the repository directory:

   ```bash
   cd Ababa-Movies-List-server-NestJS
   ```

3. Install dependencies:

   ```bash
   npm i
   ```

4. Run the server:

   ```bash
   npm start
   ```

## MongoDB Database Setup

1. Create a MongoDB account if you don't have one:[MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) for more details.

2. Create a MongoDB database and give it the name you want. Create two collections: user and movie.

3. Create a .env file in this project and add your database details. Here is an example:

```bash
PORT=3000
DATABASE_URL=mongodb+srv://<USERNAME>:<PASSWORD>@tours.fpc6858.mongodb.net/<DATABASE_NAME>?retryWrites=true&w=majority
JWT_SECRET=YOUR_JWT_SECRET_KEY
JWT_EXPIRES_IN=1d
```


# Giving user the admin type

There are two types of users: Admin and User. Admin users can additionally add, edit, and remove movies from the movie list. Users have only read-only access to the movie list, they can only view the list, add those movies to their favorite list, and remove them.

## Adding Admin Type using Postman

To add an admin type, you can use Postman to make a POST request to your authentication endpoint when registering a new user. Provide the following JSON payload in the request body:

```json
{
  "username": "YOUR_USERNAME",
  "password": "YOUR_PASSWORD",
  "type": "admin"
}
```

You can change the type of user as well in MongoDB in user collection.

