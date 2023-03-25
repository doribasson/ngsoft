import { FaSearch } from "react-icons/fa";

import "./searchBar.css";

interface props {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBar({ handleChange }: props) {
  return (
    <div className="searchBar_container">
      <input type="text" placeholder="search" onChange={handleChange} />
      <span>
        <FaSearch />
      </span>
    </div>
  );
}
