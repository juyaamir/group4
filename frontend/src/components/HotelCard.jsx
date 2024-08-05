import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { client } from "./client";

const HotelCard = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const fetchProducts = async (type = "hotel") => {
        try {
            const entries = await client.getEntries({ content_type: type });
            return entries;
        } catch (error) {
            console.error(error);
            setError(error);
        }
    };

    useEffect(() => {
        const getEntries = async () => {
            const entries = await fetchProducts("hotel");
            setData(entries?.items);
            console.log(entries?.items);
        };
        getEntries();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % data[0]?.fields.image.length);
        }, 2000); 

        return () => clearInterval(interval); 
    }, [data]);

    return (
        <div className='flex justify-center gap-6 flex-wrap'>
            {data.map((item) => (
                <div key={item?.sys.id} className="card card-compact bg-base-100 w-72 shadow-xl hover:cursor-pointer motion">
                    
                <Link to = 'https://www.booking.com/' target="_blank">
                            <figure >
                            <img
                            src={item.fields.image[currentImageIndex]?.fields.file.url} 
                            alt="hotel" 
                            className='hover:cursor-pointer hover:shadow-2xl transition-transform duration-1000 transform hover:scale-110 thumbnail h-52 ease-in-out'
                            />
                        </figure>
                    </Link>

                        <div className="card-body motion">
                            <h2 className="card-title hover:text-blue-400 name">{item.fields.name}</h2>
                            <Link to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.fields.location1)}`} target="_blank">
                                <p className='font-thin underline '>{item.fields.location1}</p>
                            </Link>
                            <p className='font-thin'><span className='bg-blue-900 text-white p-1 rounded-md px-2'>{item.fields.rating}</span> {item.fields.status} {item.fields.reviews} reviews</p>
                            <p className='font-thin text-end'>starting from <span className='text-red-500 line-through'>€{item.fields.lastP}</span> <span className='font-bold '>{item.fields.newP}</span></p>
                        </div>
                    
                </div>
            ))}
        </div>
    );
};

export default HotelCard;