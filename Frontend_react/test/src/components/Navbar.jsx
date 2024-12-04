import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";     

const Navbar = () => {
  return (
    <ul className="flex w-full p-6 items-center justify-between">
      <li className="flex-1">
        <Link to="/" className="block text-start font-mono text-4xl">
          Test Technic
        </Link>
      </li>

      <li className="flex-grow mr-8 flex items-center relative">
        <input
          type="text"
          placeholder="Search"
          className="w-full pl-10 pr-4 py-2 rounded-2xl border border-gray-300"
        />
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
      </li>

      <li className="flex-1 flex justify-end items-center">
        <Link to="/admin" className="block">
          <FaUserCircle className="text-gray-800 text-4xl" />
        </Link>
      </li>
    </ul>
  );
};

export default Navbar;
