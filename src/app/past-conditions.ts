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
    city?: string
    temperatureMax: number;
    temperatureMin: number;
    Rain?: number;
    snow?: number;
    windSpeedMax: number;


    // timezone?: string;
    // temperatureUnit?: string;
    // windSpeedUnit?: string;
    // extra info to get
    // sunrise?: string | Date;
    // sunset?:  string | Date ;
    // windDirection?: number;
    // weatherCode: number;
    // snowfallSum?: number;
    // rainSum: number;
}
