import { useState, useEffect } from "react";
import { generateItems } from "../data/generateItems";
import ListItem from "../components/ListItem";
import './MilestoneApp.css';

export default function MilestoneApp() {

  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [counter, setCounter] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);

  console.log("MilestoneApp rendered");

  useEffect(() => {
    const data = generateItems();
    setItems(data);
  }, []);

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  const handleCounter = () => {
    setCounter(prev => prev + 1);
  };

  return (
    <div className="milestone-container">
      <h2>Milestone Task: 1000 Items</h2>
      {/* 
      <p className="milestone-note">
        No React.memo, No useMemo, No useCallback.
        <br />
        Click counter or type in search → watch console for 1000+ logs.
      </p> */}

      <div className="milestone-toolbar">
        <div className="counter-box">
          <button className="counter-btn" onClick={handleCounter}>
            Counter: {counter}
          </button>
          {/* <span>Unrelated state — still causes 1000 re-renders!</span> */}
        </div>

        <input
          className="search-input"
          type="text"
          placeholder="Search 1000 items..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {selectedItem && (
        <div className="selected-info">
          Selected: <strong>{selectedItem.name}</strong> - ${selectedItem.price} - {selectedItem.category}
        </div>
      )}

      <div className="list-header">
        <span>Showing {filteredItems.length} of {items.length} items</span>
      </div>

      <div className="items-list">
        {filteredItems.map((item) => (
          <ListItem
            key={item.id}
            item={item}
            onSelect={handleSelectItem}
          />
        ))}
      </div>
    </div>
  );
}