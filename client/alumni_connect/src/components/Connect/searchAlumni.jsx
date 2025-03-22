import React, { useState } from "react";
import { FaSearch } from "react-icons/fa"; // Import search icon
import "./SearchAlumni.css"; // Import CSS for styling

const SearchAlumni = ({ fetchSearchResults }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      fetchSearchResults(query);
    }
  };

  return (
    <section className="search-section">
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search by name, company, or job role..."
          value={query}
          onChange={handleChange}
          className="search-input"
        />
        <button type="submit" className="search-button">
          <FaSearch className="search-icon" />
          Search
        </button>
      </form>
    </section>
  );
};

export default SearchAlumni;
