import React from "react";

const SelectOption = ({ array, handleGetValue }) => {
  const handleSelect = (e) => {
    handleGetValue(e.target.value);
  };
  return (
    <>
      <div className="form-outline mr-2">
        <select onChange={handleSelect} className="form-control">
          {array.map((item) => (
            <option value={item.value}>{item.label}</option>
          ))}
        </select>
      </div>
    </>
  );
};

export default SelectOption;
