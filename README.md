# Weather Jamais Vu 

Weather Jamais Vu is a TypeScript/JavaScript weather app that shows the difference between current and past weather conditions in a given city. 

This app was built using Angular and Typescript for the client-side and Node.js, Express.js, Sqlite, Sequelize for the server-side. I also used Bootstrap to style the app.

This is a full-stack version to a front-end app that I originally built using React. My goal behind building this app is to enable the user to compare weather conditions and show how climate change has been affecting our planet (hence the Jamais vu).


## Poject Demo

This app was deployed on Render:



## Project Screenshots



## Installation

1 - Fork or clone this repository to your local machine using your IDE terminal (I use VS Code)

2 - Use the Node package manager [npm](https://www.npmjs.com/) to install Weather Jamais Vu's dependencies by using this command:
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
- To get the current weather data for a given city, type the city name inside the Current Weather input. 
- To see or compare past weather conditions with current weather one in a, input a date in the Pas Weather section. Due to the past weather API limitations, only weather data for dates that are within the past 40 years and 5 days prior to the current date are available.
- Read comments added by registered users.
- Sign up
- Submit a feedback

Features available to registered users: 
- Log in
- Add/Edit/Delete a comment
- Like other comments
- Delete account
- Add searched data to a saved list Save a search 
- Remove from saved list
- Search data in saved list

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Credits
- Historical Weather API [Open-Meteo](https://open-meteo.com/),
- Current Weather API [OpenWeather](https://open-meteo.com/),
-  [date-fns](https://date-fns.org/)
