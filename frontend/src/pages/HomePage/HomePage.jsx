import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function HomePage() {
  return (
    <div>
      <nav className="bg-white shadow">
        <div className="container mx-auto flex justify-between items-center py-4">
          <figure>
            <img
              src="./src/assets/Screenshot 2024-07-19 at 3.16.52 AM.png"
              alt="Logo"
            />
          </figure>
          <ul className="flex items-center space-x-6">
            <li>
              <Link to="/home" className="text-gray-900 hover:text-red-500">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="text-gray-900 hover:text-red-500">
                Products
              </Link>
            </li>
            <li>
              <Link to="/vacation-plan" className="text-gray-900 hover:text-red-500">
                Plan your vacation
              </Link>
            </li>
            <li>
            <Link to="/signin" className="text-gray-900 hover:text-red-500">
                SignIn
              </Link>
            </li>
            <li>
              <Link to="/signup" className="text-gray-900 hover:text-red-500">
                SignUp
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <section className="relative bg-gradient-to-r from-yellow-500 via-yellow-100 to-yellow-500 px-15 flex flex-wrap md:flex-nowrap items-center justify-center gap-x-1 pt-4 mx-auto px-8"></section>

      <footer className="bg-rose-50 py-12 px-24">
        <h4 className="font-bold text-lg mb-8">Top Products</h4>
        <div className="col-span-1">
          <h4 className="font-bold text-lg mb-8">Quick Links</h4>
          <h4 className="font-bold text-lg mb-8">Features</h4>
          <div className="col-span-1">
            <h4 className="font-bold text-lg mb-8">Resources</h4>
            <ul className="text-gray-700">
              <li className="mb-4"></li>
            </ul>
          </div>
        </div>
      </footer>

      <ToastContainer />
    </div>
  );
}

export default HomePage;
