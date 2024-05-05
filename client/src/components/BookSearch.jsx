import React, { useEffect, useState } from "react";

const BookSearch = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [bookNotFound, setBookNotFound] = useState(false);


    const filteredData = data.filter((item) =>
      item.Keyword.toLowerCase().includes(searchTerm.toLowerCase())
    );
 
  const handleItemClick = (item) => {
    setSelectedItem(item);
    setSearchTerm("");
    setBookNotFound(false);
  };

  const clearSelection = () => {
    setSelectedItem(null);
    setSearchTerm("");
    setBookNotFound(false);
  };

  const onChangeHandler = (e) => {
    const term = e.target.value.trim();
    setSearchTerm(term);
    setSelectedItem(null);

    if (filteredData.length === 0) {
      setBookNotFound(true);
    } else {
      setBookNotFound(false);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <input
        type="text"
        placeholder="Enter your Keyword/Subject"
        value={searchTerm}
        onChange={onChangeHandler}
        style={{
          padding: "10px",
          fontSize: "16px",
          width: "calc(100% - 5em)",
          marginBottom: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />
      {searchTerm && (
        <ul className="home-card" style={{ listStyleType: "none", padding: 0 }}>
          {filteredData.map((item) => (
            <li key={item.Id} onClick={() => handleItemClick(item)}>
              {item.Keyword}
            </li>
          ))}
        </ul>)
      }

      {selectedItem && (
        <div className="search-card">
          <div>
            <h3 style={{ margin: 0, paddingBlock: ".25rem 1rem" }}>
              {selectedItem.Keyword}
            </h3>
            <p style={{ margin: 0 }}>
              Go to {selectedItem.Address}, Shelf No. {selectedItem.Shelf},
              Class No. {selectedItem.Class}
            </p>
            <button
              style={{
                padding: "8px",
                marginTop: "10px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={clearSelection}
            >
              Clear Selection
            </button>
          </div>
        </div>
      )}
      {bookNotFound && (
        <p style={{ color: "red", marginTop: "10px", fontStyle: "italic" }}>
          Book Not Found
        </p>
      )}
    </div>
  );
};

export default BookSearch;
