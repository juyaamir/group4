import { useState } from "react";
import axios from "axios";

import { fetchLocation } from "./utils/fetchLocation.jsx";

const initialFormData = {
  location: '',
  start: '',
  end: ''
}

const LocationAPI = ({ setMessages, messages, setHide2 }) => {
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const [show, setShow] = useState(false);
  const [activities, setActivities] = useState([]);
  const [hotel, setHotel] = useState(null);
  const [showForm, setShowForm] = useState(true);
  console.log(activities);
  console.log(hotel);

  const [{ stream, message }, setState] = useState({
    stream: true,
    message: '',
  });

  const handleChange = async (e) => {
    const { name, value: inputValue } = e.target;
    const newValue =
      e.target.type === 'checkbox' ? e.target.checked : inputValue;
    setFormData((prevFormData) => {
        const updatedFormData = { ...prevFormData, [name]: newValue };
        if (name === 'location' && updatedFormData.location.length > 3) {
          fetchLocationSuggestions(updatedFormData.location);
        }
        return updatedFormData;
    });
    setState((prev) => ({ ...prev, [name]: newValue }));
};

const fetchLocationSuggestions = async (location) => {
    setError(null);
    setLoading(true);
    try {
        const suggestions = await fetchLocation(location);
        setSuggestions(suggestions);
    } catch (error) {
        setError(error);
        console.error('Error fetching the location', error);
    } finally {
        setLoading(false);
    }
};

  const handleSubmit =  async(e) => {
    e.preventDefault();
    setShowForm(false);
    setHide2(true);
    const newMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: message,
    };
    setMessages((prev) => [...prev, newMessage]);
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/weather?destination=${formData.location}&start=${formData.start}&end=${formData.end}`);
      const {data} = response;
      const dataToSend = {
        timezone: data.timezone, resolvedAddress: data.resolvedAddress, 
        days: data.days.map((day) => ({
          datetime: day.datetime,
          tempmax: day.tempmax,
          tempmin: day.tempmin,
          precipprob: day.precipprob,
          windgust: day.windgust,
          humidity: day.humidity,
          uvindex: day.uvindex,
          condition: day.conditions,
          description: day.description
        })) 
      };
      setFormData(initialFormData);
      /* const weatherMessage */
      const fullMessage = `Provide a short and precise packing list and hotel recommendations in a structured 
      format with headings and bullet points for my trip given: 
      weather forecast: ${dataToSend}, 
      activities to do: ${activities}, 
      hotel type: ${hotel}, other activities: ${message}`;
      //const fullMessage = `${weatherMessage} ${message}`;

      const aiResponse = await fetch(
        'http://localhost:8000/api/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            provider: 'open-ai',
            mode: 'production',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'gpt-4o',
            messages: [...messages, { ...newMessage, content: fullMessage }],
            stream,
          }),
        }
      );

      setState({
        stream,
        message: '',
      });

      if (stream) {
        const reader = aiResponse.body.getReader();
        const decoder = new TextDecoder('utf-8');
  
        let result;
        const messageId = crypto.randomUUID();
        while (!(result = await reader.read()).done) {
          const chunk = decoder.decode(result.value, { stream: true });
          const lines = chunk.split('\n'); 
          lines.forEach((line) => {
            if (line.startsWith('data:')) {
              const jsonStr = line.replace('data:', '').trim();
              try {
                const data = JSON.parse(jsonStr);
                const content = data.choices[0]?.delta?.content;
                if (content) {
                  setMessages((prev) => {
                    const found = prev.find((m) => m.id === messageId);
                    if (found) {
                      return prev.map((m) =>
                        m.id === messageId
                          ? { ...m, content: `${m.content}${content}` }
                          : m
                      );
                    }
                    return [
                      ...prev,
                      { role: 'assistant', content, id: messageId },
                    ];
                  });
                }
              } catch (error) {
                console.error('Failed to parse JSON:', error);
              }
            }
          });
        }
      } else {
        const { message: newMessage } = await aiResponse.json(); 
  
        setMessages((prev) => [
          ...prev,
          { ...newMessage, id: crypto.randomUUID() },
        ]);
      }

    } catch (error) {
      console.error('Error fetching the weather', error);
    }
    
  };

  const handleSuggestionClick = (suggestion) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      location: suggestion.display_name
    }));
    setSuggestions([]);
  };

  const handleActivity = (e) => {
    const {name, checked} = e.target;
    if(checked) {
      setActivities([...activities, name]);
    }
  };

  const handleHotel = (e) => {
    const {value} = e.target;
    setHotel(value);
  }

  if(loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {
        showForm && 
        <form onSubmit={handleSubmit} disabled={loading} className="p-4 mx-auto my-20 border border-gray-200 rounded-lg w-80 ">
        
        {
        !show && !ready ? (
          <div>
            <p className="text-center mb-3 font-bold">Enter Your Trip Details</p>
            <div>
              <label htmlFor="start" className="mx-4" >Start Date</label>
              <input type="date" name="start" id="start"
              value={formData.start}
              onChange={handleChange}
              placeholder="Enter the start date"
              className="p-1 text-center mx-4 my-1 border border-gray-200 w-64"
              />
              </div>
              <div>
              <label htmlFor="end" className="mx-4">End Date</label>
              <input
              type="date" id="end" name="end"
              value={formData.end}
              onChange={handleChange}
              placeholder="Enter the end date"
              className="p-1 text-center mx-4 my-1 border border-gray-200 w-64 "
              />
              </div>
              <div>
              <label htmlFor="location" className="mx-4">Destination</label>
              <input type="search" name="location" id="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter the destination"
              className="p-1 text-center mx-4 my-1 border border-gray-200 w-64"
              />
              <ul>
                {suggestions.map((suggestion, index) => (
                  <li key={index} onClick={() => handleSuggestionClick(suggestion)} className="bg-gray-50 hover:cursor-pointer hover:bg-gray-200 m-2">
                    {suggestion.display_name}
                  </li>
                ))}
              </ul>
              </div>
        </div> 
        ) : show && !ready ? (
                    <fieldset className="border p-2 rounded-lg">
            <legend className="text-center ">Choose Activities</legend>
            <div className="text-6xl text-blue-400 flex flex-wrap gap-2">
              <div>
                <input type="checkbox" id="swimming" name="Swimming" onChange={handleActivity} />
                <label htmlFor="swimming" title='swimming'><i className=" p-1 fa-solid fa-person-swimming"></i></label>
              </div>
              <div>
                <input type="checkbox" id="hiking" name="Hiking" onChange={handleActivity} />
                <label htmlFor="hiking" title='hiking'><i className=" p-1 fa-solid fa-person-hiking"></i></label>
              </div>
              <div>
                <input type="checkbox" id="cycling" name="Cycling" onChange={handleActivity}/>
                <label htmlFor="cycling" title='cycling'><i className=" p-1 fa-solid fa-person-biking"></i></label>
              </div>
              <div>
                <input type="checkbox" id="skiing" name="Skiing" onChange={handleActivity} />
                <label htmlFor="skiing" title='skiing'><i className=" p-1 fa-solid fa-person-skiing"></i></label>
              </div>
              <div>
                <input type="checkbox" id="snowboarding" name="Snowboarding" onChange={handleActivity} />
                <label htmlFor="snowboarding" title='snowboarding'><i className="p-1 fa-solid fa-person-snowboarding"></i></label>
              </div>
              <div>
                <input type="checkbox" id="camping" name="Camping" onChange={handleActivity} />
                <label htmlFor="camping" title='camping'><i className="p-1 fa-solid fa-fire"></i></label>
              </div>
              <div>
                <input type="checkbox" id="beach" name="Beach" onChange={handleActivity} />
                <label htmlFor="beach" title='beach'><i className="p-1 fa-solid fa-umbrella-beach"></i></label>
              </div>
              <div>
                <input type="checkbox" id="running" name="Running" onChange={handleActivity} />
                <label htmlFor="running" title='running'><i className="p-1 fa-solid fa-person-running"></i></label>
              </div>
              <div>
                <input type="checkbox" id="photography" name="Photography" onChange={handleActivity} />
                <label htmlFor="photography" title='photography'><i className="p-1 fa-solid fa-camera"></i></label>
              </div>
            </div>
          </fieldset>
        ) : (
          <div>
            <fieldset className="border p-2 rounded-lg">
              <legend className="text-center">Choose Hotel Type</legend>
              <div>
                <input type="radio" id="full" name="hotel" value="Full Service Hotels" onChange={handleHotel} />
                <label htmlFor="full">Full Service Hotel</label>
              </div>
              <div>
                <input type="radio" id="boutique" name="hotel" value="Boutique Hotels" onChange={handleHotel} />
                <label htmlFor="boutique">Boutique Hotel</label>
              </div>
              <div>
                <input type="radio" id="friendly" name="hotel" value="Budget Friendly Hotels" onChange={handleHotel} />
                <label htmlFor="friendly">Budget Friendly Hotel</label>
              </div>
              <div>
                <input type="radio" id="luxury" name="hotel" value="Luxury Hotels" onChange={handleHotel} />
                <label htmlFor="luxury">Luxury Hotel</label>
              </div>
              <div>
                <input type="radio" id="business" name="hotel" value="Business Hotels" onChange={handleHotel} />
                <label htmlFor="business">Business Hotel</label>
              </div>
              <div>
                <input type="radio" id="eco" name="hotel" value="Eco Friendly Hotels" onChange={handleHotel} />
                <label htmlFor="eco">Eco Friendly Hotel</label>
              </div>
            </fieldset>
              <textarea
                name="message"
                placeholder="What else would you like to add?"
                onChange={handleChange}
                value={message}
                className="block w-full p-2 my-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              </textarea>
              <label className="block mb-4">
              <span className="text-blue-400">Stream</span>
              <input
              type="checkbox"
              name="stream"
              onChange={handleChange}
              checked={stream}
              className=""
            />
            </label>
          </div>
        )
      }

        {
          !show && !ready ? (
          formData.location &&  formData.start && formData.end && 
          <button key='next' type="button" onClick={(()=> {setShow(true)})}
          className="border border-gray-300 px-3 bg-green-800 rounded-lg mx-auto block text-white p-1 my-2 w-full"
          >Select Activities</button>
          ) : show && !ready ? (
            <button type="button" key='next2' onClick={()=> setReady(true)}
            className="border border-gray-300 px-3 bg-green-800 rounded-lg mx-auto block text-white p-1 my-2 w-full"
            >Select Hotel Type</button>
          ) : (
          <button key='submit' type="submit" 
          className="border border-gray-300 px-3 bg-orange-500 rounded-lg mx-auto block text-white p-1 my-2 w-full "
          disabled={loading} >
          {loading ? 'loading...' : 
          'Begin Packing'} </button>
          )

        }
      </form>
      } 
    </div>
  );
};

export default LocationAPI;