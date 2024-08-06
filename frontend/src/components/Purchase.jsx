import { useState } from 'react';
import { Link } from 'react-router-dom';
const Purchase = () => {
  const [isAddress, setIsAddress] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    address: '',
    message: '',
    email: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

  };

  const handleEnterCardDetails = () => {
    setIsAddress(false);
  };

  const handleBackToAddress = () => {
    setIsAddress(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Purchase Form</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        {isAddress ? (
          <fieldset className="border p-2 rounded-lg">
            <legend className="block mb-2 text-center">Add your address</legend>
            <div className="mb-3">
              <label htmlFor="name" className="block mb-2 font-medium">Full Name</label>
              <input type="text" name="name" id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder=""
                className="p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="number" className="block mb-2 font-medium">Phone number</label>
              <input type="text" name="number" id="number"
                value={formData.number}
                onChange={handleChange}
                placeholder=""
                className="p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="block mb-2 font-medium">Address</label>
              <input type="text" name="address" id="address"
                value={formData.address}
                onChange={handleChange}
                placeholder=""
                className="p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="block mb-2 font-medium">Add delivery instructions (optional)</label>
              <textarea name="message" id="message"
                value={formData.message}
                onChange={handleChange}
                placeholder=""
                className="p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button type="button" onClick={() => setIsAddress(false)}
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
              />
            </div>
            <div className="mb-3">
              <label htmlFor="expiryDate" className="block mb-2 font-medium">Expiration Date</label>
              <input type="date" name="expiryDate" id="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                placeholder=""
                className="p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="cvv" className="block mb-2 font-medium">Security Code (CVV/CVC)</label>
              <input type="number" name="cvv" id="cvv"
                value={formData.cvv}
                onChange={handleChange}
                placeholder=""
                className="p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="2" max="4"
              />
            </div>
            <button type="button" onClick={() => setIsAddress(true)}
              className="border border-gray-300 bg-green-600 hover:bg-green-800 rounded-lg mx-auto block text-white p-2 my-2 w-full"
            >Back to Address</button>
            <Link to='/pay-now'>
            <button type="submit"
              className="border border-gray-300 bg-green-600 hover:bg-green-800 rounded-lg mx-auto block text-white p-2 my-2 w-full">Pay Now</button>
            </Link>

          </fieldset>
        )}
      </form>
    </div>
  );
};

export default Purchase;