//there are vars in the url that I will need to have set:
//temperature_unit (default is C, need F),
//wind_speed_unit (default is kmh, need mph)
// precipitation_unit (default is mm, need inch)
// timeformat (default iso8601, check docs)
// timezone	(GMT, check docs)

export interface PastConditions {
  city?: string;
  latitude: number;
  longitude: number;
  generationtime_ms?: number;
  utc_offset_seconds?: number;
  timezone?: string;
  timezone_abbreviation?: string;
  elevation?: number;
  daily_units: {
    time?: string;
    temperature_2m_max: string;
    temperature_2m_min?: string;
    rain_sum: string;
    snowfall_sum?: string;
    wind_speed_10m_max: string;
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    rain_sum: number[];
    snowfall_sum: number[];
    wind_speed_10m_max: number[];
  };
}
