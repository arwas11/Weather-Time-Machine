# Weather Time Machine's Server-Side

Weather Time Machine server-side is a RESTful API that was built using Node.js, Express.js, Sqlite, Sequelize.

The server extends the functionality of the Weather Time Machine front-end by adding and executing the following features:
- User register & login
- Authentication with JWT tokens & Role-Based Access Control (RBAC) 
- Data Security and Encryption

## Project Deployment

This app will be deployed on Render. The link to the deployed will be add soon.


## Installation

1 - Fork or directly clone this current branch, "backend-module", to your local machine using your IDE terminal (I use VS Code).

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

## API Testing

The API endpoints were tested with Postman. Mock tests will be added in the feature. 

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Credits

- Historical Weather API [Open-Meteo](https://open-meteo.com/),
- Current Weather API [OpenWeather](https://open-meteo.com/),
- [date-fns](https://date-fns.org/)
