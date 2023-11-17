//there are vars in the url that I will need to have set:
    //temperature_unit (default is C, need F),
    //wind_speed_unit (default is kmh, need mph) 
    // precipitation_unit (default is mm, need inch)
    // timeformat (default iso8601, check docs)
    // timezone	(GMT, check docs)


export interface PastConditions {
    latitude: number;
    longitude: number;
    startDate: Date;
    endDate: Date;
    timezone?: string;
    temperatureUnit?: string;
    windSpeedUnit?: string;
    //info to get
    // temperatureMax: number;
    // temperatureMin: number;
    // sunrise?: string | Date;
    // sunset?:  string | Date ;
    // windSpeedMax: number;
    // windDirection?: number;
    // weatherCode: number;
    // city?: string;
    // snowfallSum?: number;
    // rainSum: number;
}
