import { useState } from "react";
import axios from "axios";

const fetchLocation = async (location) => {
  try {
    const response = await axios.get(`http://localhost:8000/api/v1/location?destination=${location}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Error fetching the location';
  }
};

const LocationAPI = () => {
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [formData, setFormData] = useState({
    location: '',
    start: '',
    end: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
    setError(null);
    if (formData.location.length > 2) {
        setLoading(true);
      try {
        const suggestions = await fetchLocation(formData.location);
        setSuggestions(suggestions);
      } catch (error) {
        setError(error);
        console.error('Error fetching the location', error);
      } finally {
        setLoading(false);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSubmit =  (e) => {
    e.preventDefault();

  };

  const handleSuggestionClick = (suggestion) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      location: suggestion.display_name
    }));
    setSuggestions([]);
  };
  if(loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <form onSubmit={handleSubmit} disabled={loading} className="p-4 mx-auto my-20 border border-gray-200 rounded-lg w-64 ">
        <label htmlFor="location" className="mx-4" >
            Destination: 
        </label>
        <input
          type="search"
          name="location"
          id="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Enter the destination"
          className="p-1 text-center mx-4 my-1 border border-gray-200 w-52"
        />
        <ul>
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)} className="bg-gray-50 hover:cursor-pointer hover:bg-gray-200 m-2">
              {suggestion.display_name}
            </li>
          ))}
        </ul>

        <label htmlFor="start" className="mx-4" >
            Start Date: 
        </label>
        <input
          type="date"
          name="start"
          id="start"
          value={formData.start}
          onChange={handleChange}
          placeholder="Enter the start date"
          className="p-1 text-center mx-4 my-1 border border-gray-200 w-52"
        />
        <label htmlFor="end" className="mx-4" >
            End Date: 
        </label>
        <input
          type="date"
          id="end"
          name="end"
          value={formData.end}
          onChange={handleChange}
          placeholder="Enter the end date"
          className="p-1 text-center mx-4 my-1 border border-gray-200 w-52"
        />
        <button type="submit" 
            className="border border-gray-300 px-3 bg-orange-500 rounded-lg mx-auto block text-white p-1 my-2 "
            disabled={loading} >
            Search
        </button>
      </form>
    </div>
  );
};

export default LocationAPI;