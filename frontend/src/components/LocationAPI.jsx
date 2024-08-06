import { useState } from "react";
import axios from "axios";
import hero from '../assets/bg-form.jpg'

 import { fetchLocation } from "./utils/fetchLocation.jsx";

const LocationAPI = ({ setMessages, messages, setHide2, formData, setFormData,activities, setActivities}) => {
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const [show, setShow] = useState(false);
  const [hotel, setHotel] = useState(null);
  const [showForm, setShowForm] = useState(true);
  const [showBG, setShowBG] = useState(true);



  const [{ stream, message }, setState] = useState({
    stream: true,
    message: '',
  });
  //change handler for the form fields
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

//location suggestions 
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
  //form submit handler 
  const handleSubmit =  async(e) => {
    e.preventDefault();
    setShowBG(false);
    setShowForm(false);
    setHide2(true);
    const newMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: message,
    };
//console.log("line updated")
    setMessages([...messages, newMessage]);
    // setMessages((prev) => [...prev, newMessage]);
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/weather?destination=${formData.location}&start=${formData.start}&end=${formData.end}`);
      const {data} = response;
      const weatherData = {
        timezone: data.timezone, 
        resolvedAddress: data.resolvedAddress, 
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
      
      //console.log(weatherData);

      //prompt for the AI
      const prompt  = `Give a brief overview of the weather, then provide a 
      packing list based on the weather forecast data and the activities, also recommend hotels based on the hotel type, in the following format:
      **Weather Overview:**

      **Packing List:**
      <p><b><i>Clothing</i></b></p>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li> 
        <li>...</li>
      </ul> 
      <b><i>Essentials</i></b>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li> 
        <li>...</li>
      </ul>

      <b><i>Toiletries</i></b>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li> 
        <li>...</li>
      </ul>

      <b><i>Accessories</i></b>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li> 
        <li>...</li>
      </ul>
      <b><i>Activity name</i></b>
      <ul>
        <li>Item 1 for activity</li>
        <li>Item 2 for activity</li> 
        <li>...</li>
      </ul>
      <b><i>Personal Items</i></b>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li> 
        <li>...</li>
      </ul> 

      **Hotel Recommendations:**
      <p><u>Hotel Name 1</u></p>
      <ul>
        <li>Feature 1</li>
        <li>Feature 2</li> 
        <li>...</li>
      </ul> 
      
      Ensure each item, including sub-items, is on a separate line. 
      Given:
      * Weather forecast: ${JSON.stringify(weatherData)}
      * Activities to do: ${JSON.stringify(activities)}
      * Hotel type: ${hotel}
      * Other activities: ${message}`;
      

      //posting the prompt to the AI and getting the response
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
            // messages: [{ ...newMessage, content: prompt }],
            // messages: [...messages, { content: prompt }],
            messages: [...messages, { ...newMessage, content: prompt }],
            stream,
          }),
        }
      );
      //console.log(aiResponse);
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
     /*  console.log(activities); */
    }
  };

  const handleHotel = (e) => {
    const {value} = e.target;
    setHotel(value);
  }

  if(loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (showBG &&
    <div style={{backgroundImage: `url(${hero})`}} className="border  min-h-screen bg-cover bg-center bg-no-repeat">    
      {
        showForm && 
        <form onSubmit={handleSubmit} disabled={loading}  
        className="p-8 mx-auto my-20 border bg-white rounded-lg width3 shadow-md ">
        
        {
        !show && !ready ? (
          <div>
            <p className="text-center mb-4 font-bold text-lg">Enter Your Trip Details</p>
            <div className="mb-3">
              <label htmlFor="start" className="block mb-2 font-medium" >Start Date</label>
              <input type="date" name="start" id="start" min={new Date().toISOString().split('T')[0] }
              value={formData.start}
              onChange={handleChange}
              placeholder="Enter the start date"
              className="p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              </div>
              <div className="mb-3">
              <label htmlFor="end" className="block mb-2 font-medium">End Date</label>
              <input
              type="date" id="end" name="end"
              value={formData.end}
              onChange={handleChange}
              placeholder="Enter the end date"
              className="p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              </div>
              <div className="mb-3">
              <label htmlFor="location" className="block mb-2 font-medium">Destination</label>
              <input type="search" name="location" id="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter the destination"
              className="p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ul>
                {suggestions.map((suggestion, index) => (
                  <li key={index} onClick={() => handleSuggestionClick(suggestion)} className=" hover:cursor-pointer hover:bg-gray-200 m-2">
                    {suggestion.display_name}
                  </li>
                ))}
              </ul>
              </div>
        </div> 
        ) : show && !ready ? (
            <fieldset className="border p-2 rounded-lg">
            <legend className="text-center ">Choose Activities</legend>
            <div className="text-6xl text-blue-400 flex flex-wrap gap-2 ">
              <div className="hover:text-blue-600  border hover:border-none relative w-20 ">
                <input type="checkbox" id="swimming" name="Swimming" onChange={handleActivity} className="absolute top-0 left-0 "/>
                <label htmlFor="swimming" title='swimming'><i className="  fa-solid fa-person-swimming"></i></label>
                <p className="text-base">Swimming</p>
              </div>
              <div className="hover:text-blue-600 border hover:border-none relative w-20">
                <input type="checkbox" id="hiking" name="Hiking" onChange={handleActivity} className="absolute top-0 left-0" />
                <label htmlFor="hiking" title='hiking'><i className=" p-1 fa-solid fa-person-hiking"></i></label>
                <p className="text-base">Hiking</p>
              </div>
              <div className="hover:text-blue-600 border hover:border-none relative w-20">
                <input type="checkbox" id="cycling" name="Cycling" onChange={handleActivity} className="absolute top-0 left-0"/>
                <label htmlFor="cycling" title='cycling'><i className=" p-1 fa-solid fa-person-biking"></i></label>
                <p className="text-base">Cycling</p>
              </div>
              <div className="hover:text-blue-600 border hover:border-none relative w-20">
                <input type="checkbox" id="skiing" name="Skiing" onChange={handleActivity} className="absolute top-0 left-0" />
                <label htmlFor="skiing" title='skiing'><i className=" p-1 fa-solid fa-person-skiing"></i></label>
                <p className="text-base">Skiing</p>
              </div>
              <div className="hover:text-blue-600 border hover:border-none relative w-20">
                <input type="checkbox" id="snowboarding" name="Snowboarding" onChange={handleActivity} className="absolute top-0 left-0" />
                <label htmlFor="snowboarding" title='snowboarding'><i className="p-1 fa-solid fa-person-snowboarding"></i></label>
                <p className="text-base">Snowboad..</p>
              </div>
              <div className="hover:text-blue-600 border hover:border-none relative w-20">
                <input type="checkbox" id="camping" name="Camping" onChange={handleActivity} className="absolute top-0 left-0" />
                <label htmlFor="camping" title='camping'><i className="p-1 fa-solid fa-fire"></i></label>
                <p className="text-base">Camping</p>
              </div>
              <div className="hover:text-blue-600 border hover:border-none relative w-20">
                <input type="checkbox" id="beach" name="Beach" onChange={handleActivity} className="absolute top-0 left-0"/>
                <label htmlFor="beach" title='beach'><i className="p-1 fa-solid fa-umbrella-beach"></i></label>
                <p className="text-base">Beach</p>
              </div>
              <div className="hover:text-blue-600 border hover:border-none relative w-20">
                <input type="checkbox" id="running" name="Running" onChange={handleActivity} className="absolute top-0 left-0"/>
                <label htmlFor="running" title='running'><i className="p-1 fa-solid fa-person-running"></i></label>
                <p className="text-base">Running</p>
              </div>
              <div className="hover:text-blue-600 border hover:border-none relative w-20">
                <input type="checkbox" id="photography" name="Photography" onChange={handleActivity} className="absolute top-0 left-0" />
                <label htmlFor="photography" title='photography'><i className="p-1 fa-solid fa-camera"></i></label>
                <p className="text-base">Photography</p>
              </div>
              <div className="hover:text-blue-600 border hover:border-none relative w-20">
                <input type="checkbox" id="fishing" name="Fishing" onChange={handleActivity} className="absolute top-0 left-0" />
                <label htmlFor="fishing" title='fishing'><i className="p-1 fa-solid fa-otter"></i></label>
                <p className="text-base">Fishing</p>
              </div>
              <div className="hover:text-blue-600 border hover:border-none relative rounded w-20">
                <input type="checkbox" id="cooking" name="Cooking" onChange={handleActivity} className="absolute top-0 left-0" />
                <label htmlFor="cooking" title='cooking'><i className="p-1 fa-solid fa-kitchen-set"></i></label>
                <p className="text-base">Cooking</p>
              </div>
              <div className="hover:text-blue-600 border hover:border-none relative rounded w-20">
                <input type="checkbox" id="museum" name="Museum visits" onChange={handleActivity} className="absolute top-0 left-0" />
                <label htmlFor="museum" title='museum'><i className="p-1 fa-solid fa-landmark"></i></label>
                <p className="text-base">Museum</p>
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

            />
            </label>
          </div>
        )
      }

        {
          !show && !ready ? (
          formData.location &&  formData.start && formData.end && 
          <button key='next' type="button" onClick={(()=> {setShow(true)})}
          className="border border-gray-300  bg-green-600 hover:bg-green-800 rounded-lg mx-auto block text-white p-2 my-2 w-full"
          >Select Activities</button>
          ) : show && !ready ? (
            <button type="button" key='next2' onClick={()=> setReady(true)}
            className="border border-gray-300  bg-green-600 hover:bg-green-800 rounded-lg mx-auto block text-white p-2 my-2 w-full"
            >Select Hotel Type</button>
          ) : (
          <button key='submit' type="submit" 
          className="border border-gray-300  bg-orange-500 hover:bg-orange-700 rounded-lg mx-auto block text-white p-2 my-2 w-full "
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