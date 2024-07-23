import fetchWeather from "./fetchWeather.js";

//Get weather data
export const getWeather = async(req, res) => {
    const {destination, start, end} = req.query;
    const weather = await fetchWeather(destination, start, end);
    res.status(200).json(weather)
}