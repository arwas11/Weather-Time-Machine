export interface CurrentConditions {
    lat: number;
    lon: number;
    city?: string;
    description: string;
    temperature: number;
    feelsLike?: number;
    rain?: number;
    snow?: number;
    windSpeed: number;

    // units?: string; // imperial F or metric

    // extra info to get
    // sunset?: number;
    // sunrise?: number
    // humidity?: number;
    // not sure
    // windDirection: string;
    // visibility?: number
    // snowLevels?: number;
    // timeOfDay?: string;
}
