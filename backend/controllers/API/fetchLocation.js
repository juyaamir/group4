import axios from 'axios';

const fetchLocation = async (place) => {
    const url = `https://api.locationiq.com/v1/autocomplete`;
    try {
        const response = await axios.get(url, {
            params: {
                key: process.env.API_KEY,
                q: place,
                format: 'json',
                accept_language: 'en',
            }
        });
        return response.data;
    } catch (error) {
        console.log(`Error Fetching the data from location API : ${error.message}`);
    }
}

export default fetchLocation