import React, { useState } from "react";

const InputSearch = ({ handleGetValue }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
    handleGetValue(searchTerm);
  };
  return (
    <>
      <input
        placeholder="Tìm kiếm"
        className="form-control justify-content-rig justify-content-right"
        type="text"
        value={searchTerm}
        onChange={handleSearchTermChange}
      />
    </>
  );
};

export default InputSearch;
