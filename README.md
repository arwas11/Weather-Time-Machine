# Weather Time Machine 

Weather Time Machine is a TypeScript/JavaScript weather app that explores past and present weather conditions in a given city. 

This app was built using Angular and Typescript for the client-side and Node.js, Express.js, Sqlite, Sequelize for the server-side. It also utilizes Bootstrap for styling.

This is a full-stack version to a front-end app that I originally built using React. My goal behind building this app is to evoke a sense of exploration and discovery through the app and show how climate change has been affecting our planet.


## Project Deployment

This app will be deployed on Render. The link to the deployed will be add soon.


## Project Screenshots
Website:

![Weather Time Machine website](https://github.com/arwas11/Weather-App/assets/146148342/d529ea71-2128-406b-8edd-23e3d096d4e8)

Wireframe:

![home page wireframe](https://github.com/arwas11/Weather-App/assets/146148342/59d422c5-0ff1-434f-9b63-c5dea45482ea)
![profile page wireframe](https://github.com/arwas11/Weather-App/assets/146148342/5c06f0e5-6a58-4d9c-8e56-4d6af563977f)
![contact us page wireframe](https://github.com/arwas11/Weather-App/assets/146148342/14660450-f0d8-4881-aa52-b07fd4f638e6)

## Installation

1 - Fork or directly clone this repository to your local machine using your IDE terminal (I use VS Code).

2 - Use the Node package manager [npm](https://www.npmjs.com/) to install Weather Time Machine's dependencies by using this command:
```bash
npm install
```

3 - to run the client and the server concurrently, use the following command:
```bash
npm run code
```

4 - to run the client side only, use the following command:
```bash
ng serve
```

5 - to run the server side only, use the following command:
```bash
npm run server-dev
```

## Usage

Features available to all visitors:
- To get the current weather data for a given city, type the city name inside the Current Weather input field. 
- To see past weather conditions, input a date in the Past Weather section. *Due to the past weather API limitations, only weather data for dates that are within the past 40 years and 5 days prior to the current date are available.
- Read comments posted by registered users.
- Sign up & Log in
- Submit a feedback (to be added)

Features available to registered users only: 
- Log in
- Add/Edit/Delete a comment
- Like and remove a like from a comment
- Delete account (to be added)
- Add searched data to a saved list (to be added)
- Remove from saved list (to be added)
- Search data in saved list (to be added)

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Credits

- Historical Weather API [Open-Meteo](https://open-meteo.com/),
- Current Weather API [OpenWeather](https://open-meteo.com/),
- [date-fns](https://date-fns.org/)
