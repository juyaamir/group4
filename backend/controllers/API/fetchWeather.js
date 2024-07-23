import axios from 'axios';

const fetchWeather = async(destination, start, end) => {
    try {
        const response = await axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${destination}/${start}/${end}?key=${process.env.WEATHER_API_KEY}`);
        return response.data;

    }catch (error) {
        console.error(`fetching the data from weather API: ${error.message}`);
    }
}

export default fetchWeather