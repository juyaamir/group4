import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';

import { useMemo } from 'react'
import Select from 'react-select'
import countryList from 'react-select-country-list'


const Purchase = () => {
    const [countryValue, setCountryValue] = useState('');
const [phoneValue, setPhoneValue] = useState('');

   // const [value, setValue] = useState();
  const [isAddress, setIsAddress] = useState(true);
  const [formData, setFormData] = useState({
    country: '',
    name: '',
    number: '',
    address: '',
    plz: '',
    town: '',
    message: '',
    email: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const options = useMemo(() => countryList().getData(), []);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const handleCountryChange = (value) => {
    setCountryValue(value);
    setFormData({
      ...formData,
      country: value.label,  // update country in formData settimeout
    });
    setErrors({
      ...errors,
      country: '',  // clear country error
    });
  };
  
  const handlePhoneChange = (value) => {
    setPhoneValue(value);
    setFormData({
      ...formData,
      number: value,  // update phone number in formData
    });
    setErrors({
      ...errors,
      number: '',  // clear phone number error
    });
  };
  
  const handleAddressSubmit = () => {
    const { country, name, number, address, plz, town } = formData;
    const newErrors = {};
    if (!country) newErrors.country = "Country is required.";
    if (!name) newErrors.name = "Full Name is required.";
    if (!number) newErrors.number = "Phone Number is required.";
    if (!address) newErrors.address = "Address is required.";
    if (!plz) newErrors.plz = "PLZ Number is required.";
    if (!town) newErrors.town = "Town/City is required.";

    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
    }
    setIsAddress(false);
};


  const handleSubmit = (e) => {
    e.preventDefault();

    const { country, cardNumber, expiryDate, cvv, plz, town } = formData;
    const newErrors = {};
    if (!country) newErrors.country = "Country is required.";
    if (!cardNumber) newErrors.cardNumber = "Card Number is required.";
    if (!expiryDate) newErrors.expiryDate = "Expiration Date is required.";
    if (!cvv) newErrors.cvv = "CVV is required.";
    if (!plz) newErrors.plz = "PLZ Number is required.";
    if (!town) newErrors.town = "Town/City is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    navigate('/pay-now');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        {isAddress ? (
          <fieldset className="border p-2 rounded-lg">
            <legend className="block mb-2 text-center">Add your address</legend>
            

            <div className="mb-3">
              <label htmlFor="name" className="block mb-2 font-medium">Country</label>
              <Select 
  options={options} 
  value={countryValue} 
  onChange={handleCountryChange} 
  placeholder="Select Country"
  className="p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
/>
{errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
            </div>
            

            <div className="mb-3">
              <label htmlFor="name" className="block mb-2 font-medium">Full Name</label>
              <input type="text" name="name" id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder=""
                className="p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="number" className="block mb-2 font-medium">Phone number</label>
              <PhoneInput
  placeholder="Enter phone number"
  value={phoneValue}
  onChange={handlePhoneChange}
  className="p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
  required
/>
{errors.number && <p className="text-red-500 text-sm mt-1">{errors.number}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="block mb-2 font-medium">Address</label>
              <input type="text" name="address" id="address"
                value={formData.address}
                onChange={handleChange}
                placeholder=""
                className="p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
            </div>
            <div className='flex'>
                
            <div className="mb-3">
              <label htmlFor="plz" className="block mb-2 font-medium">PLZ</label>
              <input type="number" name="plz" id="plz"
                value={formData.plz}
                onChange={handleChange}
                placeholder=""
                className="p-2 w-2/3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {errors.plz && <p className="text-red-500 text-sm mt-1">{errors.plz}</p>}
            </div>

            <div className="mb-3">
              <label htmlFor="town" className="block mb-2 font-medium">Town/City</label>
              <input type="text" name="town" id="town"
                value={formData.town}
                onChange={handleChange}
                placeholder=""
                className="p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {errors.town && <p className="text-red-500 text-sm mt-1">{errors.town}</p>}
            </div>


            </div>
            <div className="mb-3">
              <label htmlFor="message" className="block mb-2 font-medium">Add delivery instructions (optional)</label>
              <textarea name="message" id="message"
                value={formData.message}
                onChange={handleChange}
                placeholder=""
                className="p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
            </div>
            <button type="button" onClick={handleAddressSubmit}
              className="border border-gray-300 bg-green-600 hover:bg-green-800 rounded-lg mx-auto block text-white p-2 my-2 w-full"
            >Enter Card Details</button>
          </fieldset>
        ) : (
          <fieldset className="border p-2 rounded-lg">
            <legend className="block mb-2 text-center">Payment method</legend>
            <div className="mb-3">
              <label htmlFor="cardNumber" className="block mb-2 font-medium">Card number</label>
              <input type="number" name="cardNumber" id="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                placeholder=""
                className="p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="expiryDate" className="block mb-2 font-medium">Expiration Date</label>
              <input type="month" name="expiryDate" id="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                placeholder=""
                className="p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
            </div>
            <div className="mb-3">
            <label htmlFor="cvv" className="block mb-2 font-medium">Security Code (CVV/CVC)</label>
            <input 
                type="text"  
                name="cvv" 
                id="cvv"
                value={formData.cvv}
                onChange={handleChange}
                placeholder=""
                className="p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                pattern="\d{2,4}"  
                minLength={2}  
                maxLength={4}  
                required
            />
            {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
            </div>

            <button type="button" onClick={() => setIsAddress(true)}
              className="border border-gray-300 bg-orange-500 hover:bg-orange-600 rounded-lg mx-auto block text-white p-2 my-2 w-full"
            ><i className="fa-solid fa-arrow-left-long mr-2 hover:"></i> Change Address</button>
            <button type="submit"
              className="border border-gray-300 bg-green-600 hover:bg-green-800 rounded-lg mx-auto block text-white p-2 my-2 w-full">Pay Now</button>
          </fieldset>
        )}
      </form>
    </div>
  );
};

export default Purchase;
