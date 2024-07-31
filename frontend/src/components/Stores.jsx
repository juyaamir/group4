import { useState } from 'react';
import axios from 'axios';
import cities from '../assets/germany.json';
import PropTypes from 'prop-types';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; 
import markerIcon from '../assets/map-marker-icon-.png'; 
import markerShadow from 'leaflet/dist/images/marker-shadow.png'; 
import pic3 from '../assets/pic3.jpg';
import pic5 from '../assets/pic4.jpg'
import pic4 from '../assets/pic1.jpg'
import pic1 from '../assets/pic2.jpg';

const customIcon = L.icon({
  iconUrl: markerIcon,
  iconSize: [25, 41], 
  iconAnchor: [12, 41], 
  popupAnchor: [1, -34], 
  shadowUrl: markerShadow, 
  shadowSize: [41, 41], 
  shadowAnchor: [12, 41] 
});

const Stores = () => {
  const [store, setStore] = useState(``);
  const [suggestions, setSuggestions] = useState([]);
  const [location, setLocation] = useState([52.451129, 13.542489]); 
  const [zoom, setZoom] = useState(4); 

  const handleClick = async (e) => {
    e.preventDefault();
    fetchLocationCoordinates(store);
  };

  const handleChange = async (e) => {
    setStore(e.target.value);
    if (e.target.value.length > 3) {
      fetchLocationSuggestions(e.target.value);
    }
  };

  const fetchLocationSuggestions = async (query) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/location?destination=${query}`);
      setSuggestions(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchLocationCoordinates = async (query) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/location?destination=${query}`);
      if (response.data && response.data.length > 0) {
        const locationData = response.data[0];
        if (locationData.lat && locationData.lon) {
          setLocation([parseFloat(locationData.lat), parseFloat(locationData.lon)]);
          setZoom(5); 
        } else {
          console.log('Location data does not contain lat and lon');
        }
      } else {
        console.log('No location data found');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setStore(suggestion.display_name);
    setSuggestions([]);
  };

  const handleCityClick = (city) => {
    setLocation([parseFloat(city.lat), parseFloat(city.lon)]);
    setZoom(20); 
  };

  const ChangeMapView = ({ coords, zoom }) => {
    const map = useMap();
    map.setView(coords, zoom);
    return null;
  };
  ChangeMapView.propTypes = {
    coords: PropTypes.arrayOf(PropTypes.number).isRequired,
    zoom: PropTypes.number.isRequired,
  };

  return (
    <div>
      <h1 className='text-center text-2xl my-4 font-thin'>STORES</h1>
      <div className=' min-h-screen mb-10 mx-4 sm:mx-0 md:mx-10 lg:mx-60 flex flex-col' >
        <div className='flex flex-wrap'>
          <div className='w-full md:w-1/3 height p-2'>
          <form>
            <div className='flex flex-wrap justify-center'>
                <input
                  onChange={handleChange}
                  value={store}
                  type='text'
                  placeholder='Type a postcode or address...'
                  className='border-2 border-gray-200 rounded-md p-2 m-2 flex-grow w-full md:w-auto'
                />
                
                <button onClick={handleClick}
                className='btn btn-primary bg-gray-600 hover:bg-gray-800 p-2 m-2 w-full md:w-auto md:flex-grow'>
                Search
              </button>
              <div>
                <ul>
                  {
                  suggestions.map((suggestion, index) => (
                    <li key={index} onClick={() => handleSuggestionClick(suggestion)} className="bg-gray-50 hover:cursor-pointer hover:bg-gray-200 m-2">
                      {suggestion.display_name}
                    </li>
                  ))
                  }
                </ul>
              </div>
            </div>
          </form>
          <ul>
            {cities.map((city, index) => (
              <li key={index} onClick={() => handleCityClick(city)} className="hover:cursor-pointer hover:bg-gray-200 m-2 border-b-2 border-dashed">
                <b>{city.name}</b>
                <p>{city.address}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className='w-full md:w-2/3 p-2 height2'>
          <div style={{ height: '500px' }}> 
            <MapContainer center={location} zoom={zoom} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
              <ChangeMapView coords={location} zoom={zoom} />
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
              />
              {cities.map((city, index) => (
                <Marker key={index} position={[parseFloat(city.lat), parseFloat(city.lon)]} icon={customIcon}>
                  <Popup>
                    <b>{city.name} </b>
                    <p>
                      <u>
                        <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(city.address)}`} target="_blank" rel="noopener noreferrer">
                          {city.address}
                        </a>
                      </u>
                    </p>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
        </div>
        
        <div className='flex flex-grow  w-full p-2 
        fGap  flex-wrap mt-10
        '>
          <img src={pic1} alt="vacation pic" 
          className='width border border-gray-100 h-auto  hover:border-none hover:cursor-pointer'
          />
          <div className='width border border-gray-100 flex flex-col justify-between'>
            <img src={pic3} alt="vacation pic" 
            className='hover:border-none hover:cursor-pointer border border-gray-100'
            />
            <img src={pic5} alt="vacation pic" 
            className='hover:border-none hover:cursor-pointer border border-gray-100' />
          </div>

          <img src={pic4} alt="vacation pic" 
          className='width border border-gray-100 h-auto hover:border-none hover:cursor-pointer '
          />
        </div>
      </div>
    </div>
  );
};

export default Stores;