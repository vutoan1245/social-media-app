import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SearchIcon } from "assets/icons";

const useQuery = () => {
  const [searchParams] = useSearchParams();
  return new URLSearchParams(searchParams);
};

const SearchForm = () => {
  const query = useQuery().get("query");
  const [searchQuery, setSearchQuery] = useState(query || "");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center">
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </form>
  );
};

export default SearchForm;
