import fetchLocation from "./fetchLocation.js";

//get location data
export const getLocation = async (req, res) => {
    const destination = req.query.destination;
    const location = await fetchLocation(destination);
    res.status(200).json(location);
}