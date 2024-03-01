# Weather Time Machine API

Weather Time Machine RESTful API was built using Node.js, Express.js, Sqlite, Sequelize. The API complements the front-end by implementing a social interaction feature where users can share their thoughts about the weather data by posing comments and adding likes to other users' comments. 

The server extends the functionality of the Weather Time Machine front-end by implementing the following:

- User register & login
- Authentication with JWT tokens & Role-Based Access Control (RBAC)
- Data Security and Encryption


<!-- ## Project Deployment

This app will be deployed on Render. The link to the deployed will be add soon. -->

## Installation

1 - Fork or directly clone this branch, "backend-module", to your local machine using your IDE terminal (I use VS Code).

2 - Use the Node package manager [npm](https://www.npmjs.com/) to install Weather Time Machine's dependencies by using this command:

```bash
npm install
```

3 - to run the server side only, use the following command:

```bash
npm run server-dev
```

## API Documentation

[Postman Documentation](https://documenter.getpostman.com/view/30497146/2sA2rGvesJ)

## Usage

The API endpoints covered in the previous section execute the following role-based features:

- As a Visitor

  - Read all comments
  - Register & log in
  - Submit a feedback (to be added)

- As a User

  - Log in
  - Post/Edit/Delete associated comment
  - Like and remove a like from a comment
  - Delete account (to be added)
  - Add searched data to a saved list (to be added)
  - Remove from saved list (to be added)
  - Search data in saved list (to be added)

- As a Admin 
  - Log in
  - Get all user's data
  - Post/Edit/Delete users' comments
  - Like and remove a like from users' comment (to be add)
  - Delete any entity (to be added)

## API Testing

The API endpoints were tested with Postman.

Unit tests will be added in the feature.

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Credits

- Historical Weather API [Open-Meteo](https://open-meteo.com/),
- Current Weather API [OpenWeather](https://open-meteo.com/),
- [date-fns](https://date-fns.org/)
